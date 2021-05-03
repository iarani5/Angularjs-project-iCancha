<?php
//header("Access-Control-Allow-Origin: *");

	/****** Clases ******/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Cancha.php');
	
	$cancha = new Cancha();
	$rta = $cancha->all();
	$arrayFinal = [];
	$array = [];
	foreach($rta as $unaCancha){
		$array=[
			"ID_CANCHA"=>$unaCancha->getIdCancha(),
			"NOMBRE_CANCHA"=>$unaCancha->getNombre_cancha(),
			"FOTO"=>$unaCancha->getFoto(),
			"TIPO_CANCHA"=>$unaCancha->getTipoCancha(),
			"BARRIO"=>$unaCancha->getBarrio(),
			"DIRECCION"=>$unaCancha->getDireccion(),
			"BORRADO"=>$unaCancha->getBorrado(),
			"TARJETA"=>$unaCancha->getTarjeta(),
			"PUNTAJE"=>$unaCancha->getPuntaje(),
			"PRECIO"=>$unaCancha->getPrecio()
		];
			
		$arrayFinal[]=$array;
	}
			
	echo json_encode($arrayFinal);

?> 
