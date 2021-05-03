<?php
//header("Access-Control-Allow-Origin: *");

	/****** Clases ******/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Cancha.php');
	require_once('../clases/Duenio.php');
	//require_once('../clases/Cancha_Like.php');
	//require_once('../clases/Cancha_Comentario.php');
	
	$cancha=new Cancha();
	$duenio=new Duenio();
	$rta=$duenio->all($_SESSION["s_id"]);
	$arrayFinal=[];
	$array=[];
	for($i=0;$i<count($rta);$i++){
		$rta2=$cancha->mis_canchas($rta[$i]->getFkIdCancha());
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
			
			$arrayFinal[]=$array;
		}
			
	}		
		echo json_encode($arrayFinal);

