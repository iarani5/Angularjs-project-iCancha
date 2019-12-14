<?php
//header("Access-Control-Allow-Origin: *");

/****** Clases ******/

require_once('../config.php');
require_once('../funciones.php');
require_once('../clases/DBcnx.php');
require_once('../clases/Cancha.php');
require_once('../clases/Horario.php');
//require_once('../clases/Cancha_Like.php');
//require_once('../clases/Cancha_Comentario.php');


$cancha=new Cancha();
$rta = $cancha->buscar_cancha($_POST);

$arrayFinal=[];
$array=[];

    foreach($rta as $unaCancha){
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

        $arrayFinal[]=$array;
    }

    //FILTRAR POR DIA Y HORA
    $horario=new Horario();
    $arrayFinalDia=[];
    $arrayFinalDiaHora=[];
    $arrayFinalHora=[];

    // hay dia y hora
    if($_POST["HORARIO"]!=0&&$_POST["DIA"]!=0){
        for($i=0;$i<sizeof($arrayFinal);$i++){
            $rta = $horario->filtrar_por_hora_dia($arrayFinal[$i]["ID_CANCHA"],$_POST["HORARIO"],$_POST["DIA"]);
            if(sizeof($rta)>0) {
                foreach ($rta as $unHorario) {
                    $arrayFinal[$i]["ID_HORARIO"] = $unHorario->getIdHorario();
                    $arrayFinalDiaHora[]=$arrayFinal[$i];
                }
            }
        }
        echo json_encode($arrayFinalDiaHora);
    }

    // hay hora solo
    else if($_POST["HORARIO"]!=0&&$_POST["DIA"]==0){
        for($i=0;$i<sizeof($arrayFinal);$i++){
            $rta = $horario->filtrar_por_hora($arrayFinal[$i]["ID_CANCHA"],$_POST["HORARIO"]);
            if(sizeof($rta)>0) {
                foreach ($rta as $unHorario) {
                    $arrayFinal[$i]["ID_HORARIO"] = $unHorario->getIdHorario();
                    $arrayFinalHora[]=$arrayFinal[$i];
                }
            }
        }
        echo json_encode($arrayFinalHora);
    }

    // hay dia solo
    else if($_POST["HORARIO"]==0 && $_POST["DIA"]!=0){
        for($i=0;$i<sizeof($arrayFinal);$i++){
           $rta = $horario->filtrar_por_dia($arrayFinal[$i]["ID_CANCHA"],$_POST["DIA"]);
           if(sizeof($rta)>0) {
               foreach ($rta as $unHorario) {
                   $arrayFinal[$i]["ID_HORARIO"] = $unHorario->getIdHorario();
                   $arrayFinalDia[]=$arrayFinal[$i];
               }
           }
        }
        echo json_encode($arrayFinalDia);
    }
    
    else{
        echo json_encode($arrayFinal);
    }



