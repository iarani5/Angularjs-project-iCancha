<?php

class Duenio{
	
	/* A T R I B U T O S */
	private $fk_id_cancha;
	private $fk_id_usuario;
	
	public static $tabla = "duenio";
	private static $fila = ['FK_ID_CANCHA', 'FK_ID_USUARIO'];

	/* G E T T E R S  &&  S E T T E R S */
	public function setFkIdCancha($a){
		$this->fk_id_cancha = $a;
	}
	public function getFkIdCancha(){
		return $this->fk_id_cancha;
	}
	public function setFkIdUsuario($a){
		$this->fk_id_usuario = $a;
	}
	public function getFkIdUsuario(){
		return $this->fk_id_usuario;
	}
	
	/* M E T O D O S   D E   L A   C L A S E */
	
	public function getByDuenio($id){ 
		$query = "SELECT * FROM " . static::$tabla . "
					WHERE FK_ID_USUARIO = $id";
		$stmt = DBcnx::getStatement($query);
		$stmt->execute([$id]);
		return /* $this->cargarDatos( */$stmt->fetch(PDO::FETCH_ASSOC)/* ) */;
	}
	
	public function cargarDatos($fila){
		foreach($fila as $prop => $valor) {
			if(in_array($prop, static::$fila)) {
				switch($prop){
					case "fk_id_cancha":
						$this->setFkIdCancha($valor);
					break;
					case "fk_id_usuario":
						$this->setFkIdUsuario($valor);
					break;
				}
			}
		}
	}
	
	public function crear_duenio($array){  
		$query = "INSERT INTO " . static::$tabla . " (FK_ID_CANCHA,FK_ID_USUARIO)
				VALUES (?, ?)";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["FK_ID_CANCHA"],$array["FK_ID_USUARIO"]]);
	}
		
	public function all($id){ 
		$salida = [];
		$query = "SELECT * FROM " . static::$tabla . "
					WHERE FK_ID_USUARIO = $id";
		$stmt = DBcnx::getStatement($query);
		if($stmt->execute()) {
			while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$duenio = new Duenio;
				$duenio->fk_id_cancha = $fila['FK_ID_CANCHA'];
				$duenio->fk_id_usuario = $fila['FK_ID_USUARIO'];
				$duenio->cargarDatos($fila);
				$salida[] = $duenio;
			}
		return $salida;
	}
	}
}
?>