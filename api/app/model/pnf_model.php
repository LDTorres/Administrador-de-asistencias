<?php

namespace App\Model;

use App\Lib\Database;

/**
 * 
 * @var mixed
 */

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
        return $result;
    }

    public function get($id){
        $sql = "SELECT * FROM $this->table WHERE id_malla = ?";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($id));

        $result = $sth->fetch();

        return $result;
    }

    public function add($params){
        $sql = "INSERT INTO $this->table (nombre) VALUES (?)";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($params['nombre']));
        
        $result = $this->db->lastInsertId();

        return $result;
    }

    public function update($params){
        $sql = "UPDATE $this->table SET nombre = ? WHERE id_malla = ?";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($params['nombre'], $params['id_malla']));

        return $params;
    }
}