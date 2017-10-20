<?php

namespace App\Model;

use App\Lib\Database;

class PnfModel {
    private $db;
    private $table = 'malla_curricular';

    public function __CONSTRUCT(){
        $this->db = Database::conexion();
    }

    public function getAll(){

        $sql = "SELECT * FROM $this->table";

        $sth = $this->db->prepare($sql);

        $sth->execute();

        $result = $sth->fetchAll();

        if(count($result) == 0):
            return array('msg' => 'No hay registros');
        endif;

        return $result;
    }

    public function get($a){
        $sql = "SELECT nombre FROM $this->table WHERE id_malla = ?";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($a['id']));

        $result = $sth->fetch();

        return $result;
    }

    public function add($params){
        if($_SESSION['tipo'] !== 'Administrador'):
            return array('msg'=>'acceso negado');
        endif;

        $sql = "INSERT INTO $this->table (nombre) VALUES (?)";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($params['nombre']));
        
        $result = $this->db->lastInsertId();

        return $result;
    }

    public function update($params){
        if($_SESSION['tipo'] !== 'Administrador'):
            return array('msg'=>'acceso negado');
        endif;

        $sql = "UPDATE $this->table SET nombre = ? WHERE id_malla = ?";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($params['nombre'], $params['id_malla']));

        return $params;
    }
}