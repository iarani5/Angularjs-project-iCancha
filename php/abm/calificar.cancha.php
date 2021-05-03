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
    $rta1= $calificacion->checkear_no_puntuada($_POST["FK_ID_CANCHA"],$_POST["FK_ID_USUARIO"]);

    if($rta1==NULL){
        $rta= $calificacion->puntuar_comentar_cancha($_POST);
        echo $rta;
    }
    else{
        echo "0";
    }
}
