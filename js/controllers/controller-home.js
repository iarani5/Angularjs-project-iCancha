/**************************************** CONTROLLER HOME ***************************************/

iCancha.controller("homeCtrl", function ($location,$http,$scope) {
    $scope.no_user = true;

    if(localStorage.getItem("dts_user")!==null){ //si ya existen sus datos almacenados en la web. esta logueado.
        $scope.no_user = false;

    }
    else{
        //no hay usuario logueado
    }

    $scope.buscar_cancha=function(cancha){

    };

    $scope.dias=[
        {   ID: 1, DIA: "Lunes"},
        {   ID: 2, DIA: "Martes"},
        {   ID: 3, DIA: "Miercoles" },
        {   ID: 4, DIA: "Jueves"},
        {   ID: 5, DIA: "Viernes"},
        {   ID: 6, DIA: "Sabado"},
        {   ID: 7,DIA: "Domingo"}
    ];

    $scope.listado_horarios=[
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
