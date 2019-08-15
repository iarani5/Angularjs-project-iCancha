<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Usuario.php');
	// require_once('../clases/Validacion.php');	 //para validar datos desde php
	
	/***** Validacion *****/
	
	/* $reglas = [
		'EMAIL' => 'required|email',
		'NOMBRE' => 'required|nombre',
		'APELLIDO' => 'required|apellido',
		'CLAVE' => 'required|clave',
	];

	$validacion = new Validacion($_POST, $reglas);
	$rta= json_encode($validacion->getErrores())."\n"; 

	//validacion
	if(count(json_decode($rta))){
		echo $rta;
		return 0;
	}
	else{*/
		
	$usuario = new Usuario();
	
	//pregunto si esta editando los datos 
	if(!isset($_POST["edicion"]){
		//me fijo si ya existe el mail
		$ya_exite=$usuario->chequear_mail($_POST["EMAIL"]);
		if(count(json_decode($ya_exite))){
			echo "existe";
			return 0;
		}
	}
	else{ //Edito datos de usario
		$_POST["ID"]=$_SESSION['s_id'];
		$_POST["VALOR"]=$_POST["NOMBRE"];
		$fin2=json_decode($usuario->editar_usuario("NOMBRE", $_POST),true);
		$_POST["VALOR"]=$_POST["APELLIDO"];
		$fin2=json_decode($usuario->editar_usuario("APELLIDO", $_POST),true);
		
		$fin2=json_decode($usuario->editar_clave($_POST["CLAVE"], $_POST["ID"]),true);
	}
	
	/****** Creo el usuario ******/
	$fin=json_decode($usuario->crear_usuario($_POST),true);
	if($fin){
			/****** Logeo al usuario ******/
			$fin2=json_decode($usuario->verificar_usuario($_POST["EMAIL"], $_POST["CLAVE"]),true);
			if(count($fin2)){
				foreach ($fin2 as $k => $v) {
					/***** Guardado de datos en SESSION ****/
					switch($k){
						case "ID":
							$_SESSION['s_id'] = $v;
						break;
						case "NIVEL":
							$_SESSION['s_nivel'] = $v;
						break;
					}
				}
				echo json_encode($fin2);
			}
		}
		
	/*}*/

?>