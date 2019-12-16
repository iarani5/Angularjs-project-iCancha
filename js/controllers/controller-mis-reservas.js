iCancha.controller("misReservasCtrl", function ($location,$http,$scope,$window,$routeParams) {

    //********************* LISTAR RESERVAS

    if(localStorage.getItem("dts_user")!==undefined&&localStorage.getItem("dts_user")!==null){
        var usuario=angular.fromJson(localStorage.getItem("dts_user"));
        $scope.usuario=usuario;
    }

    $http({
        method: 'POST',
        url: "php/abm/listar.mis.reservas.php",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
        .then(function (response){ //EXITO se establecio la conexion
            $scope.reservas=response.data.reverse();

        },function (error){ //ERROR no se pudo establecer la conexion

        });

    $scope.cancelar_reserva=function(una_reserva){

        $http({
            method: 'POST',
            url: "php/abm/cancelar.reserva.php",
            data:"ID_RESERVA="+una_reserva.ID_RESERVA+"&FK_ID_HORARIO="+una_reserva.UN_HORARIO.ID_HORARIO,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .then(function (response){ //EXITO se establecio la conexion
                if(response.data.search("11")!==-1) {
                    modal_msj("Reserva cancelada con éxito");
                    $window.location.reload();
                }
                else{
                    modal_msj("Ups! ocurrio un error, vuelva a intentarlo más tarde");
                }
            },function (error){ //ERROR no se pudo establecer la conexion

            });

    }

    $scope.denunciar_usuario=function(id){

        $http({
            method: 'POST',
            url: "php/abm/denunciar.usuario.php",
            data:"FK_ID_USUARIO="+id,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .then(function (response){ //EXITO se establecio la conexion
                if(response.data.search("1")!==-1) {
                    modal_msj("Denuncia creada con éxito");
                    $window.location.reload();
                }
                else{
                    modal_msj("Ups! ocurrio un error, vuelva a intentarlo más tarde");
                }
            },function (error){ //ERROR no se pudo establecer la conexion

            });

    }


});
