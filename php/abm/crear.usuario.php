<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Usuario.php');
	// require_once('../clases/Validacion.php');	 //para validar datos desde php
	
	/***** Validacion *****/
		
	$usuario = new Usuario();
	
		//me fijo si ya existe el mail
		$ya_exite=$usuario->chequear_mail($_POST["EMAIL"]);
		if(count(json_decode($ya_exite))){
			echo "existe";
			return 0;
		}
	
	/****** Creo el usuario ******/
	$fin=json_decode($usuario->crear_usuario($_POST),true);
	echo $fin;
	/*if($fin){
			/****** Logeo al usuario ******
			$fin2=json_decode($usuario->verificar_usuario($_POST["EMAIL"], $_POST["CLAVE"]),true);
			if(count($fin2)){
				foreach ($fin2 as $k => $v) {
					/***** Guardado de datos en SESSION ****
					switch($k){
						case "ID_USUARIO":
							$_SESSION['s_id'] = $v;
						break;
						case "TIPO_USUARIO":
							$_SESSION['s_nivel'] = $v;
						break;
					}
				}
				echo json_encode($fin2);
			}
		}*/
