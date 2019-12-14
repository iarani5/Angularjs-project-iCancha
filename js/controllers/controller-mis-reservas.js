iCancha.controller("misReservasCtrl", function ($location,$http,$scope,$window,$routeParams) {

    //********************* LISTAR RESERVAS

    $http({
        method: 'POST',
        url: "php/abm/listar.mis.reservas.php",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
        .then(function (response){ //EXITO se establecio la conexion

           if(response.data.length>0){
                $scope.reservas=response.data.reverse();
           }
            else{
                $scope.mensaje="Aún no tenes reservas realizadas.";
            }

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

});
