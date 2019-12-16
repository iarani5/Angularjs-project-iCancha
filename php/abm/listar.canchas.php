<?php
//header("Access-Control-Allow-Origin: *");

	/****** Clases ******/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Cancha.php');
	require_once('../clases/Duenio.php');
	require_once('../clases/Calificacion.php');

	$cancha=new Cancha();
	$duenio=new Duenio();
	$rta=$duenio->all($_SESSION["s_id"]);
	$arrayFinal=[];
	$array=[];
	for($i=0;$i<count($rta);$i++){
		$rta2=$cancha->mis_canchas($rta[$i]->getFkIdCancha());
			foreach($rta2 as $unaCancha){

                $calificacion = new Calificacion();
                $rta2=$calificacion->traer_calificacion_cancha($unaCancha->getIdCancha());
                $lista_puntaje_final=[];

                foreach($rta2 as $unaCalificacion){
                    $lista_puntaje=[
                        "PUNTUACION"=>$unaCalificacion->getPuntuacion()
                    ];

                    $lista_puntaje_final[]=$lista_puntaje;
                }



                $array=[
				"ID_CANCHA"=>$unaCancha->getIdCancha(),
				"NOMBRE_CANCHA"=>$unaCancha->getNombre_cancha(),
				"FOTO"=>$unaCancha->getFoto(),
				"TIPO_CANCHA"=>$unaCancha->getTipoCancha(),
				"BARRIO"=>$unaCancha->getBarrio(),
				"DIRECCION"=>$unaCancha->getDireccion(),
				"BORRADO"=>$unaCancha->getBorrado(),
				"PUNTAJE"=>$lista_puntaje_final,
				"PRECIO"=>$unaCancha->getPrecio()
			];
			
			$arrayFinal[]=$array;
		}
			
	}		
		echo json_encode($arrayFinal);

