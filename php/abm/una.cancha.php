<?php
//header("Access-Control-Allow-Origin: *");

/****** Clases ******/

require_once('../config.php');
require_once('../funciones.php');
require_once('../clases/DBcnx.php');
require_once('../clases/Cancha.php');
require_once('../clases/Duenio.php');

$cancha=new Cancha();
$duenio=new Duenio();
$arrayFinal=[];
$array=[];

    $rta2=$cancha->mis_canchas($_POST["ID_CANCHA"]);
    foreach($rta2 as $unaCancha){

        $array=[
            "ID_CANCHA"=>$unaCancha->getIdCancha(),
            "NOMBRE_CANCHA"=>$unaCancha->getNombre_cancha(),
            "FOTO"=>$unaCancha->getFoto(),
            "TIPO_CANCHA"=>$unaCancha->getTipoCancha(),
            "BARRIO"=>$unaCancha->getBarrio(),
            "DIRECCION"=>$unaCancha->getDireccion(),
            "PUNTAJE"=>$unaCancha->getPuntaje(),
            "PRECIO"=>$unaCancha->getPrecio()
        ];

        $arrayFinal[]=$array;
}
echo json_encode($arrayFinal);

