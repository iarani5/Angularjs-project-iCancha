<?php
	header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Cancha.php');
	require_once('../clases/Duenio.php');
	require_once('../clases/Horario.php');
	
	if(isset($_SESSION["s_id"])){
	    $cancha = new Cancha();
	
	/****** Creo cancha ******/
        if(!empty($_FILES)&&$_FILES['FOTO']['name']){ //hay foto
            if($_FILES['FOTO']['type']!='image/png'&&$_FILES['FOTO']['type']!='image/jpeg'&&$_FILES['FOTO']['type']!='image/jpg'){
                //error formato no permitido
                echo "formato";
                return 0;
            }

                $errors= array();
                $file_name = $_FILES['FOTO']['name'];
                $file_size = $_FILES['FOTO']['size'];
                $file_tmp = $_FILES['FOTO']['tmp_name'];
                $file_type = $_FILES['FOTO']['type'];
                $file_ext=strtolower(end(explode('.',$_FILES['FOTO']['name'])));

                if($file_size > 2097152) {
                    $errors[]='File size must be excately 2 MB';
                }

                if(empty($errors)==true) {
                    move_uploaded_file($file_tmp,"/home/u857521991/public_html/icancha/images/canchas/".$file_name);
                }else{
                    print_r($errors);
                }


            //creo carpeta para foto
            $foto = $_FILES['FOTO']['name'];

            //nombre de archivo y ruta

            $destino = 'https://phiware.com.ar/icancha/images/canchas/'.$foto;

            /**** RESIZE

            $ruta_temporal = $_FILES['FOTO']['tmp_name'];
            if($_FILES['FOTO']['type']=='image/png'){
                $original=imagecreatefrompng( $ruta_temporal );
            }
            else if($_FILES['FOTO']['type']=='image/jpeg'||$_FILES['FOTO']['type']=='image/jpg'){
                $original=imagecreatefromjpeg( $ruta_temporal );
            }

            $ancho_o = imagesx( $original );
            $alto_o = imagesy( $original );
            $alto_n = 500; // de alto
            $ancho_n = round($alto_n  * $ancho_o / $alto_o) ;
            $copia = imagecreatetruecolor( $ancho_n, $alto_n );
            imagecopyresampled( $copia, $original, 0,0, 0,0, $ancho_n, $alto_n, $ancho_o, $alto_o );

            imagejpeg( $copia, $destino, 100 );

            imagedestroy($copia);
            imagedestroy($original);

            /***************/



            $_POST["FOTO"]=$destino;



            $fin=json_decode($cancha->crear_cancha($_POST),true);


            if($fin){

                $id=$cancha->ultima_cancha_creada();
                $id=$id->getIdCancha();

                $cancha=$cancha->ultima_cancha_creada();
                $array["FK_ID_CANCHA"]=$id;
                $array["FK_ID_USUARIO"]=$_SESSION["s_id"];
                $duenio = new Duenio();
                $fin=json_decode($duenio->crear_duenio($array),true);

                // cargo horarios de la cancha
                $horario = new Horario();

                $array_horario["FK_ID_CANCHA"] = $array["FK_ID_CANCHA"];

                foreach($_POST["HORARIOS"] as $key => $valor) {

                    $array_horario["DIA"]=$key+1;
                    foreach($valor as $un_horario){
                        $array_horario["HORA"]=$un_horario;
                        $horario->crear_horario($array_horario);
                    }
                }

            }
            echo $fin;

        }

	/*if(!empty($_FILES)&&$_FILES['FOTO']['name']){ //hay foto
		if($_FILES['FOTO']['type']!='image/png'&&$_FILES['FOTO']['type']!='image/jpeg'&&$_FILES['FOTO']['type']!='image/jpg'){
			//error formato no permitido
			echo "formato";
			return 0;
		}

		//creo carpeta para foto
			$carpeta=$cancha->ultima_cancha_creada();
			$carpeta=$carpeta->getIdCancha();

        //nombre de archivo y ruta

            if(!is_dir("https://phiware.com.ar/icancha/img/canchas/".$carpeta)){
				mkdir("https://phiware.com.ar/icancha/img/canchas/".$carpeta);
			}
			
			//nombre de archivo y ruta
			$foto = $_FILES['FOTO']['name'];
			$destino = 'https://phiware.com.ar/icancha/img/canchas/'.$foto;
			
			/**** RESIZE ****
			
			$ruta_temporal = $_FILES['FOTO']['tmp_name']; 
			if($_FILES['FOTO']['type']=='image/png'){
				$original=imagecreatefrompng( $ruta_temporal );
			}
			else if($_FILES['FOTO']['type']=='image/jpeg'||$_FILES['FOTO']['type']=='image/jpg'){
				$original=imagecreatefromjpeg( $ruta_temporal );
			}
			
			$ancho_o = imagesx( $original );
			$alto_o = imagesy( $original );
			$alto_n = 500; //300px de alto
			$ancho_n = round($alto_n  * $ancho_o / $alto_o) ;
			$copia = imagecreatetruecolor( $ancho_n, $alto_n );
			imagecopyresampled( $copia, $original, 0,0, 0,0, $ancho_n, $alto_n, $ancho_o, $alto_o );
			
			imagejpeg( $copia, $destino, 100 );
			
			imagedestroy($copia);
			imagedestroy($original);
			
			/***************
			

			// cancha creada la asocio a la tabla duenio
			if($fin2){
				$cancha=$cancha->ultima_cancha_creada();
				$array["FK_ID_CANCHA"]=$cancha->getIdCancha();
				$array["FK_ID_USUARIO"]=$_SESSION["s_id"];
				$duenio = new Duenio();
				$fin=json_decode($duenio->crear_duenio($array),true);
				
				// cargo horarios de la cancha
				$horario = new Horario();

				$array_horario["FK_ID_CANCHA"] = $array["FK_ID_CANCHA"];

                foreach($_POST["HORARIOS"] as $key => $valor) {

                    $array_horario["DIA"]=$key+1;
                    foreach($valor as $un_horario){
                        $array_horario["HORA"]=$un_horario;
                        $horario->crear_horario($array_horario);
                    }
                }

			}
			
			
			echo $fin;
	}*/
}
else{
	echo "usuario no registrado";
}
	

