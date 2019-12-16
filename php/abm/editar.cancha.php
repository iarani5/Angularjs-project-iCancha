<?php
header("Access-Control-Allow-Origin: *");

/****** Clases *****/

require_once('../config.php');
require_once('../funciones.php');
require_once('../clases/DBcnx.php');
require_once('../clases/Cancha.php');
require_once('../clases/Duenio.php');
require_once('../clases/Horario.php');

if(isset($_SESSION["s_id"])) {
    $cancha = new Cancha();
    $horario = new Horario();

    /****** Edito cancha ******/
    $fin = $cancha->editar_cancha($_POST);

    /******* Edito horario ******/
    $array_horario=[];
    $array_horario["FK_ID_CANCHA"] = $_POST["ID_CANCHA"];
    $array_horarios_existentes=[];

    //traigo listado de horarios ya cargados en la bdd
    $rta=$horario->all($_POST["ID_CANCHA"]);
    foreach($rta as $unHorario){
         $rta2=$horario->eliminar_horario($unHorario->getIdHorario());
    }

    foreach($_POST as $key => $valor) {
        switch ($key) {
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":

            if($valor!=="") {
                $horario_lista = explode(",", $valor);

                $ban=0;
                     for ($i=0;$i<sizeof($horario_lista);$i++) {
                         if(sizeof($horario_lista)>=2){
                             if($horario_lista[0]==$horario_lista[1]&&!$ban){
                                 $i++;
                                 $ban=1;
                             }
                         }
                         $array_horario["DIA"] = $key;
                         $array_horario["HORA"] = $horario_lista[$i];
                         $horario->crear_horario($array_horario);
                    }
                }
                break;
        }
    }

    echo $fin;
}
else{
    echo "usuario no registrado";
}


