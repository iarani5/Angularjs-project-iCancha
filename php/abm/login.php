<?php
        /****** Clases *****/	
    require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
    require_once('../clases/Usuario.php');
    
/****** Logeo al usuario ******/
if(isset($_POST)){
    $usuario = new Usuario();

$fin2=json_decode($usuario->verificar_usuario($_POST["EMAIL"], $_POST["CLAVE"]),true);
if(count($fin2)){
    foreach ($fin2 as $k => $v) {
        /***** Guardado de datos en SESSION ****/
        switch($k){
            case "ID":
                $_SESSION['s_id'] = $v;
            break;
            case "NIVEL":
                $_SESSION['s_nivel'] = $v;
            break;
        }
    }
    echo json_encode($fin2);
    }
}

?>