<?php

class Cupon{
    /* A T R I B U T O S */
    private $id_cupon;
    private $nombre_cupon;
    private $codigo;
    private $porcentaje;
    private $borrado;

    /**
     * @return mixed
     */
    public function getIdCupon()
    {
        return $this->id_cupon;
    }

    /**
     * @param mixed $id_cupon
     */
    public function setIdCupon($id_cupon)
    {
        $this->id_cupon = $id_cupon;
    }

    /**
     * @return mixed
     */
    public function getNombreCupon()
    {
        return $this->nombre_cupon;
    }

    /**
     * @param mixed $nombre_cupon
     */
    public function setNombreCupon($nombre_cupon)
    {
        $this->nombre_cupon = $nombre_cupon;
    }

    /**
     * @return mixed
     */
    public function getCodigo()
    {
        return $this->codigo;
    }

    /**
     * @param mixed $codigo
     */
    public function setCodigo($codigo)
    {
        $this->codigo = $codigo;
    }

    /**
     * @return mixed
     */
    public function getPorcentaje()
    {
        return $this->porcentaje;
    }

    /**
     * @param mixed $porcentaje
     */
    public function setPorcentaje($porcentaje)
    {
        $this->porcentaje = $porcentaje;
    }

    /**
     * @return mixed
     */
    public function getBorrado()
    {
        return $this->borrado;
    }

    /**
     * @param mixed $borrado
     */
    public function setBorrado($borrado)
    {
        $this->borrado = $borrado;
    }


    //nombre_cancha de la tabla y columnas de la tabla.
    public static $tabla = "cupon";
    private static $fila = ['NOMBRE_CUPON', 'CODIGO','PORCENTAJE','BORRADO'];

    /* M E T O D O S   D E   L A   C L A S E */

    public function getByCodigo($id){
        $query = "SELECT * FROM " . static::$tabla . "
					WHERE CODIGO = $id";
        $stmt = DBcnx::getStatement($query);
        $stmt->execute([$id]);
        return /* $this->cargarDatos( */$stmt->fetch(PDO::FETCH_ASSOC)/* ) */;
    }

    public function getById($id){
        $query = "SELECT * FROM " . static::$tabla . "
					WHERE ID_CUPON = $id";
        $stmt = DBcnx::getStatement($query);
        $stmt->execute([$id]);
        return /* $this->cargarDatos( */$stmt->fetch(PDO::FETCH_ASSOC)/* ) */;
    }

    public function cargarDatos($fila){ //RECIBE LA FILA DE LA BDD Y CARGA LOS DATOS EN LA CLASE CUPON PHP (USA LOS SETTERS DE LA CLASE)
        foreach($fila as $prop => $valor) {
            if(in_array($prop, static::$fila)) {
                switch($prop){
                    case "nombre_cupon":
                        $this->setNombreCupon($valor);
                        break;
                    case "codigo":
                        $this->setCodigo($valor);
                        break;
                    case "porcentaje":
                        $this->setPorcentaje($valor);
                        break;
                    case "borrado":
                        $this->setBorrado($valor);
                        break;
                }
            }
        }
    }

    public function crear_cupon($array){  //REGISTRO DE USUARIO
        $query = "INSERT INTO " . static::$tabla . " (NOMBRE_CUPON, CODIGO, PORCENTAJE)
				VALUES (?, ?, ?)";
        $stmt = DBcnx::getStatement($query);
        return $stmt->execute([$array["NOMBRE_CUPON"],$array["CODIGO"],$array["PORCENTAJE"]]);
    }

    public function eliminar_cupon($id){
        $query = "UPDATE " . static::$tabla . " SET BORRADO='Si' WHERE ID_CUPON=$id";
        $stmt = DBcnx::getStatement($query);
        return $stmt->execute([$id]);
    }

    public static function all(){ //LISTAR TODO EL LISTADO DE LA TABLA USUARIO
        $salida = [];
        $query = "SELECT * FROM " . static::$tabla . " WHERE BORRADO='No'";
        $stmt = DBcnx::getStatement($query);
        if($stmt->execute()) {
            while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $cupon = new Cupon;
                $cupon->id_cupon = $fila['ID_CUPON'];
                $cupon->nombre_cupon = $fila['NOMBRE_CUPON'];
                $cupon->codigo = $fila['CODIGO'];
                $cupon->porcentaje = $fila['PORCENTAJE'];
                $cupon->cargarDatos($fila);
                $salida[] = $cupon;
            }
        }
        return $salida;
    }

}
