
<?php


class Calificacion {

    public static function puntuar_comentar_cancha($array)
    {
        $query = "INSERT INTO calificacion (FK_ID_CANCHA,FK_ID_USUARIO,PUNTUACION,COMENTARIO) VALUES (?, ?, ?, ?)";
        $stmt = DBcnx::getStatement($query);
        return $stmt->execute([$array["FK_ID_CANCHA"], $array["FK_ID_USUARIO"], $array["PUNTUACION"], $array["COMENTARIO"]]);
    }

}
