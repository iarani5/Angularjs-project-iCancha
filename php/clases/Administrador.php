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

}
