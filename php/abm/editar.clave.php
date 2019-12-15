<?php
//header("Access-Control-Allow-Origin: *");

/****** Clases *****/

require_once('../config.php');
require_once('../funciones.php');
require_once('../clases/DBcnx.php');
require_once('../clases/Usuario.php');

if(isset($_POST)&&isset($_SESSION["s_id"])) {
    $user = new Usuario();
    $_POST["ID_USUARIO"]=$_SESSION["s_id"];
    echo  $user->editar_clave($_POST);
}
