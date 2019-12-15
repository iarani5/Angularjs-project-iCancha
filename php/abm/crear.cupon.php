<?php
//header("Access-Control-Allow-Origin: *");

/****** Clases *****/

require_once('../config.php');
require_once('../funciones.php');
require_once('../clases/DBcnx.php');
require_once('../clases/Cupon.php');

if(isset($_SESSION["s_nivel"])&&$_SESSION["s_nivel"]=="Administrador") {
    $cupon = new Cupon();

    /****** Creo cupon ******/

   echo ($cupon->crear_cupon($_POST));

}
