<?php
//header("Access-Control-Allow-Origin: *");

/****** Clases *****/

require_once('../config.php');
require_once('../funciones.php');
require_once('../clases/DBcnx.php');
require_once('../clases/Horario.php');
require_once('../clases/Reserva.php');

if(isset($_SESSION["s_id"])){

    $horario = new Horario();
    $reserva = new Reserva();

    $_POST["ESTADO"]="Desocupado";
    $fin1=$reserva->cancelar_reserva($_POST["ID_RESERVA"]);
    $fin2=$horario->estado($_POST);

    echo $fin1;
    echo $fin2;
}
