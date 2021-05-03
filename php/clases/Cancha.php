<?php

class Cancha{
	
	
/* 
CREATE TABLE Cancha(
	ID_CANCHA INT(8) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	NOMBRE_CANCHA VARCHAR(10) NOT NULL,
	FOTO VARCHAR(250) NOT NULL,
	TIPO_CANCHA ENUM ('Futbol','Tenis','Basket','Hockey','Rugby') DEFAULT 'Futbol',
	BARRIO VARCHAR(45) NOT NULL,
	DIRECCION VARCHAR(45) NOT NULL,
	BORRADO ENUM('Si','No') NOT NULL DEFAULT 'No',
	PUNTAJE INT(4) NOT NULL,
	PRECIO INT(4) UNSIGNED NOT NULL
);
*/
	
	/* A T R I B U T O S */
	private $id_cancha;
	private $nombre_cancha;
	private $foto;
	private $tipo_cancha;
	private $barrio;
	private $direccion;
	private $borrado;
	private $puntaje;
	private $precio;
	
	//nombre_cancha de la tabla y columnas de la tabla.
	public static $tabla = "cancha";
	private static $fila = ['NOMBRE_CANCHA', 'FOTO','TIPO_CANCHA','CLAVE','BARRIO', 'DIRECCION','BORRADO','PUNTAJE','PRECIO'];

	/* G E T T E R S  &&  S E T T E R S */
	public function setIdCancha($a){
		$this->id_cancha = $a;
	}
	public function getIdCancha(){
		return $this->id_cancha;
	}
	public function setNombre_cancha($a){
		$this->nombre_cancha = $a;
	}
	public function getNombre_cancha(){
		return $this->nombre_cancha;
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
	public function setBarrio($a){
		$this->barrio = $a;
	}
	public function getBarrio(){
		return $this->barrio;
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
					case "id_cancha":
						$this->setIdCancha($valor);
					break;
					case "nombre_cancha":
						$this->setNombre_cancha($valor);
					break;
					case "foto":
						$this->setFoto($valor);
					break;
					case "tipo_cancha":
						$this->setTipoCancha($valor);
					break;
					case "barrio":
						$this->setBarrio($valor);
					break;
					case "direccion":
						$this->setDireccion($valor);
					break;
					case "borrado":
						$this->setBorrado($valor);
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
		$query = "INSERT INTO " . static::$tabla . " (NOMBRE_CANCHA,TIPO_CANCHA,BARRIO,DIRECCION,PUNTAJE,PRECIO)
				VALUES (?, ?, ?, ?, ?, ?)";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["NOMBRE_CANCHA"],$array["TIPO_CANCHA"],$array["BARRIO"],$array["DIRECCION"],$array["PUNTAJE"],$array["PRECIO"]]);
	}
	
	public function foto($array){ //FOTO
		$query = "UPDATE " . static::$tabla . " SET FOTO=? WHERE ID_CANCHA=?";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["FOTO"],$array["ID_CANCHA"]]);
	}
	public function eliminar_cancha($id){ //BORRADO
		$query = "UPDATE " . static::$tabla . " SET BORRADO='Si' WHERE ID_CANCHA=$id";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute();
	}

	public function editar_cancha($array){ //EDITAR
		$query = "UPDATE " . static::$tabla . " SET NOMBRE_CANCHA='".$array['NOMBRE']."', BARRIO='".$array["BARRIO"]."', DIRECCION='".$array["DIRECCION"]."', TIPO_CANCHA='".$array["TIPO_CANCHA"]."', PRECIO='".$array["PRECIO"]."' WHERE ID_CANCHA=".$array["ID_CANCHA"]."";

		$stmt = DBcnx::getStatement($query);
		return $stmt->execute();
	}
	
	public function ultima_cancha_creada(){ //ULTIMA CANCHA CREADA
		$query = "SELECT ID_CANCHA FROM " . static::$tabla . " ORDER BY ID_CANCHA DESC LIMIT 1";
		$stmt = DBcnx::getStatement($query);
		if($stmt->execute()) {
			while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$cancha = new Cancha;
				$cancha->id_cancha = $fila['ID_CANCHA'];
				$cancha->cargarDatos($fila);
			}
			return $cancha;
		}
		return 0;
	}
	
	public static function all(){ //LISTAR TODO EL LISTADO DE LA TABLA CANCHA
		$salida = [];
		$query = "SELECT * FROM " . static::$tabla;
		$stmt = DBcnx::getStatement($query);
		if($stmt->execute()) {
			while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$cancha = new Cancha;
				$cancha->id_cancha = $fila['ID_CANCHA'];
				$cancha->nombre_cancha = $fila['NOMBRE_CANCHA'];
				$cancha->foto = $fila['FOTO'];
				$cancha->tipo_cancha = $fila['TIPO_CANCHA'];
				$cancha->barrio = $fila['BARRIO'];
				$cancha->direccion = $fila['DIRECCION'];
				$cancha->borrado = $fila['BORRADO'];

				$cancha->puntaje = $fila['PUNTAJE'];
				$cancha->precio = $fila['PRECIO'];
				$cancha->cargarDatos($fila);
				$salida[] = $cancha;
			}
		}
		return $salida;
	}
	
	public static function mis_canchas($id){ //LISTAR TODO EL LISTADO DE LA TABLA CANCHA POR DUENIO		
		$salida = [];
		$query = "SELECT * FROM " . static::$tabla . "
					WHERE ID_CANCHA = $id AND BORRADO='No'";
		$stmt = DBcnx::getStatement($query);
		if($stmt->execute([$id])) {
			while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$cancha = new Cancha;
				$cancha->id_cancha = $fila['ID_CANCHA'];
				$cancha->nombre_cancha = $fila['NOMBRE_CANCHA'];
				$cancha->foto = $fila['FOTO'];
				$cancha->tipo_cancha = $fila['TIPO_CANCHA'];
				$cancha->barrio = $fila['BARRIO'];
				$cancha->direccion = $fila['DIRECCION'];
				$cancha->borrado = $fila['BORRADO'];

				$cancha->puntaje = $fila['PUNTAJE'];
				$cancha->precio = $fila['PRECIO'];
				$cancha->cargarDatos($fila);
				$salida[] = $cancha;
			}
		}
		return $salida;
	}


	//FILTRAR POR TIPO , BARRIO, HORARIO Y DIA
    public static function buscar_cancha($array){
        $salida = [];
        $query = "SELECT * FROM " . static::$tabla ." WHERE TIPO_CANCHA = ? AND BARRIO = ? AND BORRADO='No'";
        $stmt = DBcnx::getStatement($query);
        if($stmt->execute([$array["TIPO_CANCHA"],$array["BARRIO"]])) {
            while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $cancha = new Cancha;
                $cancha->id_cancha = $fila['ID_CANCHA'];
                $cancha->nombre_cancha = $fila['NOMBRE_CANCHA'];
                $cancha->foto = $fila['FOTO'];
                $cancha->tipo_cancha = $fila['TIPO_CANCHA'];
                $cancha->barrio = $fila['BARRIO'];
                $cancha->direccion = $fila['DIRECCION'];
                $cancha->borrado = $fila['BORRADO'];

                $cancha->puntaje = $fila['PUNTAJE'];
                $cancha->precio = $fila['PRECIO'];
                $cancha->cargarDatos($fila);
                $salida[] = $cancha;
            }
        }
        return $salida;
    }



}
