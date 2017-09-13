<?php

namespace App\Model;

use App\Lib\Database;

class SeccionesModel {
    private $db;
    private $table = 'secciones';
    private $table2 = 'alumnos_has_secciones';
    private $table3 = 'publicaciones';

    public function __CONSTRUCT(){
        $this->db = Database::conexion();
    }

    public function getAll($id){
        $sql = "SELECT * FROM $this->table WHERE id_materia = ?";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($id));

        $result = $sth->fetchAll();
        return $result;
    }

    public function get($id, $idP){
        
        $sql = "SELECT * FROM $this->table WHERE id_seccion = ? AND id_usuario = ?";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($id));

        $result = $sth->fetch();
        
        return $result;
    }

    public function add($params){

        $sql = "INSERT INTO $this->table (nombre, id_materia, codigo, id_usuario) VALUES (?,?,?,?)";

        $sth = $this->db->prepare($sql);

        $codigo = bin2hex(openssl_random_pseudo_bytes(16)); 

        $sth->execute(array($params['nombre'], $params['id_materia'], $codigo, $params['id_usuario']));

        $result = $this->db->lastInsertId();
        
        return $result;
    }

    public function update($params){
        
        $sql = "UPDATE $this->table SET nombre = ? WHERE id_seccion = ?";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($params['nombre'], $params['id_seccion']));

        return $params;
    }

    public function getMembers($id){
        
        $sql = "SELECT * FROM $this->table2 WHERE id_seccion = ? AND estado = 1";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($id));

        $result = $sth->fetchAll();

        return $result;
    }

    public function getMember($id){
        
        $sql = "SELECT * FROM usuarios WHERE id_usuario = ? AND tipo = 'Estudiante'";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($id));

        $result = $sth->fetch();
        
        return $result;
    }

    public function deleteMember($id){
        
        $sql = "UPDATE $this->table2 SET estado = 0 WHERE id_usuario = ?";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($id));
        
        return $id;
    }

    public function addMember($params){
        
        $sql = "INSERT INTO $this->table2 (id_usuario, id_seccion) VALUES (?,?)";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($params['id_usuario'], $params['id_seccion']));

        return $this->db->lastInsertId();
    }

    public function getPosts($id,$offset){
        
        $sql = "SELECT * FROM $this->table3 WHERE id_seccion = ? LIMIT $offset,10";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($id));

        $result = $sth->fetchAll();

        return  $result;
    }

    public function getPost($id){
        
        $sql = "SELECT * FROM $this->table3 WHERE id_publicacion = ?";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($id));

        $result = $sth->fetch();

        return $result;
    }

    public function addPost($params, $filename){

        $sql = "INSERT INTO $this->table3 (titulo, descripcion, id_seccion, id_usuario, nombre_archivo) VALUES (?,?,?,?,?)";
        
        $sth = $this->db->prepare($sql);

        $sth->execute(array($params['titulo'],$params['descripcion'], $params['id_seccion'], $params['id_usuario'], $filename));

        return  $this->db->lastInsertId();
    }

    public function deletePost($params){
        
        $sql = "DELETE FROM $this->table3 WHERE id_publicacion = ? AND id_usuario = ? AND id_seccion = ?";
                
        $sth = $this->db->prepare($sql);
        
        $sth->execute(array($params['id_publicacion'], $params['id_usuario'], $params['id_seccion']));
        
        return  array('deleted_id' => $params['id_publicacion']);
    }

}