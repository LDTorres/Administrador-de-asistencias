<?php

namespace App\Model;

use App\Lib\Database;

class UserModel
{
    private $table = 'usuarios';
    private $db;

    public function __CONSTRUCT()
    {
        $this->db = Database::conexion();
    }

    public function getAll($t)
    {
        $sth = $this->db->prepare("SELECT * FROM $this->table WHERE tipo = :tipoU ORDER BY id_usuario");

        $sth->execute(array(':tipoU' => $t));
        $result = $sth->fetchAll();

        return $result;
    }

    public function get($id)
    {
        $sth = $this->db->prepare("SELECT * FROM $this->table WHERE id_usuario=:id");
        $sth->bindParam("id", $id);
        $sth->execute();
        $result = $sth->fetchObject();

        return $result;
    }

    public function add($params){

        $arrRtn['user'] = $params['nombre_completo'];
        $arrRtn['type'] = $params['Estudiante'];
        $arrRtn['token'] = bin2hex(openssl_random_pseudo_bytes(16)); 
        $tokenExpiration = date('Y-m-d H:i:s', strtotime('+72 hour'));

        $token = json_encode($arrRtn);
        $params['token'] = $token;
        $params['expiracion_token'] = $tokenExpiration;

        $sql = "INSERT INTO $this->table (usuario, contrasena, nombre_completo, cedula, correo, telefono, id_malla, token, expiracion_token) VALUES (:usuario, :contrasena, :nombre_completo, :cedula, :correo, :telefono, :id_malla, :token, :expiracion_token)";
        $sth = $this->db->prepare($sql);
        $sth->execute(array(
            ':usuario' => $params['usuario'], 
            ':contrasena' => $params['contrasena'], 
            ':nombre_completo' => $params['nombre_completo'],
            ':cedula' => $params['cedula'], 
            ':correo' => $params['correo'],
            ':telefono' => $params['telefono'],
            ':id_malla' => $params['id_malla'],
            ':token' => $token,
            ':expiracion_token' => $tokenExpiration
        ));

        $params['id'] = $this->db->lastInsertId();

        return $params;
    }

    public function update($params){

        $sql = "UPDATE $this->table SET nombre_completo = :nombre_completo WHERE id_usuario = :id";
        $sth = $this->db->prepare($sql);
        $sth->execute(array(
            ':id' => $params['id_usuario'],
            ':nombre_completo' => $params['nombre_completo']
        ));

        return $params;
    }

    public function picture($params, $filename){
        $sql = "UPDATE $this->table SET foto_perfil = :foto_perfil WHERE id_usuario=:id";
        $sth = $this->db->prepare($sql);
        $sth->execute(array(
            ':id' => intval($params['id_usuario']),
            ':foto_perfil' => $filename
        ));

        return array('message' => 'Registro Almacenado', 'filename' => $filename);
    }

    public function login($params){
        $sql = "SELECT usuario, correo, contrasena FROM $this->table WHERE usuario = :user OR correo = :user AND contrasena = :pass";
        $sth = $this->db->prepare($sql);
        $sth->execute(array(':user' => $params['usuario'], ':pass' => $params['contrasena']));

        $result = $sth->fetch();

        if(count($result) > 0):
            $_SESSION["usuario"] = $result['usuario'];
            $result['ok'] = 'Acceso Autorizado';
            return $result;
        else:
            return false;
        endif;
    }

    public function status($params){

        if(isset($params['accion'])): 
            
            $sql = "UPDATE usuarios SET estado = ? WHERE id_usuario = ?";
                        
            $sth = $this->db->prepare($sql);
                        
            $sth->execute(array(intval($params['accion']),$params['id']));

            if($params['accion'] == 1):
                $result['estado'] = 'Activacion Exitosa!';
            elseif($params['accion'] == 0):
                $result['estado'] = 'Desactivacion Exitosa!';
            endif;

        else:

            $sql = "SELECT estado FROM usuarios WHERE id_usuario = ?";
                        
            $sth = $this->db->prepare($sql);
                
            $sth->execute(array($params['id']));

            $result = $sth->fetch();

        endif;

        return $result;
    }
}