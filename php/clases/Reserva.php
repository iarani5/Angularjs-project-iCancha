
<?php

class Reserva{

    /*ID_RESERVA	FK_ID_USUARIO	FK_ID_HORARIO  FK_ID_CANCHA  CANCELADO */

    /* A T R I B U T O S */
    private $id_reserva;
    private $fk_id_usuario;
    private $fk_id_horario;
    private $fk_id_cancha;
    private $cancelado;

    /**
     * @return mixed
     */
    public function getIdReserva()
    {
        return $this->id_reserva;
    }

    /**
     * @param mixed $id_reserva
     */
    public function setIdReserva($id_reserva)
    {
        $this->id_reserva = $id_reserva;
    }

    /**
     * @return mixed
     */
    public function getFkIdUsuario()
    {
        return $this->fk_id_usuario;
    }

    /**
     * @param mixed $fk_id_usuario
     */
    public function setFkIdUsuario($fk_id_usuario)
    {
        $this->fk_id_usuario = $fk_id_usuario;
    }

    /**
     * @return mixed
     */
    public function getFkIdHorario()
    {
        return $this->fk_id_horario;
    }

    /**
     * @param mixed $fk_id_horario
     */
    public function setFkIdHorario($fk_id_horario)
    {
        $this->fk_id_horario = $fk_id_horario;
    }

    /**
     * @return mixed
     */
    public function getFkIdCancha()
    {
        return $this->fk_id_cancha;
    }

    /**
     * @param mixed $fk_id_cancha
     */
    public function setFkIdCancha($fk_id_cancha)
    {
        $this->fk_id_cancha = $fk_id_cancha;
    }

    /**
     * @return mixed
     */
    public function getCancelado()
    {
        return $this->cancelado;
    }

    /**
     * @param mixed $cancelado
     */
    public function setCancelado($cancelado)
    {
        $this->cancelado = $cancelado;
    }


    //nombre_cancha de la tabla y columnas de la tabla.
    public static $tabla = "reserva";
    private static $fila = ['FK_ID_USUARIO', 'FK_ID_HORARIO','FK_ID_CANCHA','CANCELADO'];


    /*************** METODOS **************/

    public function getByPkCancha($id){
        $query = "SELECT * FROM " . static::$tabla . "
					WHERE FK_ID_CANCHA = $id";
        $stmt = DBcnx::getStatement($query);
        $stmt->execute([$id]);
        return /* $this->cargarDatos( */$stmt->fetch(PDO::FETCH_ASSOC)/* ) */;
    }

    public function cargarDatos($fila){
        foreach($fila as $prop => $valor) {
            if(in_array($prop, static::$fila)) {
                switch($prop){
                    case "id_reserva":
                        $this->setIdReserva($valor);
                        break;
                    case "fk_id_cancha":
                        $this->setFkIdCancha($valor);
                        break;
                    case "fk_id_horario":
                        $this->setFkIdHorario($valor);
                        break;
                    case "fk_id_usuario":
                        $this->setFkIdUsuario($valor);
                        break;
                    case "cancelado":
                        $this->setCancelado($valor);
                        break;
                }
            }
        }
    }

    public function crear_reserva($array){
        $query = "INSERT INTO " . static::$tabla . " (FK_ID_CANCHA,FK_ID_USUARIO,FK_ID_HORARIO)
				VALUES (?, ?, ?)";
        $stmt = DBcnx::getStatement($query);
        return $stmt->execute([$array["FK_ID_CANCHA"],$array["FK_ID_USUARIO"],$array["FK_ID_HORARIO"]]);
    }

    public function cancelar_reserva($id){
        $query = "UPDATE " . static::$tabla . " SET CANCELADO='Si' WHERE ID_RESERVA=$id";
        $stmt = DBcnx::getStatement($query);
        return $stmt->execute([$id]);
    }

    public static function mis_reservas($id){
        $salida = [];
        $query = "SELECT * FROM " . static::$tabla . "
					WHERE FK_ID_USUARIO = $id";
        $stmt = DBcnx::getStatement($query);
        if ($stmt->execute([$id])) {
            while ($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $reserva = new Reserva;
                $reserva->id_reserva = $fila['ID_RESERVA'];
                $reserva->fk_id_cancha = $fila['FK_ID_CANCHA'];
                $reserva->fk_id_horario = $fila['FK_ID_HORARIO'];
                $reserva->cancelado = $fila['CANCELADO'];

                $reserva->cargarDatos($fila);
                $salida[] = $reserva;
            }
        }
        return $salida;
    }

    public static function reservas_usuarios($id){
        $salida = [];
        $query = "SELECT * FROM " . static::$tabla . "
					WHERE FK_ID_CANCHA = $id";
        $stmt = DBcnx::getStatement($query);
        if ($stmt->execute([$id])) {
            while ($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $reserva = new Reserva;
                $reserva->id_reserva = $fila['ID_RESERVA'];
                $reserva->fk_id_cancha = $fila['FK_ID_CANCHA'];
                $reserva->fk_id_usuario = $fila['FK_ID_USUARIO'];
                $reserva->fk_id_horario = $fila['FK_ID_HORARIO'];
                $reserva->cancelado = $fila['CANCELADO'];

                $reserva->cargarDatos($fila);
                $salida[] = $reserva;
            }
        }
        return $salida;
    }




}
