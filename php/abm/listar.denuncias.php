<?php
//header("Access-Control-Allow-Origin: *");

/****** Clases ******/

require_once('../config.php');
require_once('../funciones.php');
require_once('../clases/DBcnx.php');
require_once('../clases/Denuncia.php');
require_once('../clases/Usuario.php');

$denuncia=new Denuncia();
$usuario=new Usuario();
$arrayFinal=[];
$array=[];
$rta2=$denuncia->all();
foreach($rta2 as $unaDenuncia){

    $el_usuario = $usuario->getByPk($unaDenuncia->getFkIdUsuario());
    $el_propietario =  $usuario->getByPk($unaDenuncia->getFkIdPropietario());

    $array=[
        "ID_DENUNCIA"=>$unaDenuncia->getIdDenuncia(),
        "FK_ID_USUARIO"=>$unaDenuncia->getFkIdUsuario(),
        "USUARIO_EMAIL"=>$el_usuario["EMAIL"],
        "BANNEADO"=>$el_usuario["BANNEADO"],
        "PROPIETARIO_EMAIL"=>$el_propietario["EMAIL"],
        "FK_ID_PROPIETARIO"=>$unaDenuncia->getFkIdPropietario()
    ];

    $arrayFinal[]=$array;
}
echo json_encode($arrayFinal);

