<?php

class Horario{
	
	
/* 
CREATE TABLE Horario(
	ID_HORARIO INT(8) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	FK_ID_CANCHA INT(8) UNSIGNED,
	HORARIO DATETIME NOT NULL, 
	BORRADO ENUM('Si','No') NOT NULL DEFAULT 'No',
	ESTADO ENUM('Ocupado','Desocupado') NOT NULL DEFAULT 'Desocupado',

	FOREIGN KEY (FK_ID_CANCHA) REFERENCES Cancha(ID_CANCHA)
);
*/
	
	/* A T R I B U T O S */
	private $id_horario;
	private $fk_id_cancha;
	private $horario;
	private $borrado;
	private $estado;
	
	//nombre_cancha de la tabla y columnas de la tabla.
	public static $tabla = "horario";
	private static $fila = ['FK_ID_CANCHA', 'HORARIO','BORRADO','ESTADO'];

	/* G E T T E R S  &&  S E T T E R S */
	public function setIdHorario($a){
		$this->id_horario = $a;
	}
	public function getIdHorario(){
		return $this->id_horario;
	}
	public function setFkIdCancha($a){
		$this->fk_id_cancha = $a;
	}
	public function getFkIdCancha(){
		return $this->fk_id_cancha;
	}
	public function setHorario($a){
		$this->horario = $a;
	}
	public function getHorario(){
		return $this->horario;
	}
	public function setBorrado($a){
		$this->borrado = $a;
	}
	public function getBorrado(){
		return $this->borrado;
	}
	public function setEstado($a){
		$this->estado = $a;
	}
	public function getEstado(){
		return $this->estado;
	}
	
	/* M E T O D O S   D E   L A   C L A S E */
	
	public function getByPk($id){ 
		$query = "SELECT * FROM " . static::$tabla . "
					WHERE ID = $id";
		$stmt = DBcnx::getStatement($query);
		$stmt->execute([$id]);
		return /* $this->cargarDatos( */$stmt->fetch(PDO::FETCH_ASSOC)/* ) */;
	}
	
	public function cargarDatos($fila){
		foreach($fila as $prop => $valor) {
			if(in_array($prop, static::$fila)) {
				switch($prop){
					case "id_horario":
						$this->setIdHorario($valor);
					break;
					case "fk_id_cancha":
						$this->setFkIdCancha($valor);
					break;
					case "horario":
						$this->setHorario($valor);
					break;
					case "borrado":
						$this->setBorrado($valor);
					break;
					case "estado":
						$this->setEstado($valor);
					break;
				}
			}
		}
	}
	
	public function crear_horario($array){  
		$query = "INSERT INTO " . static::$tabla . " (FK_ID_CANCHA,HORARIO)
				VALUES (?, ?)";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["FK_ID_CANCHA"],$array["HORARIO"]]);
	}
	
	public function estado($array){ //ESTADO disponible/ocupado
		$query = "UPDATE " . static::$tabla . " SET ESTADO=? WHERE ID_HORARIO=?";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["ESTADO"],$array["ID_HORARIO"]]);
	}
	
	public function eliminar_horario($id){ //BORRADO
		$query = "UPDATE " . static::$tabla . " SET BORRADO='Si' WHERE ID_HORARIO=$id";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute();
	}
	
	public static function all($id){ //LISTAR TODO
		$salida = [];
		$query = "SELECT * FROM " . static::$tabla . " WHERE ID_HORARIO=$id AND BORRADO='No'";
		$stmt = DBcnx::getStatement($query);
		if($stmt->execute()) {
			while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$horario = new Horario;
				$horario->id_horario = $fila['ID_HORARIO'];
				$horario->fk_id_cancha = $fila['FK_ID_CANCHA'];
				$horario->horario = $fila['HORARIO'];
				$horario->estado = $fila['ESTADO'];
				$horario->cargarDatos($fila);
				$salida[] = $horario;
			}
		}
		return $salida;
	}
	
}
