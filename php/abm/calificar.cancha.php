<?php
//header("Access-Control-Allow-Origin: *");

/****** Clases *****/

require_once('../config.php');
require_once('../funciones.php');
require_once('../clases/DBcnx.php');
require_once('../clases/Calificacion.php');

if(isset($_SESSION["s_id"])&&$_SESSION["s_nivel"]=="Cliente") {

    /****** Creo calificacion ******/
    $calificacion = new Calificacion();
    $_POST["FK_ID_USUARIO"]=$_SESSION["s_id"];
    $rta= $calificacion->puntuar_comentar_cancha($_POST);
    echo $rta;
}
