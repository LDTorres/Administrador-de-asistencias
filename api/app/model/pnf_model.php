<?php

namespace App\Model;

use App\Lib\Database;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

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

        $sql = "INSERT INTO $this->table (nombre) VALUES (?)";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($params['nombre']));
        
        $result = $this->db->lastInsertId();

        return $result;
    }

    public function update($params){

        $sql = "UPDATE $this->table SET nombre = ? WHERE id_malla = ?";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($params['nombre'], $params['id']));

        return $params;
    }

    public function sendMail($params){

        $mail = new PHPMailer(true);   
                                   // Passing `true` enables exceptions
        try {
            //Server settings
            $mail->SMTPDebug = 2;                                 // Enable verbose debug output
            $mail->isSMTP();                                      // Set mailer to use SMTP
            $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
            $mail->SMTPAuth = true;                               // Enable SMTP authentication
            $mail->Username = 'luisdaniel.programador@gmail.com';                 // SMTP username
            $mail->Password = 'LDTorres2696';                           // SMTP password
            $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
            $mail->Port = 587;                                    // TCP port to connect to
        
            //Recipients
            // informatica@iuteb.edu.ve
            $mail->setFrom($params['correo_profesor'], $params['nombre_profesor']);

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
            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = $params['subject'];
            $mail->Body    = $params['body'];
        
            $mail->send();
            return array('msg' => 'El correo ha sido enviado.');
        } catch (Exception $e) {
            return array('msg' => $mail->ErrorInfo);
        }     
    }
}