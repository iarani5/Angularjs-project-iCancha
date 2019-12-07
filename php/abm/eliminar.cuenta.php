<?php
//header("Access-Control-Allow-Origin: *");

/****** Clases *****/

require_once('../config.php');
require_once('../funciones.php');
require_once('../clases/DBcnx.php');
require_once('../clases/Usuario.php');

if(isset($_SESSION["s_id"])){

    $usuario = new Usuario();
    $fin2=json_decode($usuario->eliminar_usuario($_SESSION["s_id"]),true);

    echo $fin2;
}
?>
