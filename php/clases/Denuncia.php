<?php

class Denuncia
{
    /* A T R I B U T O S */
    private $id_denuncia;
    private $fk_id_usuario;
    private $fk_id_propietario;

    /**
     * @return mixed
     */
    public function getIdDenuncia()
    {
        return $this->id_denuncia;
    }

    /**
     * @param mixed $id_denuncia
     */
    public function setIdDenuncia($id_denuncia)
    {
        $this->id_denuncia = $id_denuncia;
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
    public function getFkIdPropietario()
    {
        return $this->fk_id_propietario;
    }

    /**
     * @param mixed $fk_id_propietario
     */
    public function setFkIdPropietario($fk_id_propietario)
    {
        $this->fk_id_propietario = $fk_id_propietario;
    }

    //nombre_cancha de la tabla y columnas de la tabla.
    public static $tabla = "denuncia";
    private static $fila = ['FK_ID_USUARIO', 'FK_ID_PROPIETARIO'];


    //***************************** METODOS

    public function crear_denuncia($array){  //REGISTRO DE USUARIO
        $query = "INSERT INTO " . static::$tabla . " (FK_ID_USUARIO, FK_ID_PROPIETARIO)
				VALUES (?, ?)";
        $stmt = DBcnx::getStatement($query);
        return $stmt->execute([$array["FK_ID_USUARIO"],$array["FK_ID_PROPIETARIO"]]);
    }

    public function denunciado($id,$id2){
        $query = "SELECT * FROM " . static::$tabla . "
					WHERE FK_ID_USUARIO = $id AND FK_ID_PROPIETARIO=$id2";
        $stmt = DBcnx::getStatement($query);
        $stmt->execute([$id]);
        return /* $this->cargarDatos( */$stmt->fetch(PDO::FETCH_ASSOC)/* ) */;
    }

    public function cargarDatos($fila){
        foreach($fila as $prop => $valor) {
            if(in_array($prop, static::$fila)) {
                switch($prop){
                    case "fk_id_usuario":
                        $this->setFkIdUsuario($valor);
                        break;
                    case "fk_id_propietario":
                        $this->setFkIdPropietario($valor);
                        break;
                }
            }
        }
    }

    public static function all(){
        $salida = [];
        $query = "SELECT * FROM " . static::$tabla ;
        $stmt = DBcnx::getStatement($query);
        if($stmt->execute()) {
            while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $denuncia = new Denuncia();
                $denuncia->id_denuncia = $fila['ID_DENUNCIA'];
                $denuncia->fk_id_usuario = $fila['FK_ID_USUARIO'];
                $denuncia->fk_id_propietario = $fila['FK_ID_PROPIETARIO'];
                $denuncia->cargarDatos($fila);
                $salida[] = $denuncia;
            }
        }
        return $salida;
    }



}
