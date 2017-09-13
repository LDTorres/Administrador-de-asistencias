<?php

namespace App\Model;

use App\Lib\Database;

class MateriasModel {
    private $db;
    private $table = 'materias';

    public function __CONSTRUCT(){
        $this->db = Database::conexion();
    }

    public function getAll($id){
        $sql = "SELECT * FROM $this->table WHERE id_malla = ?";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($id));

        $result = $sth->fetchAll();
        return $result;
    }

    public function get($id){
        $sql = "SELECT * FROM $this->table WHERE id_materia = ?";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($id));

        $result = $sth->fetch();
        
        return $result;
    }

    public function add($params){

        $sql = "INSERT INTO $this->table (nombre, trimestre, id_malla) VALUES (?,?,?)";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($params['nombre'], $params['trimestre'], $params['id_malla']));

        $result = $this->db->lastInsertId();
        
        return $result;
    }

    public function update($params){
        
        $sql = "UPDATE $this->table SET nombre = ? WHERE id_malla = ? AND trimestre = ?";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($params['nombre'], $params['id_malla'], $params['trimestre']));

        return $params;
    }

}