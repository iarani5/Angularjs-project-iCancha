<?php
//header("Access-Control-Allow-Origin: *");

/****** Clases ******/

require_once('../config.php');
require_once('../funciones.php');
require_once('../clases/DBcnx.php');
require_once('../clases/Horario.php');

$horario=new Horario();
$arrayFinal=[];
$array=[];
 $rta=$horario->all($_POST["FK_ID_CANCHA"]);
    foreach($rta as $unHorario){

        $array=[
            "ID_HORARIO"=>$unHorario->getIdHorario(),
            "FK_ID_CANCHA"=>$unHorario->getFkIdCancha(),
            "DIA"=>$unHorario->getDia(),
            "HORA"=>$unHorario->getHora(),
            "DIA_VALOR"=>$unHorario->getDiaValor(),
            "HORA_VALOR"=>$unHorario->getHoraValor(),
            "ESTADO"=>$unHorario->getEstado(),
        ];

        $arrayFinal[]=$array;

    }
echo json_encode($arrayFinal);

