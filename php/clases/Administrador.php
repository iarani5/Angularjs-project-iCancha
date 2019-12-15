<?php

class Administrador{

    /* M E T O D O S   D E   L A   C L A S E */

    public function traer_stats_usuarios(){
        $usuario = new Usuario();
        return $usuario->all();
    }
    public function traer_stats_canchas(){
        $canchas = new Cancha();
        return $canchas->all();
    }

    public function bloquear_usuario($id){
        $query = "UPDATE usuario SET BANNEADO='Si' WHERE ID_USUARIO=$id";
        $stmt = DBcnx::getStatement($query);
        return $stmt->execute([$id]);
    }


}
