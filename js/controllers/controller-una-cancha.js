/**************************************** CONTROLLER MIS CANCHAS ***************************************/

iCancha.controller("canchaVerCtrl",  ['$scope', '$http', '$location', 'Upload', '$timeout','$window','$routeParams', function  ($scope, $http, $location, Upload, $timeout, $window, $routeParams) {

    $scope.nivel="otro";
    if(localStorage.getItem("dts_user")!==undefined&&localStorage.getItem("dts_user")!==null){
        var usuario=angular.fromJson(localStorage.getItem("dts_user"));
        $scope.nivel=usuario.TIPO_USUARIO;
    }

    $scope.puntaje;

    $(document).ready(function(){

        /* 1. Visualizing things on Hover - See next part for action on click */
        $('#stars li').on('mouseover', function(){
            var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on

            // Now highlight all the stars that's not after the current hovered star
            $(this).parent().children('li.star').each(function(e){
                if (e < onStar) {
                    $(this).addClass('hover');
                }
                else {
                    $(this).removeClass('hover');
                }
            });

        }).on('mouseout', function(){
            $(this).parent().children('li.star').each(function(e){
                $(this).removeClass('hover');
            });
        });


        /* 2. Action to perform on click */
        $('#stars li').on('click', function(){
            var onStar = parseInt($(this).data('value'), 10); // The star currently selected
            var stars = $(this).parent().children('li.star');

            for (i = 0; i < stars.length; i++) {
                $(stars[i]).removeClass('selected');
            }

            for (i = 0; i < onStar; i++) {
                $(stars[i]).addClass('selected');
            }

            // JUST RESPONSE (Not needed)
            var ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
            var msg = "";
            if (ratingValue > 0) {
                $scope.puntaje=ratingValue;
                msg = "Gracias por tu calificación de  " + ratingValue + " estrellas.";
            }
            responseMessage(msg);

        });


    });

    function responseMessage(msg) {
        $('.success-box').fadeIn(200);
        $('.success-box div.text-message').html("<span>" + msg + "</span>");
    }

    //********************* LISTAR CANCHAS

    $http({
        method: 'POST',
        url: "php/abm/una.cancha.php",
        data: "ID_CANCHA="+$routeParams["id"],
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
        .then(function (response){ //EXITO se establecio la conexion
            if(response.data.length){
                for(var i in response.data){
                    var foto=response.data[i].FOTO.substring(24,response.data[i].FOTO.length);
                    response.data[i].FOTO=foto;
                }

                $scope.una_cancha=response.data[0];

                $http({
                    method: 'POST',
                    url: "php/abm/listar.horarios.cancha.php",
                    data: "FK_ID_CANCHA="+response.data[0]["ID_CANCHA"],
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                    .then(function (response){//EXITO se establecio la conexion
                        $scope.horarios = response.data;

                        $scope.reservar_cancha=function(){

                            var lis= tn(id("lista_con_horarios"),"li");
                            for(var i = 0; i < lis.length;i++){
                                if(tn(lis[i],"input",0).checked){
                                    $http({
                                        method: 'POST',
                                        url: "php/abm/reservar.cancha.php",
                                        data: "FK_ID_HORARIO="+tn(lis[i],"input",0).id+"&FK_ID_CANCHA="+$scope.una_cancha.ID_CANCHA,
                                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                                    })
                                    .then(function (response){
                                        if(response.data.search("1")!==-1){
                                            alert("Reserva realizada con éxito!");
                                            $window.location.reload();
                                        }
                                        else{
                                            alert("Ups! Hubo un error vuelva a intentarlo más tarde.");
                                        }

                                    },function (error){

                                    });

                                }
                            }
                        }

                    },function (error){ //ERROR no se pudo establecer la conexion

                    });


            }

        },function (error){ //ERROR no se pudo establecer la conexion

        });

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

    //*************************** CREAR CANCHA

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

    $scope.dia=[
        {
            DIA: "Lunes"
        },
        {
            DIA: "Martes"
        },
        {
            DIA: "Miercoles"
        },
        {
            DIA: "Jueves"
        },
        {
            DIA: "Viernes"
        },
        {
            DIA: "Sabado"
        },
        {
            DIA: "Domingo"
        }
    ];

    /******** CREAR CANCHA Y HORARIO ********/
    $scope.crear_cancha=function(cancha){

        //validar inputs en el submit
        var datos_registro=tn(id('crear'),'input');

        var ban=0;
        for(var i=0;i<datos_registro.length;i++){

            datos_registro[i].style.borderBottom='none';
            var p=datos_registro[i].nextSibling;

            if(p.className==="mensaje-validacion"){
                rc(p.parentNode,p);
            }
            validar_form(datos_registro[i]);
            var p=datos_registro[i].nextSibling;
            if(p.className==="mensaje-validacion"){
                ban=1;
            }
        }

        if(!ban) {

            var lunes=[], martes=[],miercoles=[],jueves=[],viernes=[],sabado=[],domingo=[];

            if(lista_horarios_seleccionados===undefined){
                alert("Completa el horario de disponiblidad de la cancha");
            }
            else {
                for (var i = 0; i < lista_horarios_seleccionados.length; i++) {

                    var hora = lista_horarios_seleccionados[i].id.substring(1, lista_horarios_seleccionados[i].id.length);
                    switch (lista_horarios_seleccionados[i].id[0]) {
                        case "1":
                            lunes.push(hora);
                            break;
                        case "2":
                            martes.push(hora);
                            break;
                        case "3":
                            miercoles.push(hora);
                            break;
                        case "4":
                            jueves.push(hora);
                            break;
                        case "5":
                            viernes.push(hora);
                            break;
                        case "6":
                            sabado.push(hora);
                            break;
                        case "7":
                            domingo.push(hora);
                            break;
                    }
                }

                var horas_dias = [lunes, martes, miercoles, jueves, viernes, sabado, domingo];

                //cancha
                var datos_cancha = {
                    NOMBRE_CANCHA: cancha.NOMBRE,
                    FOTO: cancha.FOTO,
                    TIPO_CANCHA: cancha.TIPO_CANCHA,
                    DIRECCION: cancha.DIRECCION,
                    BARRIO: cancha.BARRIO,
                    PRECIO: cancha.PRECIO,
                    PUNTAJE: "0",
                    HORARIOS: horas_dias
                };

                console.log(datos_cancha);
                var url;

                if ($scope.titulo_formulario === "Editar cancha") {
                    url = "php/abm/editar.cancha.php";
                } else {
                    url = "php/abm/crear.cancha.php";
                }
                if (cancha.FOTO !== undefined) {
                    cancha.FOTO.upload = Upload.upload({
                        method: 'POST',
                        url: url,
                        data: datos_cancha,
                    })
                        .then(function (response) {
                                if (response.data === "1") {
                                    modal_msj("Cancha creada con éxito!");
                                    window.location.reload();
                                }
                            }
                            , function (response) {
                                //modal error
                            });
                }
            }
        }
    }


    /******** CREAR PUNTAJE Y COMENTARIO ********/
    $scope.calificar_cancha=function(calificacion){
        if($scope.puntaje!==undefined&&calificacion!==undefined){
            $http({
                method: 'POST',
                url: "php/abm/calificar.cancha.php",
                data: "FK_ID_CANCHA="+$routeParams["id"]+"&COMENTARIO="+calificacion.COMENTARIO+"&PUNTUACION="+$scope.puntaje,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                .then(function (response){//EXITO se establecio la conexion
                    if(response.data.search("1")!==-1) {
                        modal_msj("Calificación realizada con éxito");
                    }
                    else{
                        modal_msj("Ups! ocurrio un error, vuelva a intentarlo más tarde");
                    }
                },function (error){ //ERROR no se pudo establecer la conexion

                });
        }
        else{
            modal_msj("Completar con puntaje y comentario");
        }
    }

    //********************* LISTAR COMENTARIOS

   /* $http({
        method: 'POST',
        url: "php/abm/una.cancha.php",
        data: "ID_CANCHA="+$routeParams["id"],
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
        .then(function (response){ //EXITO se establecio la conexion
            if(response.data.length){
                for(var i in response.data){
                    var foto=response.data[i].FOTO.substring(24,response.data[i].FOTO.length);
                    response.data[i].FOTO=foto;
                }

                $scope.una_cancha=response.data[0];

                $http({
                    method: 'POST',
                    url: "php/abm/listar.horarios.cancha.php",
                    data: "FK_ID_CANCHA="+response.data[0]["ID_CANCHA"],
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                    .then(function (response){//EXITO se establecio la conexion
                        $scope.horarios = response.data;

                        $scope.reservar_cancha=function(){

                            var lis= tn(id("lista_con_horarios"),"li");
                            for(var i = 0; i < lis.length;i++){
                                if(tn(lis[i],"input",0).checked){
                                    $http({
                                        method: 'POST',
                                        url: "php/abm/reservar.cancha.php",
                                        data: "FK_ID_HORARIO="+tn(lis[i],"input",0).id+"&FK_ID_CANCHA="+$scope.una_cancha.ID_CANCHA,
                                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                                    })
                                        .then(function (response){
                                            if(response.data.search("1")!==-1){
                                                alert("Reserva realizada con éxito!");
                                                $window.location.reload();
                                            }
                                            else{
                                                alert("Ups! Hubo un error vuelva a intentarlo más tarde.");
                                            }

                                        },function (error){

                                        });

                                }
                            }
                        }

                    },function (error){ //ERROR no se pudo establecer la conexion

                    });


            }

        },function (error){ //ERROR no se pudo establecer la conexion

        });*/

}]);
