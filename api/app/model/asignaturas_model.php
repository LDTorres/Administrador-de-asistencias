<?php

namespace App\Model;

use App\Lib\Database;

class AsignaturasModel {
    private $db;
    private $table = 'asignaturas';

    public function __CONSTRUCT(){
        $this->db = Database::conexion();
    }

    public function getAll($params){
        $sql = "SELECT * FROM $this->table WHERE id_malla = ? AND trimestre = ?";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($params['id_malla'], $params['id_trimestre']));

        $result = $sth->fetchAll();
        return $result;
    }

    public function get($params){
        $sql = "SELECT * FROM $this->table WHERE id_asignatura = ? AND trimestre = ? AND id_malla = ?";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($params['id'], $params['trimestre'], $params['pnf']));

        $result = $sth->fetch();
        
        return $result;
    }

    public function add($params){

        $sql = "INSERT INTO $this->table (nombre_asig, trimestre, id_malla) VALUES (?,?,?)";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($params['nombre_asig'], $params['trimestre'], $params['id_malla']));

        $result = $this->db->lastInsertId();
        
        return $result;
    }

    public function update($params){
        if($_SESSION['tipo'] !== 'Administrador'):
            return array('msg'=>'acceso negado');
        endif;
        
        $sql = "UPDATE $this->table SET nombre_asig = ? WHERE id_malla = ? AND trimestre = ?";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($params['nombre_asig'], $params['id_malla'], $params['trimestre']));

        return $params;
    }

}