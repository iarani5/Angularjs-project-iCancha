<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Usuario.php');
	
	if(isset($_SESSION["s_id"])){
		$usuario = new Usuario();

	//Edito datos de usario
		$_POST["ID_USUARIO"]=$_SESSION['s_id'];
		
		$_POST["VALOR"]=$_POST["NOMBRE"];
		$fin=$usuario->editar_usuario("NOMBRE", $_POST);
	
		$_POST["VALOR"]=$_POST["APELLIDO"];
		$fin2=$usuario->editar_usuario("APELLIDO", $_POST);
		
		//editar clave usuario
		//$fin2=json_decode($usuario->editar_clave($_POST["CLAVE"], $_POST["ID"]),true);
	
	}
	else{
		session_destroy();
		echo "no logueado";
	} 