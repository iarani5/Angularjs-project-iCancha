<?php
//header("Access-Control-Allow-Origin: *");

	/****** Clases ******/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Horario.php');
	
	if(isset($_POST)){
		$horario=new Horario();
		$rta=$horario->all($_POST["FK_ID_CANCHA"]);
		$arrayFinal=[];
		$array=[];

		foreach($rta as $unHorario){

			$array=[
				"ID_HORARIO"=>$unHorario->getIdHorario(),
				"FK_ID_CANCHA"=>$unHorario->getFkIdCancha(),
				"HORARIO"=>$unHorario->getHorario(),
				"ESTADO"=>$unHorario->getEstado()
			];
			
			$arrayFinal[]=$array;
		}
		echo json_encode($arrayFinal);
	}
?> 