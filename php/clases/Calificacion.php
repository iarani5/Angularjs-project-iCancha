
<?php

class Calificacion{

    private $id_calificacion;
    private $fk_id_cancha;
    private $fk_id_usuario;
    private $puntuacion;
    private $comentario;

    public static $tabla = "calificaicon";
    private static $fila = ['FK_ID_USUARIO', 'FK_ID_CANCHA','COMENTARIO','PUNTUACION'];
    /**
     * @return mixed
     */
    public function getIdCalificacion()
    {
        return $this->id_calificacion;
    }

    /**
     * @param mixed $id_calificacion
     */
    public function setIdCalificacion($id_calificacion)
    {
        $this->id_calificacion = $id_calificacion;
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
    public function getPuntuacion()
    {
        return $this->puntuacion;
    }

    /**
     * @param mixed $puntuacion
     */
    public function setPuntuacion($puntuacion)
    {
        $this->puntuacion = $puntuacion;
    }

    /**
     * @return mixed
     */
    public function getComentario()
    {
        return $this->comentario;
    }

    /**
     * @param mixed $comentario
     */
    public function setComentario($comentario)
    {
        $this->comentario = $comentario;
    }



    /*********** METODOS ************/

    public function cargarDatos($fila){
        foreach($fila as $prop => $valor) {
            if(in_array($prop, static::$fila)) {
                switch($prop){
                    case "id_calificacion":
                        $this->setIdCalificacion($valor);
                        break;
                    case "fk_id_cancha":
                        $this->setFkIdCancha($valor);
                        break;
                    case "fk_id_usuario":
                        $this->setFkIdUsuario($valor);
                        break;
                    case "puntuacion":
                        $this->setPuntuacion($valor);
                        break;
                    case "comentario":
                        $this->setComentario($valor);
                        break;
                }
            }
        }
    }

    public static function puntuar_comentar_cancha($array){
        $query = "INSERT INTO calificacion (FK_ID_CANCHA,FK_ID_USUARIO,PUNTUACION,COMENTARIO) VALUES (?, ?, ?, ?)";
        $stmt = DBcnx::getStatement($query);
        return $stmt->execute([$array["FK_ID_CANCHA"], $array["FK_ID_USUARIO"], $array["PUNTUACION"], $array["COMENTARIO"]]);
    }

    public static function checkear_no_puntuada($id, $id2){
        $salida = [];
        $query = "SELECT * FROM calificacion WHERE FK_ID_CANCHA = $id AND FK_ID_USUARIO=$id2";
        $stmt = DBcnx::getStatement($query);
        if ($stmt->execute([$id,$id2])) {
            return $stmt->fetch(PDO::FETCH_ASSOC)["ID_CALIFICACION"];
        }
        return 0;
    }

    public static function traer_calificacion_cancha($id){
        $salida = [];
        $query = "SELECT * FROM calificacion WHERE FK_ID_CANCHA = $id";
        $stmt = DBcnx::getStatement($query);
        if ($stmt->execute([$id])) {
            while ($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $calificacion = new Calificacion();
                $calificacion->id_calificacion = $fila['ID_CALIFICACION'];
                $calificacion->fk_id_cancha = $fila['FK_ID_CANCHA'];
                $calificacion->fk_id_usuario = $fila['FK_ID_USUARIO'];
                $calificacion->puntuacion = $fila['PUNTUACION'];
                $calificacion->comentario = $fila['COMENTARIO'];
                $calificacion->cargarDatos($fila);
                $salida[] = $calificacion;
            }
        }
        return $salida;
    }
}
