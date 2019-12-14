<?php

class Horario{


/*
CREATE TABLE Horario(
	ID_HORARIO INT(8) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	FK_ID_CANCHA INT(8) UNSIGNED,
	HORA INT NOT NULL,
	DIA INT NOT NULL,
	BORRADO ENUM('Si','No') NOT NULL DEFAULT 'No',
	ESTADO ENUM('Ocupado','Desocupado') NOT NULL DEFAULT 'Desocupado',

	FOREIGN KEY (FK_ID_CANCHA) REFERENCES Cancha(ID_CANCHA)
);
*/
	
	/* A T R I B U T O S */
	private $id_horario;
	private $fk_id_cancha;
	private $hora;
	private $dia;
	private $dia_valor;
	private $hora_valor;
	private $borrado;
	private $estado;
	
	//nombre_cancha de la tabla y columnas de la tabla.
	public static $tabla = "horario";
	private static $fila = ['FK_ID_CANCHA', 'HORA','DIA','BORRADO','ESTADO'];

	/* G E T T E R S  &&  S E T T E R S */
    /**
     * @return mixed
     */
    public function getHoraValor()
    {
        return $this->hora_valor;
    }

    /**
     * @param mixed $hora_valor
     */
    public function setHoraValor($hora_valor)
    {
        $this->hora_valor = $hora_valor;
    }
    /**
     * @return mixed
     */
    public function getDiaValor()
    {
        return $this->dia_valor;
    }

    /**
     * @param mixed $dia_valor
     */
    public function setDiaValor($dia_valor)
    {
        $this->dia_valor = $dia_valor;
    }

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
    public function getDia(){
        return $this->dia;
    }
    public function setDia($dia){
        $this->dia = $dia;
    }
	public function setHora($a){
		$this->hora = $a;
	}
	public function getHora(){
		return $this->hora;
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
					case "hora":
						$this->setHora($valor);
					break;
					case "dia":
						$this->setDia($valor);
					break;
					case "hora_valor":
						$this->setHoraValor($valor);
					break;
					case "dia_valor":
						$this->setDiaValor($valor);
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
		$query = "INSERT INTO " . static::$tabla . " (FK_ID_CANCHA,HORARIO,DIA)
				VALUES (?, ?, ?)";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["FK_ID_CANCHA"],$array["HORA"],$array["DIA"]]);
	}
	
	public function estado($array){ //ESTADO disponible/ocupado
		$query = "UPDATE " . static::$tabla . " SET ESTADO=? WHERE ID_HORARIO=?";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["ESTADO"],$array["FK_ID_HORARIO"]]);
	}
	
	public function eliminar_horario($id){ //BORRADO
		$query = "UPDATE " . static::$tabla . " SET BORRADO='Si' WHERE ID_HORARIO=$id";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute();
	}

	private static function ese_dia($id){
	    switch ($id){
            case "1":
                return "Lunes";
                break;
            case "2":
                return "Martes";
                break;
            case "3":
                return "Miercoles";
                break;
            case "4":
                return "Jueves";
                break;
            case "5":
                return "Viernes";
                break;
            case "6":
                return "Sabado";
                break;
            case "7":
                return "Domingo";
                break;
        }
        return 0;
    }

	private static function esa_hora($id){
	    switch ($id){
            case "1":
                return "7:00am a 8:00am";
                break;
            case "2":
                return "8:00am a 9:00am";
                break;
            case "3":
                return "9:00am a 10:00am";
                break;
            case "4":
                return "10:00am a 11:00am";
                break;
            case "5":
                return "11:00am a 12:00pm";
                break;
            case "6":
                return "12:00pm a 1:00pm";
                break;
            case "7":
                return "1:00pm a 2:00pm";
                break;
            case "8":
                return "2:00pm a 3:00pm";
                break;
            case "9":
                return "3:00pm a 4:00pm";
                break;
            case "10":
                return "4:00pm a 5:00pm";
                break;
            case "11":
                return "5:00pm a 6:00pm";
                break;
            case "12":
                return "6:00pm a 7:00pm";
                break;
             case "13":
                return "7:00pm a 8:00pm";
                break;
             case "14":
                return "8:00pm a 9:00pm";
                break;
             case "15":
                return "9:00pm a 10:00pm";
                break;
             case "16":
                return "10:00pm a 11:00pm";
                break;
             case "17":
                return "11:00pm a 12:00am";
                break;
             case "18":
                return "12:00am a 1:00am";
                break;
        }
        return 0;
    }

    public static function all($id){ //LISTAR TODO
        $salida = [];
        $query = "SELECT * FROM " . static::$tabla . " WHERE FK_ID_CANCHA=$id AND BORRADO='No'";
        $stmt = DBcnx::getStatement($query);
        if($stmt->execute()) {
            while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $horario = new Horario;
                $horario->id_horario = $fila['ID_HORARIO'];
                $horario->fk_id_cancha = $fila['FK_ID_CANCHA'];
                $horario->dia= $fila["DIA"];
                $horario->hora = $fila["HORARIO"];
                $horario->dia_valor = self::ese_dia($fila["DIA"]);
                $horario->hora_valor = self::esa_hora($fila["HORARIO"]);
                $horario->estado = $fila['ESTADO'];
                $horario->borrado = $fila['BORRADO'];
                $horario->cargarDatos($fila);
                $salida[] = $horario;
            }
        }
        return $salida;
    }


    public static function filtrar_por_dia($id,$dia){
        $salida = [];
        $query = "SELECT * FROM " . static::$tabla . " WHERE FK_ID_CANCHA=$id AND DIA=$dia AND BORRADO='No' AND ESTADO='Desocupado'";
        $stmt = DBcnx::getStatement($query);
        if($stmt->execute()) {
            while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $horario = new Horario;
                $horario->id_horario = $fila['ID_HORARIO'];
                $horario->cargarDatos($fila);
                $salida[] = $horario;
            }
        }
        return $salida;
    }
    public static function filtrar_por_hora($id,$hora){
        $salida = [];
        $query = "SELECT * FROM " . static::$tabla . " WHERE FK_ID_CANCHA=$id AND HORARIO=$hora AND BORRADO='No' AND ESTADO='Desocupado'";
        $stmt = DBcnx::getStatement($query);
        if($stmt->execute()) {
            while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $horario = new Horario;
                $horario->id_horario = $fila['ID_HORARIO'];
                $horario->cargarDatos($fila);
                $salida[] = $horario;
            }
        }
        return $salida;
    }
    public static function filtrar_por_hora_dia($id,$hora,$dia){
        $salida = [];
        $query = "SELECT * FROM " . static::$tabla . " WHERE FK_ID_CANCHA=$id AND HORARIO=$hora AND DIA=$dia AND BORRADO='No' AND ESTADO='Desocupado'";
        $stmt = DBcnx::getStatement($query);
        if($stmt->execute()) {
            while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $horario = new Horario;
                $horario->id_horario = $fila['ID_HORARIO'];
                $horario->cargarDatos($fila);
                $salida[] = $horario;
            }
        }
        return $salida;
    }

}
