<?php
//header("Access-Control-Allow-Origin: *");

/****** Clases *****/

require_once('../config.php');
require_once('../funciones.php');
require_once('../clases/DBcnx.php');
require_once('../clases/Administrador.php');

if(isset($_SESSION["s_nivel"])&&$_SESSION["s_nivel"]=="Administrador"){

    $administrador = new Administrador();
    $fin2=json_decode($administrador->bloquear_usuario($_POST["ID_USUARIO"]),true);

    echo $fin2;
}

