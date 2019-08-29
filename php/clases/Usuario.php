<?php

class Usuario{
	
	
	/* ID_USUARIO INT(9) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	EMAIL VARCHAR(50) NOT NULL UNIQUE,
	NOMBRE VARCHAR(45) NOT NULL,
	APELLIDO VARCHAR(45) NOT NULL,
	CLAVE VARCHAR(255) NOT NULL,
	TIPO_USUARIO ENUM ('Cliente','Duenio','Propietario','Administrador') DEFAULT 'Cliente',
	FOTO_PERFIL VARCHAR(250) NOT NULL DEFAULT 'iCancha/.img',
	BANNEADO ENUM('Si','No') NOT NULL DEFAULT 'No',
	BORRADO ENUM('Si','No') NOT NULL DEFAULT 'No' */
	
	/* A T R I B U T O S */
	private $codigo_usuario;
	private $email;
	private $nombre;
	private $apellido;
	private $clave;
	private $tipo_usuario;
	private $foto_perfil;
	private $banneado;
	private $borrado;
	
	//nombre de la tabla y columnas de la tabla.
	public static $tabla = "usuario";
	private static $fila = ['EMAIL', 'NOMBRE','APELLIDO','CLAVE','TIPO_USUARIO','FOTO_PERFIL','BANNEADO','BORRADO'];

	/* G E T T E R S  &&  S E T T E R S */
	public function setCodigoUsuario($a){
		$this->codigo_usuario = $a;
	}
	public function getCodigoUsuario(){
		return $this->codigo_usuario;
	}
	public function setEmail($a){
		$this->email = $a;
	}
	public function getEmail(){
		return $this->email;
	}
	public function setNombre($a){
		$this->nombre = $a;
	}
	public function getNombre(){
		return $this->nombre;
	}
	public function setApellido($a){
		$this->apellido = $a;
	}
	public function getApellido(){
		return $this->apellido;
	}
	public function setClave($a){
		$this->clave = $a;
	}
	public function getClave(){
		return $this->clave;
	}
	public function setTipoUsuario($a){
		$this->tipo_usuario = $a;
	}
	public function getTipoUsuario(){
		return $this->tipo_usuario;
	}
	public function setFotoPerfil($a){
		$this->foto_perfil = $a;
	}
	public function getFotoPerfil(){
		return $this->foto_perfil;
	}
	public function setBanneado($a){
		$this->banneado = $a;
	}
	public function getBanneado(){
		return $this->banneado;
	}
	public function setBorrado($a){
		$this->borrado = $a;
	}
	public function getBorrado(){
		return $this->borrado;
	}
	
	/* M E T O D O S   D E   L A   C L A S E */
	
	public function getByPk($id){ //TRAER ESE USUARIO DE LA BDD (RECIBE POR PARAMETRO EL ID DE ESE USURIO)
		$query = "SELECT * FROM " . static::$tabla . "
					WHERE ID_USUARIO = $id";
		$stmt = DBcnx::getStatement($query);
		$stmt->execute([$id]);
		return /* $this->cargarDatos( */$stmt->fetch(PDO::FETCH_ASSOC)/* ) */;
	}
	
	public function getNombreUsuario($id){
		$query = "SELECT NOMBRE FROM " . static::$tabla . "
					WHERE ID_USUARIO = $id";
		$stmt = DBcnx::getStatement($query);
		$stmt->execute([$id]);
		return /* $this->cargarDatos( */$stmt->fetch(PDO::FETCH_ASSOC)/* ) */;
	}
	
	public function cargarDatos($fila){ //RECIBE LA FILA DE LA BDD Y CARGA LOS DATOS EN LA CLASE USUARIO PHP (USA LOS SETTERS DE LA CLASE)
		foreach($fila as $prop => $valor) {
			if(in_array($prop, static::$fila)) {
				switch($prop){
					case "email":
						$this->setEmail($valor);
					break;
					case "nombre":
						$this->setNombre($valor);
					break;
					case "apellido":
						$this->setApellido($valor);
					break;
					case "clave":
						$this->setClave($valor);
					break;
					case "tipo_usuario":
						$this->setTipoUsuario($valor);
					break;
					case "foto_perfil":
						$this->setFotoPerfil($valor);
					break;
					case "banneado":
						$this->setBanneado($valor);
					break;
					case "borrado":
						$this->setBorrado($valor);
					break;
				}
			}
		}
	}
	
	public function chequear_mail($mail){ //VER SI EL MAIL YA EXISTE
		$query = "SELECT * FROM " . static::$tabla . " WHERE EMAIL=? LIMIT 1";
		$stmt = DBcnx::getStatement($query);
		$array=[];
		if($stmt->execute([$mail])){
			while($f = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$array=$f;
			}
		}
		$json=json_encode($array);
		return $json;
	}
	
	public function crear_usuario($array){  //REGISTRO DE USUARIO
		$query = "INSERT INTO " . static::$tabla . " (EMAIL, CLAVE, NOMBRE, APELLIDO, TIPO_USUARIO)
				VALUES (?, sha2(?, 224), ?, ?, ?)";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["EMAIL"],$array["CLAVE"],$array["NOMBRE"],$array["APELLIDO"],$array["TIPO_USUARIO"]]);
	}
	
	public function editar_usuario($variable,$array){ //EDICION DE DATOS DE USUARIO
		$query = "UPDATE " . static::$tabla . " SET $variable=? WHERE ID_USUARIO=?";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["VALOR"],$array["ID_USUARIO"]]);
	}
	
	public function editar_clave($contrasenia,$id){ //EDICION DE CLAVE
		$query = "UPDATE " . static::$tabla . " SET CLAVE=sha2(?, 224) WHERE ID_USUARIO=?";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$contrasenia,$id]);
	}
	
	public function verificar_usuario($mail, $contrasenia){ //LOGIN DE USUARIO
		$query = "SELECT * FROM " . static::$tabla . " WHERE EMAIL=? AND CLAVE=sha2(?, 224)";
		$stmt = DBcnx::getStatement($query);
		$array=[];
		if($stmt->execute([$mail,$contrasenia])){
			while($f = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$array=$f;
			}
		}
		$json=json_encode($array);
		return $json;
	}
	
	
	public static function all(){ //LISTAR TODO EL LISTADO DE LA TABLA USUARIO
		$salida = [];
		$query = "SELECT * FROM " . static::$tabla;
		$stmt = DBcnx::getStatement($query);
		if($stmt->execute()) {
			while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$usuario = new Usuario;
				$usuario->codigo_usuario = $fila['ID_USUARIO'];
				$usuario->email = $fila['EMAIL'];
				$usuario->nombre = $fila['NOMBRE'];
				$usuario->apellido = $fila['APELLIDO'];
				$usuario->clave = $fila['CLAVE'];
				$usuario->tipo_usuario = $fila['TIPO_USUARIO'];
				$usuario->foto_perfil = $fila['FOTO_PERFIL'];
				$usuario->borrado = $fila['BORRADO'];
				$usuario->banneado = $fila['BANNEADO'];
				$usuario->cargarDatos($fila);
				$salida[] = $usuario;
			}
		}
		return $salida;
	}
}
