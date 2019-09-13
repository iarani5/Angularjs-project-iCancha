<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Cancha.php');
	
	if(isset($_SESSION["s_id"])){

		$cancha = new Cancha();
		$fin2=json_decode($cancha->eliminar_cancha($_POST["ID_CANCHA"]),true);
			
		echo $fin2;
	}
	?>