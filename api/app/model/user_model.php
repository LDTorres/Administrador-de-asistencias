<?php

namespace App\Model;

use Firebase\JWT\JWT;
use App\Lib\Database;

use Exception;

class UserModel
{
    private $table = 'usuarios';
    private $db;
    private static $secret_key = 'm.iuteb';
    private static $encrypt = ['HS256'];
    private static $aud = null;

    public function __CONSTRUCT()
    {
        $this->db = Database::conexion();
    }

    public function getAll($t)
    {
        $sth = $this->db->prepare("SELECT * FROM $this->table WHERE tipo = :tipoU ORDER BY id_usuario");

        $sth->execute(array(':tipoU' => $t));
        $result = $sth->fetchAll();

        if(count($result) == 0):
            return array('msg' => 'No hay registros');
        endif;

        return $result;
    }

    public function get($id)
    {
        $sth = $this->db->prepare("SELECT * FROM $this->table WHERE id_usuario=:id");
        $sth->bindParam("id", $id);
        $sth->execute();
        $result = $sth->fetchObject();

        if(count($result) == 0):
            return array('msg' => 'No hay registros');
        endif;

        return $result;
    }

    public function update($params){

        $sql = "UPDATE $this->table SET nombre_completo = ?, cedula = ?, telefono = ?, contrasena = ? WHERE id_usuario = ?";
        $sth = $this->db->prepare($sql);
        $sth->execute(array($params['nombre_completo'], $params['cedula'], $params['telefono'], $params['contrasena'],$params['id_usuario']));

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

    // AUTENTIFICACION

    public function login($params){

        $sql = "SELECT id_usuario, usuario, correo, contrasena, tipo, id_malla FROM $this->table WHERE usuario = :user OR correo = :user AND contrasena = :pass";
        $sth = $this->db->prepare($sql);
        $sth->execute(array(':user' => $params['usuario'], ':pass' => $params['contrasena']));

        $result = $sth->fetch();

        if($result != false):
            $time = time();

            $token = array(
                'iat' => $time,
                'exp' => $time + (60*60*60),
                'aud' => self::Aud(),
                'data' => [
                    'id' => $result['id_usuario'],
                    'name' => $result['usuario'],
                    'tipo' => $result['tipo'],
                    'id_malla' => $result['id_malla']
                ]
            );

            $jwt = JWT::encode($token, self::$secret_key);

            // $data = JWT::decode($jwt, self::$secret_key, array('HS256'));

            // var_dump($data);
            return array("token" => $jwt);
        else:
            return false;
        endif;
    }

    public function add($params){

        if(isset($params['tipo']) != NULL && $params['tipo'] == 'Profesor'){
            $tipo = $params['tipo'];
        }else{
            $tipo = 'Estudiante';
        }

        $sql = "INSERT INTO $this->table (usuario, contrasena, nombre_completo, cedula, correo, telefono, id_malla) VALUES (:usuario, :contrasena, :nombre_completo, :cedula, :correo, :telefono, :id_malla ) ";
        $sth = $this->db->prepare($sql);
        $sth->execute(array(
            ':usuario' => $params['usuario'], 
            ':contrasena' => $params['contrasena'], 
            ':nombre_completo' => $params['nombre_completo'],
            ':cedula' => $params['cedula'], 
            ':correo' => $params['correo'],
            ':telefono' => $params['telefono'],
            ':id_malla' => $params['id_malla']
        ));

        $params['id_usuario'] = $this->db->lastInsertId();

        $time = time();

            $token = array(
                'iat' => $time,
                'exp' => $time + (60*60*60),
                'aud' => self::Aud(),
                'data' => [
                    'id' => $params['id_usuario'],
                    'name' => $params['usuario'],
                    'tipo' => $tipo,
                    'id_malla' => $params['id_malla']
                ]
            );

            $jwt = JWT::encode($token, self::$secret_key);

            // $data = JWT::decode($jwt, self::$secret_key, array('HS256'));

            // var_dump($data);

        return array('token' => $jwt, 'tipo' => $tipo);
    }
    
    public static function Check($token)
    {
        if(empty($token))
        {
        return "Token Vacio";
        }
        
        $decode = JWT::decode(
            $token,
            self::$secret_key,
            self::$encrypt
        );
        // TODO: COMO SABER SI EL TOKEN EXPIRO
        if($decode['iat']):
            return 'Token Expirado';
        endif;
        
        if($decode->aud !== self::Aud())
        {
            return "Aud Invalido";
        }

    }
    
    public static function GetData($token)
    {   
        if(empty($token))
        {
            throw new Exception( "Token Invalido");
        }

        $decode = JWT::decode(
            $token,
            self::$secret_key,
            self::$encrypt
        );
        return $decode;
    }
    
    private static function Aud()
    {
        $aud = '';
        
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $aud = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $aud = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $aud = $_SERVER['REMOTE_ADDR'];
        }
        
        $aud .= @$_SERVER['HTTP_USER_AGENT'];
        $aud .= gethostname();
        
        return sha1($aud);
    }
}