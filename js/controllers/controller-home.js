/**************************************** CONTROLLER HOME ***************************************/

iCancha.controller("homeCtrl", function ($location,$http,$scope,$window) {
    $scope.no_user = true;

    if(localStorage.getItem("dts_user")!==null){ //si ya existen sus datos almacenados en la web. esta logueado.
        $scope.no_user = false;
    }
    else{
        //no hay usuario logueado
    }

    $scope.buscar_cancha=function(cancha){

        for (let i in  $scope.listado_horarios) {
            if($scope.listado_horarios[i].HORA===cancha.HORA){
                cancha.HORARIO=$scope.listado_horarios[i].ID;
            }
        }
        for (let i in  $scope.dias) {
            if($scope.dias[i].NOMBRE===cancha.NOMBRE){
                cancha.DIA = $scope.dias[i].ID;
        }
        }

        var item = [];
        for (const [key, value] of Object.entries(cancha)) {
            item.push( key+'='+value );
        }
        var union = item.join('&');	//me une el array con un &

        /****** LISTAR CANCHAS *****/

        $scope.mostrar=false;

        $http({
            method: 'POST',
            url: "php/abm/buscar.canchas.php",
            data: union,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .then(function (response){ //EXITO se establecio la conexion
                if(response.data.length==0) {
                    $scope.canchas_filtradas=[];
                    modal_msj("No se encontraron resultados.");
                }
                else {
                    var ban = 0;
                    var cancha_ya_cargada = [];
                    for (var i in response.data) {
                        if (!ban) {
                            cancha_ya_cargada.push(response.data[i]);
                            ban = 1;
                        }

                        var ya_existe = false;
                        for (var j in cancha_ya_cargada) {
                            if (cancha_ya_cargada[j].ID_CANCHA == response.data[i].ID_CANCHA) {
                                ya_existe = true;
                            }
                        }

                        var sum = 0;

                        for (var j in response.data[i].PUNTAJE) {
                            sum += parseInt(response.data[i].PUNTAJE[j].PUNTUACION, 10);
                        }
                        if (sum) response.data[i].PUNTAJE = (sum / response.data[i].PUNTAJE.length).toFixed(2);
                        else response.data[i].PUNTAJE = 0;

                        //foto

                       // response.data[i].FOTO = response.data[i].FOTO.substring(24, response.data[i].FOTO.length);
                    }

                    if (!ya_existe) {
                        cancha_ya_cargada.push(response.data[i]);
                    }

                    $scope.canchas_filtradas = cancha_ya_cargada;
                }

            },function (error){ //ERROR no se pudo establecer la conexion

            });













    };

    $scope.dias=[
        {   ID: 0, NOMBRE: "Todos"},
        {   ID: 1, NOMBRE: "Lunes"},
        {   ID: 2, NOMBRE: "Martes"},
        {   ID: 3, NOMBRE: "Miercoles" },
        {   ID: 4, NOMBRE: "Jueves"},
        {   ID: 5, NOMBRE: "Viernes"},
        {   ID: 6, NOMBRE: "Sabado"},
        {   ID: 7,NOMBRE: "Domingo"}
    ];

    $scope.listado_horarios=[
        {   ID: 0, HORA: "Todos"},
        { ID: 1, HORA: "7:00am a 8:00am"},
        { ID: 2, HORA: "8:00am a 9:00am"},
        { ID: 3, HORA: "9:00am a 10:00am"},
        { ID: 4, HORA: "10:00am a 11:00am"},
        { ID: 5, HORA: "11:00am a 12:00pm"},
        { ID: 6, HORA: "12:00pm a 1:00pm"},
        { ID: 7, HORA: "1:00pm a 2:00pm"},
        { ID: 8, HORA: "2:00pm a 3:00pm"},
        { ID: 9, HORA: "3:00pm a 4:00pm"},
        { ID: 10, HORA: "4:00pm a 5:00pm"},
        { ID: 11, HORA: "5:00pm a 6:00pm"},
        { ID: 12, HORA: "6:00pm a 7:00pm"},
        { ID: 13, HORA: "7:00pm a 8:00pm"},
        { ID: 14, HORA: "8:00pm a 9:00pm"},
        { ID: 15, HORA: "9:00pm a 10:00pm"},
        { ID: 16, HORA: "10:00pm a 11:00pm"},
        { ID: 17, HORA: "11:00pm a 12:00am"},
        { ID: 18, HORA: "12:00am a 1:00am"},
    ];

    $scope.barrios=[
        { TITULO: "Agronomía" },
        { TITULO: "Almagro" },
        { TITULO: "Balvanera" },
        { TITULO: "Barracas" },
        { TITULO: "Belgrano" },
        { TITULO: "Boedo" },
        { TITULO: "Caballito" },
        { TITULO: "Chacarita" },
        { TITULO: "Coghlan" },
        { TITULO: "Colegiales" },
        { TITULO: "Constitución" },
        { TITULO: "Flores" },
        { TITULO: "Floresta" },
        { TITULO: "La Boca" },
        { TITULO: "La Paternal" },
        { TITULO: "Liniers" },
        { TITULO: "Mataderos" },
        { TITULO: "Monte Castro" },
        { TITULO: "Monserrat" },
        { TITULO: "Nueva Pompeya" },
        { TITULO: "Núñez" },
        { TITULO: "Palermo" },
        { TITULO: "Parque Avellaneda" },
        { TITULO: "Parque Chacabuco" },
        { TITULO: "Parque Chas" },
        { TITULO: "Parque Patricios" },
        { TITULO: "Puerto Madero" },
        { TITULO: "Recoleta" },
        { TITULO: "Retiro" },
        { TITULO: "Saavedra" },
        { TITULO: "San Cristóbal" },
        { TITULO: "San Nicolás" },
        { TITULO: "San Telmo" },
        { TITULO: "Vélez Sársfield" },
        { TITULO: "Versalles" },
        { TITULO: "Villa Crespo" },
        { TITULO: "Villa del Parque" },
        { TITULO: "Villa Devoto" },
        { TITULO: "Villa General Mitre" },
        { TITULO: "Villa Lugano" },
        { TITULO: "Villa Luro" },
        { TITULO: "Villa Ortúzar" },
        { TITULO: "Villa Pueyrredón" },
        { TITULO: "Villa Real" },
        { TITULO: "Villa Riachuelo" },
        { TITULO: "Villa Santa Rita" },
        { TITULO: "Villa Soldati" },
        { TITULO: "Villa Urquiza" }
    ];

    $scope.tipo_cancha=[
        {
            TITULO: "Futbol"
        },
        {
            TITULO: "Basket"
        },
        {
            TITULO: "Hockey"
        },
        {
            TITULO: "Tenis"
        },
        {
            TITULO: "Rugby"
        }
    ];

});
