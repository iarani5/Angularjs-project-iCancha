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

});
