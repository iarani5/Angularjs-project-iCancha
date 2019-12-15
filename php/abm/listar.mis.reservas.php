<?php
//header("Access-Control-Allow-Origin: *");

/****** Clases *****/

require_once('../config.php');
require_once('../funciones.php');
require_once('../clases/DBcnx.php');
require_once('../clases/Reserva.php');
require_once('../clases/Horario.php');
require_once('../clases/Cancha.php');
require_once('../clases/Duenio.php');
require_once('../clases/Usuario.php');
require_once('../clases/Denuncia.php');

if(isset($_SESSION["s_id"])){

    $reserva = new Reserva();
    $arrayFinal=[];
    $array=[];
    $rta=[];

    if($_SESSION["s_nivel"]=="Propietario") {

        /****** traigo reservas propietario******/

        $duenio = new Duenio();
        $rta1=$duenio->all($_SESSION["s_id"]);

        foreach($rta1 as $misCanchas) {
            $rta2 = $reserva->reservas_usuarios($misCanchas->getFkIdCancha());
            if(sizeof($rta2)>0){
                foreach($rta2 as $unaReserva) {
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
                            "ESTADO"=>$unHorario->getEstado()
                        ];
                    }

                    $usuario = new Usuario();
                    $lista_usuario=$usuario->getByPk($unaReserva->getFkIdUsuario());

                    $denuncia = new Denuncia();
                    $denunciado=$denuncia->denunciado($lista_usuario["ID_USUARIO"],$_SESSION["s_id"]);
                    if($denunciado){
                        $lista_usuario["DENUNCIADO"]="Si";
                    }
                    else{
                        $lista_usuario["DENUNCIADO"]="No";
                    }
                    /** denunciado */

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
                        "EL_USUARIO" => $lista_usuario,
                    ];

                    $arrayFinal[]=$array;
                }

            }
        }
        echo json_encode($arrayFinal);

    }
    else{
        /****** traigo reservas cliente******/
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

}
else{
    echo "usuario no registrado";
}


