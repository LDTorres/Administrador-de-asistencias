<?php

namespace App\Model;

use Firebase\JWT\JWT;
use App\Lib\Database;
use PHPMailer\PHPMailer\PHPMailer;
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
        $sth = $this->db->prepare("SELECT * FROM $this->table WHERE id_usuario = ?");
        $sth->execute(array($id));
        $result = $sth->fetchObject();

        if($result == false):
            return array('msg' => 'No hay registros');
        endif;

        $result->cedula = intval($result->cedula);

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

        $sql = "SELECT * FROM $this->table WHERE contrasena = :pass AND usuario = :user OR correo = :user ";
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
            return array("token" => $jwt, 'id' => $result['id_usuario'],'name' => $result['usuario'], 'nombre_completo' => $result['nombre_completo'],'tipo' => $result['tipo'],'id_malla' => $result['id_malla'], 'preferencias' => array('color_ui' => $result['color_ui']));
        else:
            return false;
        endif;
    }

    public function add($params){
        $tipo = 'Estudiante';
        if(isset($params['tipo']) != NULL){ 
            if($params['tipo'] == 'Profesor'){
                $tipo = $params['tipo'];
            }
        }

        $sql = "SELECT * FROM $this->table WHERE correo = ? OR usuario = ? OR cedula = ?";
        $sth = $this->db->prepare($sql);
        $sth->execute(array($params['correo'], $params['usuario'], $params['cedula']));
        $correounico = $sth->fetch();
        
        if($correounico == true){
            return array('msg' => 'La cedula, correo o usuario ya está en uso por favor utilice otro.');
        }

        $sql = "INSERT INTO $this->table (usuario, contrasena, nombre_completo, cedula, correo, telefono, id_malla, tipo) VALUES (?,?,?,?,?,?,?,?) ";
        $sth = $this->db->prepare($sql);
        $sth->execute(array($params['usuario'],$params['contrasena'], $params['nombre_completo'],$params['cedula'], $params['correo'],$params['telefono'],$params['id_malla'],$tipo));

        $params['id_usuario'] = $this->db->lastInsertId();

        if($params['id_usuario'] != false && $this->db->lastInsertId() != false):
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

            # Correo
            $mail = new PHPMailer(true);   
            try {
                //Server settings                               // Enable verbose debug output
                $mail->isSMTP();                                      // Set mailer to use SMTP
                $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
                $mail->SMTPAuth = true;                               // Enable SMTP authentication
                $mail->Username = 'iutebgate@gmail.com';                 // SMTP username
                $mail->Password = 'SoporteGATE';                           // SMTP password
                $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
                $mail->Port = 587;                                    // TCP port to connect to

                //Recipients
                // informatica@iuteb.edu.ve
                $mail->setFrom('iutebgate@gmail.com', 'IUTEB GATE SOPORTE');

                $mail->addAddress($params['correo']);

                $usuario = $params['usuario'];
                $contrasena = $params['contrasena'];
                $mail->isHTML(true);                                  // Set email format to HTML
                $mail->Subject = 'Registro Exitoso!';
                $mail->Body    = "<h2>Gracias por registrarte en nuestra app</h2><div><span><b>Usuario:</b> $usuario </span><span><b>Contraseña:</b> $contrasena </span></div>";

                $mail->CharSet = 'utf-8';
                $mail->SMTPOptions = array(
                    'ssl' => array(
                        'verify_peer' => false,
                        'verify_peer_name' => false,
                        'allow_self_signed' => true
                    )
                );
    
                $mail->send();

                return array('msg'=>'Registro Exitoso!', 'datos' => array("token" => $jwt, 'id' => $params['id_usuario'],'name' => $params['usuario'],'tipo' => $tipo,'id_malla' => $params['id_malla'], 'preferencias' => array('color_ui' => 'positive')));
            
            } catch (Exception $e) {
                return array('msg' => $mail->ErrorInfo);
            }     
            // var_dump($data);
        else:
            return false;
        endif;
    }

    public function forgotPass($params){

        $sql = "SELECT usuario, contrasena, correo FROM $this->table WHERE correo = ?";
        $sth = $this->db->prepare($sql);
        $sth->execute(array($params['correo']));
        $datos = $sth->fetch();

        $mail = new PHPMailer(true);   
        // Passing `true` enables exceptions
        try {
            //Server settings                              // Enable verbose debug output
            $mail->isSMTP();                                      // Set mailer to use SMTP
            $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
            $mail->SMTPAuth = true;                               // Enable SMTP authentication
            $mail->Username = 'iutebgate@gmail.com';                 // SMTP username
            $mail->Password = 'SoporteGATE';                           // SMTP password
            $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
            $mail->Port = 587;                                    // TCP port to connect to

            //Recipients
            // informatica@iuteb.edu.ve
            $mail->setFrom('iutebgate@gmail.com', 'IUTEB GATE SOPORTE');

            $mail->addAddress($datos['correo']);

            $usuario = $datos['usuario'];
            $contrasena = $datos['contrasena'];
            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = 'Recuperacion de contrasena!';
            $mail->Body    = "<div><span><b>Usuario:</b> $usuario </span><span><b>Contraseña:</b> $contrasena </span></div>";

            $mail->CharSet = 'utf-8';
            $mail->SMTPOptions = array(
                'ssl' => array(
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                    'allow_self_signed' => true
                )
            );

            $mail->send();

            return array('msg' => 'Correo enviado');
        } catch (Exception $e) {
            return array('msg' => $mail->ErrorInfo);
        }     
    }

    public function setPrefencias($params){

        $sql = "UPDATE usuarios SET color_ui = ? WHERE id_usuario = ?";
        $sth = $this->db->prepare($sql);
        $sth->execute(array($params['color_ui'], $params['id_usuario']));
        return array('filas_afectadas' => $sth->rowCount());

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

        // Verificamos si expiro el token

        $actual = time();
        $expicacion = $decode->exp;

        if($actual > $expicacion):
            return 'Token Expirado';
        endif;
        
        if($decode->aud !== self::Aud())
        {
            return "Aud Invalido";
        }

        return "ok";
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