<?php
//header("Access-Control-Allow-Origin: *");

/****** Clases *****/

require_once('../config.php');
require_once('../funciones.php');
require_once('../clases/DBcnx.php');
require_once('../clases/Denuncia.php');

if(isset($_SESSION["s_nivel"])&&$_SESSION["s_nivel"]=="Propietario") {
    $denuncia = new Denuncia();

    /****** Creo cupon ******/

    $_POST["FK_ID_PROPIETARIO"]=$_SESSION["s_id"];

    echo ($denuncia->crear_denuncia($_POST));

}
