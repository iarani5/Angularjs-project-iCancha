<?php
//header("Access-Control-Allow-Origin: *");

/****** Clases *****/

require_once('../config.php');
require_once('../funciones.php');
require_once('../clases/DBcnx.php');
require_once('../clases/Reserva.php');
require_once('../clases/Horario.php');
require_once('../clases/Cancha.php');

if(isset($_SESSION["s_id"])){
    $reserva = new Reserva();
    $arrayFinal=[];
    $array=[];

    /****** traigo reservas ******/
    $rta=$reserva->mis_reservas($_SESSION["s_id"]);

    foreach($rta as $unaReserva) {
        $horario = new Horario();
        $rta2=$horario->traer_este_hoario($unaReserva->getFkIdHorario());
        $lista_horario=[];

        foreach($rta2 as $unHorario) {
            $lista_horario = [
                "ID_HORARIO"=>$unHorario->getIdHorario(),
                "FK_ID_CANCHA"=>$unHorario->getFkIdCancha(),
                "DIA"=>$unHorario->getDia(),
                "HORA"=>$unHorario->getHora(),
                "DIA_VALOR"=>$unHorario->getDiaValor(),
                "HORA_VALOR"=>$unHorario->getHoraValor(),
                "ESTADO"=>$unHorario->getEstado(),
            ];
        }

        $cancha = new Cancha();
        $rta2=$cancha->mis_canchas($unaReserva->getFkIdCancha());
        $lista_cancha=[];

        foreach($rta2 as $unaCancha) {
            $lista_cancha = [
                "ID_CANCHA"=>$unaCancha->getIdCancha(),
                "NOMBRE_CANCHA"=>$unaCancha->getNombre_cancha(),
                "FOTO"=>$unaCancha->getFoto(),
                "BARRIO"=>$unaCancha->getBarrio(),
                "TIPO_CANCHA"=>$unaCancha->getTipoCancha(),
                "DIRECCION"=>$unaCancha->getDireccion(),
                "PUNTAJE"=>$unaCancha->getPuntaje(),
                "PRECIO"=>$unaCancha->getPrecio(),
            ];
        }


        $array = [
            "ID_RESERVA" => $unaReserva->getIdReserva(),
            "FK_ID_HORARIO" => $unaReserva->getFkIdHorario(),
            "FK_ID_CANCHA" => $unaReserva->getFkIdCancha(),
            "CANCELADO" => $unaReserva->getCancelado(),
            "UN_HORARIO" => $lista_horario,
            "UNA_CANCHA" => $lista_cancha,
        ];

        $arrayFinal[]=$array;
    }

        echo json_encode($arrayFinal);

}
else{
    echo "usuario no registrado";
}


