<?php
//header("Access-Control-Allow-Origin: *");

	/****** Clases ******/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Categoria.php');
	
	//Pido todo el contenido de categoria
	$categoria = Categoria::all();
	$arrayFinal=[];
	$array=[];
	foreach($categoria as $unaCategoria){
			$array=[
				"ID"=>$unaCategoria->getCodigoCategoria(),
				"TITULO"=>$unaCategoria->getTitulo()
			];
		$arrayFinal[]=$array;
	}
	echo json_encode($arrayFinal);
?> 