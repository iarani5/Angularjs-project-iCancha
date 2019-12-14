<?php
//header("Access-Control-Allow-Origin: *");

/****** Clases ******/

require_once('../config.php');
require_once('../funciones.php');
require_once('../clases/DBcnx.php');
require_once('../clases/Usuario.php');
require_once('../clases/Calificacion.php');

if(isset($_POST)){
    $calificacion=new Calificacion();
    $rta=$calificacion->traer_calificacion_cancha($_POST["FK_ID_CANCHA"]);
    $arrayFinal=[];
    $array=[];

    foreach($rta as $unaCalificacion){
        $usuario = new Usuario();
        $rta2=$usuario->getByPk($unaCalificacion->getFkIdUsuario());

            $array=[
            "ID_CALIFICACION"=>$unaCalificacion->getIdCalificacion(),
            "FK_ID_CANCHA"=>$unaCalificacion->getFkIdCancha(),
            "FK_ID_USUARIO"=>$unaCalificacion->getFkIdUsuario(),
            "NOMBRE_USUARIO"=>$rta2["NOMBRE"]." ".$rta2["APELLIDO"],
            "PUNTUACION"=>$unaCalificacion->getPuntuacion(),
            "COMENTARIO"=>$unaCalificacion->getComentario()
        ];

        $arrayFinal[]=$array;
    }
    echo json_encode($arrayFinal);
}

