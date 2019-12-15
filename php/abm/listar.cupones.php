<?php
//header("Access-Control-Allow-Origin: *");

/****** Clases ******/

require_once('../config.php');
require_once('../funciones.php');
require_once('../clases/DBcnx.php');
require_once('../clases/Cupon.php');

$cupon=new Cupon();
$arrayFinal=[];
$array=[];
    $rta2=$cupon->all();
    foreach($rta2 as $unCupon){

        $array=[
            "ID_CUPON"=>$unCupon->getIdCupon(),
            "NOMBRE_CUPON"=>$unCupon->getNombreCupon(),
            "CODIGO"=>$unCupon->getCodigo(),
            "PORCENTAJE"=>$unCupon->getPorcentaje()
        ];

        $arrayFinal[]=$array;

}
echo json_encode($arrayFinal);

