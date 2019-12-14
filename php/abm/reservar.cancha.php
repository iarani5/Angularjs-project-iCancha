<?php
//header("Access-Control-Allow-Origin: *");

/****** Clases *****/

require_once('../config.php');
require_once('../funciones.php');
require_once('../clases/DBcnx.php');
require_once('../clases/Reserva.php');
require_once('../clases/Horario.php');

if(isset($_SESSION["s_id"])){
    $reserva = new Reserva();

    /****** Creo reserva ******/

    $_POST["FK_ID_USUARIO"]=$_SESSION["s_id"];
    $fin=json_decode($reserva->crear_reserva($_POST),true);
    if($fin){
        $_POST["ESTADO"]="Ocupado";
        $horario = new Horario();
        $fin2=json_decode($horario->estado($_POST),true);
        echo json_encode($fin2);
    }
}
else{
    echo "usuario no registrado";
}


