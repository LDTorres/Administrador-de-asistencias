<?php

namespace App\Model;

use App\Lib\Database;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class correosModel {
    private $db;
    private $table = 'malla_curricular';

    public function __CONSTRUCT(){
        $this->db = Database::conexion();
    }

    public function newSeccion($params){
        # correo, nombre, codigo
        $mail = new PHPMailer(true);   
        
        // Passing `true` enables exceptions
        try {
            //Server settings                                // Enable verbose debug output
            $mail->isSMTP();                                      // Set mailer to use SMTP
            $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
            $mail->SMTPAuth = true;                               // Enable SMTP authentication
            $mail->Username = 'iutebgate@gmail.com';                 // SMTP username
            $mail->Password = 'SoporteGATE';                           // SMTP password
            $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
            $mail->Port = 587;                                    // TCP port to connect to

            //Recipients
            $mail->setFrom('iutebgate@gmail.com', 'IUTEB GATE SOPORTE');

            $mail->addAddress($params['correo']);

            $usuario = $params['nombre'];
            $codigo = $params['codigo'];
            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = 'Seccion Creada!';
            $mail->Body    = "<h2>SECCION CREADA</h2><div><div><b>Nombre:</b> $usuario </div><div><b>Codigo:</b> $codigo </div></div>";

            $mail->CharSet = 'utf-8';
            $mail->SMTPOptions = array(
                'ssl' => array(
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                    'allow_self_signed' => true
                )
            );

            $mail->send();

            return array('msg' => 'Correo Enviado!');

        } catch (Exception $e) {

            return array('msg' => $mail->ErrorInfo);

        }
    }

    public function newPost($params){

        $mail = new PHPMailer(true);   
                                   // Passing `true` enables exceptions
        try {
            //Server settings                                // Enable verbose debug output
            $mail->isSMTP();                                      // Set mailer to use SMTP
            $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
            $mail->SMTPAuth = true;                               // Enable SMTP authentication
            $mail->Username = 'iutebgate@gmail.com';                 // SMTP username
            $mail->Password = 'SoporteGATE';                           // SMTP password
            $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
            $mail->Port = 587;                                    // TCP port to connect to
        
            //Recipients
            // informatica@iuteb.edu.ve
            $mail->setFrom('iutebgate@gmail.com', 'IUTEB GATE');

            if(is_array($params['miembros_correos']) == TRUE){
                foreach($params['miembros_correos'] as $correo):
                    $mail->addAddress($correo);
                endforeach;
            }else{
                $mail->addAddress($params['miembros_correos']);
            }
            
            // Name is optional
            //$mail->addReplyTo('info@example.com', 'Information');
            //$mail->addCC('cc@example.com');
            //$mail->addBCC('bcc@example.com');
        
            //Attachments
            //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
            //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
        
            //Content
            $profesor = $params['profesor'];
            $nombre_publicacion = $params['nombre_publicacion'];
            $descripcion =  $params['descripcion'];
            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = $params['subject'];
            $mail->Body    = "<h3>El profesor <b>$profesor</b> ha hecho una nueva publicacion.</h3><br>
            <div> <b>Nombre:</b> $nombre_publicacion </div><br><div><b>Descripcion:</b> $descripcion</div> <br><b>Revisa la app para saber mas.</b>";
            $mail->CharSet = 'utf-8';
            $mail->SMTPOptions = array(
                'ssl' => array(
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                    'allow_self_signed' => true
                )
            );

            $mail->send();
            return array('msg' => 'Mensaje Enviado');
        } catch (Exception $e) {
            return array('msg' => $mail->ErrorInfo);
        }     
    }

    public function newUser($params){

        #espera , usuario, contrasena, correo
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

                return array('msg'=>'Envio exitoso!');
            
            } catch (Exception $e) {
                return array('msg' => $mail->ErrorInfo);
            }  
    }
}