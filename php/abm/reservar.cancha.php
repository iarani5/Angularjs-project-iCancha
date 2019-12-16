<?php
//header("Access-Control-Allow-Origin: *");

/****** Clases *****/

require_once('../config.php');
require_once('../funciones.php');
require_once('../clases/DBcnx.php');
require_once('../clases/Reserva.php');
require_once('../clases/Horario.php');
require_once('../clases/Cupon.php');


if(isset($_SESSION["s_id"])){
    $reserva = new Reserva();
    $hay_cupon=false;
    /****** Creo reserva ******/
    if(isset($_POST["CUPON"])){
        $cupon=new Cupon();
        $hay_cupon=$cupon->getByCodigo($_POST["CUPON"]);
        if($hay_cupon){
            $_POST["FK_ID_CUPON"]=$hay_cupon["ID_CUPON"];
        }
        else{
            echo 0;
            return 0;
        }
    }
    else{
        $_POST["FK_ID_CUPON"]=null;
    }

    $_POST["FK_ID_USUARIO"]=$_SESSION["s_id"];
    $fin=json_decode($reserva->crear_reserva($_POST),true);
    if($fin){
        $_POST["ESTADO"]="Ocupado";
        $horario = new Horario();
        $fin2=json_decode($horario->estado($_POST),true);
        echo json_encode($fin2);
    }

}

