<?php
//header("Access-Control-Allow-Origin: *");

/****** Clases *****/

require_once('../config.php');
require_once('../funciones.php');
require_once('../clases/DBcnx.php');
require_once('../clases/Cancha.php');
require_once('../clases/Duenio.php');
require_once('../clases/Horario.php');

if(isset($_SESSION["s_id"])) {
    $cancha = new Cancha();

    /****** Edito cancha ******/
    $fin = $cancha->editar_cancha($_POST);
    echo $fin;
}
else{
    echo "usuario no registrado";
}


