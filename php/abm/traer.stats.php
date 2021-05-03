<?php
//header("Access-Control-Allow-Origin: *");

/****** Clases ******/

require_once('../config.php');
require_once('../funciones.php');
require_once('../clases/DBcnx.php');
require_once('../clases/Cancha.php');
require_once('../clases/Usuario.php');
require_once('../clases/Administrador.php');

if(isset($_SESSION["s_nivel"])=="Administrador"){
    $administrador=new Administrador();
    $rta2 = $administrador->traer_stats_usuarios();
    $arrayFinal=[];

        foreach($rta2 as $unUsuario){

            $array=[
                "ID_USUARIO"=>$unUsuario->getCodigoUsuario(),
                "TIPO_USUARIO"=>$unUsuario->getTipoUsuario(),
                "BANNEADO"=>$unUsuario->getBanneado(),
                "BORRADO"=>$unUsuario->getBorrado()
            ];

            $arrayFinal[]=$array;
    }

    $arrayFinal2=[];
    $rta2 = $administrador->traer_stats_canchas();

    foreach($rta2 as $unaCancha){

            $array=[
                "ID_CANCHA"=>$unaCancha->getIdCancha(),
                "NOMBRE_CANCHA"=>$unaCancha->getNombre_cancha(),
                "FOTO"=>$unaCancha->getFoto(),
                "TIPO_CANCHA"=>$unaCancha->getTipoCancha(),
                "BARRIO"=>$unaCancha->getBarrio(),
                "DIRECCION"=>$unaCancha->getDireccion(),
                "BORRADO"=>$unaCancha->getBorrado(),
                "PUNTAJE"=>$unaCancha->getPuntaje(),
                "PRECIO"=>$unaCancha->getPrecio()
            ];

            $arrayFinal2[]=$array;
        }

    $respuesta[]=$arrayFinal;
    $respuesta[]=$arrayFinal2;

    echo json_encode($respuesta);

}
