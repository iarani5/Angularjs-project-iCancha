<?php

class Cancha{
	
	
/* 
CREATE TABLE Cancha(
	ID_CANCHA INT(8) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	NOMBRE_CANCHA VARCHAR(10) NOT NULL,
	FOTO VARCHAR(250) NOT NULL,
	TIPO_CANCHA ENUM ('Futbol','Tenis','Basket','Hockey','Rugby') DEFAULT 'Futbol',
	LONGITUD INT(9) NOT NULL,
	LATITUD INT(9) NOT NULL,
	DIRECCION VARCHAR(45) NOT NULL,
	BORRADO ENUM('Si','No') NOT NULL DEFAULT 'No',
	TARJETA INT(16) NOT NULL,
	CLAVE_TARJETA INT(4) NOT NULL,
	FECHA_VENCIMIENTO_TARJETA DATE NOT NULL,
	PUNTAJE INT(4) NOT NULL,
	PRECIO INT(4) UNSIGNED NOT NULL
);
*/
	
	/* A T R I B U T O S */
	private $codigo_cancha;
	private $nombre;
	private $foto;
	private $tipo_cancha;
	private $longitud;
	private $latitud;
	private $direccion;
	private $borrado;
	private $tarjeta;
	private $clave_tarjeta;
	private $fecha_vencimiento_tarjeta;
	private $puntaje;
	private $precio;
	
	//nombre de la tabla y columnas de la tabla.
	public static $tabla = "cancha";
	private static $fila = ['NOMBRE_CANCHA', 'FOTO','TIPO_CANCHA','CLAVE','LONGITUD','LATITUD','DIRECCION','BORRADO','TARJETA','CLAVE_TARJETA','FECHA_VENCIMIENTO_TARJETA','PUNTAJE','PRECIO'];

	/* G E T T E R S  &&  S E T T E R S */
	public function setCodigoCancha($a){
		$this->codigo_cancha = $a;
	}
	public function getCodigoCancha(){
		return $this->codigo_cancha;
	}
	public function setNombre($a){
		$this->nombre = $a;
	}
	public function getNombre(){
		return $this->nombre;
	}
	public function setFoto($a){
		$this->foto = $a;
	}
	public function getFoto(){
		return $this->foto;
	}
	public function setTipoCancha($a){
		$this->tipo_cancha = $a;
	}
	public function getTipoCancha(){
		return $this->tipo_cancha;
	}
	public function setLongitud($a){
		$this->longitud = $a;
	}
	public function getLongitud(){
		return $this->longitud;
	}
	public function setLatitud($a){
		$this->latitud = $a;
	}
	public function getLatitud(){
		return $this->latitud;
	}
	public function setDireccion($a){
		$this->direccion = $a;
	}
	public function getDireccion(){
		return $this->direccion;
	}
	public function setBorrado($a){
		$this->borrado = $a;
	}
	public function getBorrado(){
		return $this->borrado;
	}
	public function setTarjeta($a){
		$this->tarjeta = $a;
	}
	public function getTarjeta(){
		return $this->tarjeta;
	}
	public function setClaveTarjeta($a){
		$this->clave_tarjeta = $a;
	}
	public function getClaveTarjeta(){
		return $this->clave_tarjeta;
	}
	public function setFechaVencimientoTarjeta($a){
		$this->fecha_vencimiento_tarjeta = $a;
	}
	public function getFechaVencimientoTarjeta(){
		return $this->fecha_vencimiento_tarjeta;
	}
	public function setPuntaje($a){
		$this->puntaje = $a;
	}
	public function getPuntaje(){
		return $this->puntaje;
	}
	public function setPrecio($a){
		$this->precio = $a;
	}
	public function getPrecio(){
		return $this->precio;
	}
	
	/* M E T O D O S   D E   L A   C L A S E */
	
	public function getByPk($id){ //TRAER ESA CANCHA DE LA BDD (RECIBE POR PARAMETRO EL ID DE LA CANCHA)
		$query = "SELECT * FROM " . static::$tabla . "
					WHERE ID = $id";
		$stmt = DBcnx::getStatement($query);
		$stmt->execute([$id]);
		return /* $this->cargarDatos( */$stmt->fetch(PDO::FETCH_ASSOC)/* ) */;
	}
	
	public function cargarDatos($fila){ //RECIBE LA FILA DE LA BDD Y CARGA LOS DATOS EN LA CLASE CANCHA PHP (USA LOS SETTERS DE LA CLASE)
		foreach($fila as $prop => $valor) {
			if(in_array($prop, static::$fila)) {
				switch($prop){
					case "codigo_cancha":
						$this->setCodigoCancha($valor);
					break;
					case "nombre_cancha":
						$this->setNombre($valor);
					break;
					case "foto":
						$this->setFoto($valor);
					break;
					case "tipo_cancha":
						$this->setTipoCancha($valor);
					break;
					case "longitud":
						$this->setLongitud($valor);
					break;
					case "latitud":
						$this->setLatitud($valor);
					break;
					case "direccion":
						$this->setDireccion($valor);
					break;
					case "borrado":
						$this->setBorrado($valor);
					break;
					case "tarjeta":
						$this->setTarjeta($valor);
					break;
					case "clave_tarjeta":
						$this->setClaveTarjeta($valor);
					break;
					case "fecha_vencimiento_tarjeta":
						$this->setFechaVencimientoTarjeta($valor);
					break;
					case "puntaje":
						$this->setPuntaje($valor);
					break;
					case "precio":
						$this->setPrecio($valor);
					break;
			
				}
			}
		}
	}
	
	public function crear_cancha($array){  //REGISTRO DE CANCHA	
		$query = "INSERT INTO " . static::$tabla . " (NOMBRE_CANCHA,FOTO,TIPO_CANCHA,CLAVE,LONGITUD,LATITUD,DIRECCION,BORRADO,TARJETA,CLAVE_TARJETA,FECHA_VENCIMIENTO_TARJETA,PUNTAJE,PRECIO)
				VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["NOMBRE_CANCHA"],$array["FOTO"],$array["TIPO_CANCHA"],$array["CLAVE"],$array["LONGITUD"],$array["LATITUD"],$array["DIRECCION"],$array["BORRADO"],$array["TARJETA"],$array["CLAVE_TARJETA"],$array["FECHA_VENCIMIENTO_TARJETA"],$array["PUNTAJE"],$array["PRECIO"]]);
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
				$usuario->codigo_usuario = $fila['ID'];
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
