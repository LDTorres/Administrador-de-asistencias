<?php

namespace App\Model;

use App\Lib\Database;
use Spipu\Html2Pdf\Html2Pdf;
use Spipu\Html2Pdf\Exception\ExceptionFormatter;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class SeccionesModel {
    private $db;
    private $table = 'secciones';
    private $table2 = 'alumnos_has_secciones';
    private $table3 = 'publicaciones';
    private $table4 = 'alumnos_has_asistencias';

    public function __CONSTRUCT(){
        $this->db = Database::conexion();
    }

    // Secciones
    public function getAll($params){

        if(isset($params['tipo']) != NULL){
            $sth = $this->db->prepare('SELECT nombre, id_seccion FROM secciones WHERE id_usuario = ?');
            $sth->execute(array($params['id_usuario']));
            $result = $sth->fetchAll();
            return $result;
        }

        if(isset($params['id_usuario']) != NULL ){
            $sth = $this->db->prepare('SELECT s.nombre, s.id_seccion FROM secciones AS s INNER JOIN alumnos_has_secciones AS ahs WHERE ahs.id_usuario = ? AND s.id_seccion = ahs.id_seccion');
            $sth->execute(array($params['id_usuario']));
            $result = $sth->fetchAll();
            return $result;
        }

        $sql = "SELECT nombre, id_seccion FROM secciones WHERE id_asignatura = ?";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($params['id_asignatura']));

        $result = $sth->fetchAll();

        return $result;

    }

    public function get($id, $idP){
        
        $sql = "SELECT * FROM $this->table WHERE id_seccion = ? AND id_usuario = ?";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($id, $idP));

        $result = $sth->fetch();
        
        return $result;
    }

    public function add($params){

        // Creamos La Seccion
        $sql = "INSERT INTO $this->table (nombre, id_asignatura, codigo, id_usuario) VALUES (?,?,?,?)";

        $sth = $this->db->prepare($sql);

        $codigo = bin2hex(openssl_random_pseudo_bytes(4)); 

        $sth->execute(array($params['nombre'], $params['id_asignatura'], $codigo, $params['id_usuario']));

        $params['insert_id'] = $this->db->lastInsertId();
        $params['codigo'] = $codigo;

        // Buscamos Correo
        $sql = "SELECT usuario, contrasena, correo FROM usuarios WHERE id_usuario = ?";
        $sth = $this->db->prepare($sql);
        $sth->execute(array($params['id_usuario']));
        $datos = $sth->fetch();

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
            $mail->setFrom('iutebgate@gmail.com', 'IUTEB GATE SOPORTE');

            $mail->addAddress($datos['correo']);


            // Name is optional
            //$mail->addReplyTo('info@example.com', 'Information');
            //$mail->addCC('cc@example.com');
            //$mail->addBCC('bcc@example.com');

            //Attachments
            //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
            //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

            //Content

            $usuario = $params['nombre'];
            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = 'Seccion Creada!';
            $mail->Body    = "<h2>SECCION CREADA</h2><div><span><b>Nombre:</b> $usuario </span><span><b>Codigo:</b> $codigo </span></div>";

            $mail->CharSet = 'utf-8';
            $mail->SMTPOptions = array(
                'ssl' => array(
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                    'allow_self_signed' => true
                )
            );

            $mail->send();

            return array('msg' => 'Seccion Creada', 'params' => $params);

        } catch (Exception $e) {
            return array('msg' => $mail->ErrorInfo);
        }   

    }

    public function update($params){
        
        $sql = "UPDATE $this->table SET nombre = ? WHERE id_seccion = ?";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($params['nombre'], $params['id_seccion']));

        return $params;
    }

    // Miembros Seccion

    public function getMembers($params){
        $sql = "SELECT * FROM $this->table2 INNER JOIN usuarios WHERE id_seccion = ? AND $this->table2.id_usuario = usuarios.id_usuario";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($params['id_seccion']));

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

    public function statusMember($params){
        
        $sql = "UPDATE $this->table2 SET estado = ? WHERE id_usuario = ? and id_seccion = ?";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($params['accion'],$params['id_usuario'], $params['id_seccion']));
        
        $v = $sth->rowCount();
        return array('filasAfectadas' => $v);
    }

    public function addMember($params){

        $sth = $this->db->prepare("SELECT * FROM secciones WHERE codigo = ?");
        $sth->execute(array($params['codigo']));
        $seccion = $sth->fetch();

        if($seccion === false):
            return array('msg' => 'codigo invalido');
        endif;

        $sth = $this->db->prepare("SELECT * FROM alumnos_has_secciones WHERE id_usuario = ? AND id_seccion = ?");
        $sth->execute(array($params['id_usuario'],$seccion['id_seccion']));
        $valid = $sth->fetch();
        
        if($valid !== false):
            return array('msg' => 'Ya formas parte de esa seccion');
        endif;

        $sql = "INSERT INTO $this->table2 (id_usuario, id_seccion) VALUES (?,?)";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($params['id_usuario'], $seccion['id_seccion']));

        return array("msg" => "Registro Exitoso!","insertId" => $this->db->lastInsertId());
    }

    // Publicaciones

    public function getPostsTimeline($params){
        if(isset($params['offset']) == NULL){
            $offset = 0;
        }else{
            $offset = $params['offset'];
        }

        if(isset($params['tipo']) != NULL){
            if($params['tipo'] != 'Administrador' && $params['tipo'] != 'Profesor'){
                return array('msg' => 'No tiene permitida esta accion');
            }
            $sql = "SELECT * FROM publicaciones WHERE id_usuario = ? LIMIT $offset,10";
            $sth = $this->db->prepare($sql);
            $sth->execute(array($params['id_usuario']));
    
            $publicaciones = $sth->fetchAll();
    
            return  $publicaciones;
        }

        $sth = $this->db->prepare("SELECT id_seccion FROM alumnos_has_secciones WHERE id_usuario = ?");
        $sth->execute(array($params['id_usuario']));
        $seccion = $sth->fetch();
        $seccion = $seccion['id_seccion'];

        $sql = "SELECT * FROM publicaciones WHERE id_seccion = ? LIMIT $offset,10";
        $sth = $this->db->prepare($sql);
        $sth->execute(array($seccion));

        $publicaciones = $sth->fetchAll();

        return  $publicaciones;
    }

    public function getPosts($params){
        if(isset($params['offset']) == NULL){
            $offset = 0;
        }else{
            $offset = $params['offset'];
        }

        $sql = "SELECT * FROM $this->table3 WHERE id_seccion = ? LIMIT $offset,10";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($params['id_seccion']));

        $result = $sth->fetchAll();

        return  $result;
    }

    public function getPost($params){
        
        $sql = "SELECT * FROM $this->table3 WHERE id_publicacion = ? AND id_usuario = ? AND id_seccion = ?";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($params['id_publicacion'],$params['id_usuario'], $params['id_seccion']));

        $result = $sth->fetch();

        return $result;
    }

    public function updatePost($params, $filename){
        
        $sql = "UPDATE $this->table3 SET titulo = ?, descripcion = ?, nombre_archivo = ? WHERE id_publicacion = ? AND id_usuario = ? AND id_seccion = ?";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($params['titulo'], $params['descripcion'], $filename, $params['id_publicacion'],$params['id_usuario'], $params['id_seccion']));

        $result = $params;
        $result['filas_afectadas'] = $sth->rowCount();
        $result['nombre_archivo'] = $filename;

        return array('msg' => 'Publicacion Actualizada');
    }

    public function addPost($params, $filename){

        $sql = "INSERT INTO $this->table3 (titulo, descripcion, id_seccion, id_usuario, nombre_archivo) VALUES (?,?,?,?,?)";
        
        $sth = $this->db->prepare($sql);

        $sth->execute(array($params['titulo'],$params['descripcion'], $params['id_seccion'], $params['id_usuario'], $filename));

        return  array("msg" => 'Publicacion Subida', "InsertId" => $this->db->lastInsertId());
        
    }

    public function deletePost($params){
        
        $sql = "DELETE FROM $this->table3 WHERE id_publicacion = ?";
                
        $sth = $this->db->prepare($sql);
        
        $sth->execute(array($params['id_publicacion']));
        
        return  array('msg' => 'Publicacion Eliminada','deleted_id' => $params['id_publicacion']);
    }

    // Asistencias 

    public function setAsistence($params){
        $asistencias = [];

        // Si no existe el parametro fecha entonces esta se la del dia actual
        if($params['fecha'] !== NULL):
            $fecha = $params['fecha'];
        else:
            $fecha = date("Y-m-d");
        endif; 

        // Tomamos por parametros todos los miembros de una seccion
        foreach($params['miembros'] as $miembro):
            // Verificamos si ya existe la asistencia en la base de datos
            $sth = $this->db->prepare("SELECT * FROM alumnos_has_asistencias WHERE id_usuario = ? AND id_seccion = ? AND fecha = ?");

            $sth->execute(array($miembro['id_usuario'],$params['id_seccion'], $fecha));
            $valid = $sth->fetch();
            // Si existe actualizamos el registro
            if($valid !== false):
                $sth = $this->db->prepare("UPDATE alumnos_has_asistencias SET asistio = ?  WHERE id_usuario = ? AND id_seccion = ? AND fecha = ?");
                $sth->execute(array($miembro['asistio'],$miembro['id_usuario'],$params['id_seccion'], $fecha));
                $asistencia = array("msg" => 'Asistencia Colocada', "filasAfectadas" => $sth->rowCount(), "usuario" => $miembro['nombre_completo']);
                array_push($asistencias,$asistencia);
                continue;
            endif;
            // Sino, creamos un nuevo registro en la bd
            $sql = "INSERT INTO $this->table4 (id_seccion, id_usuario, fecha, asistio) VALUES (?,?,?,?)";
            $sth = $this->db->prepare($sql);

            $sth->execute(array($params['id_seccion'], $miembro['id_usuario'], $fecha,$miembro['asistio']));

            $asistencia = array("msg" => 'Asistencia Colocada', "insertId" => $this->db->lastInsertId(), "usuario" => $miembro['nombre_completo']);

            array_push($asistencias,$asistencia);
        endforeach;

        return $asistencias;
    }

    public function getAsistences($params){

        if(isset($params['id_usuario']) != NULL){
            $sql = "SELECT * FROM $this->table4 INNER JOIN usuarios WHERE id_seccion = ? AND fecha = ? AND $this->table4.id_usuario = ?";
            $sth = $this->db->prepare($sql);
            $sth->execute(array($params['id_seccion'], $params['fecha'], $params['id_usuario']));
            $result = $sth->fetch();
            if($result == true){
                return array('msg' => 'Asistencias Cargadas', 'consulta' => $result);
            }else{
                return array('msg' => 'No hay registro de asistencias para esa fecha', 'consulta' => $sth->fetchAll());
            }
        }else{
            $sql = "SELECT * FROM $this->table4 INNER JOIN usuarios WHERE id_seccion = ? AND fecha = ? AND $this->table4.id_usuario = usuarios.id_usuario";
            $sth = $this->db->prepare($sql);
            $sth->execute(array($params['id_seccion'], $params['fecha']));
            $result = $sth->fetchAll();

            if($result == true){
                return array('msg' => 'Asistencias Cargadas', 'consulta' => $result);
            }else{
                return array('msg' => 'No hay registro de asistencias para esa fecha', 'consulta' => $sth->fetchAll());
            }
        }
    }

    public function getReport($params){
        
        $sql = "SELECT * FROM $this->table4 INNER JOIN usuarios WHERE id_seccion = ? AND $this->table4.id_usuario = usuarios.id_usuario AND fecha >= ? AND fecha <= ? GROUP BY fecha";

        $sth = $this->db->prepare($sql);
        
        $sth->execute(array($params['id_seccion'], $params['desde'], $params['hasta']));

        $datos = $sth->fetchAll();

        // Creamos el archivo PDF
        $date = date("d-m-Y-H-i-s");
        $nombreProfesor = $datos[0]['nombre_completo'];
        $filename =  "$nombreProfesor-$date-reporte-asistencias.pdf";

        try {
            $html2pdf = new Html2Pdf('P', 'A4', 'es');
            $html2pdf->setDefaultFont('Arial');
            $html2pdf->writeHTML('Hola');
            $html2pdf->output("app/outputPDF/$filename", 'F');
            
            return array('msg' => 'pdf generado', 'nombre_pdf' => $filename);

        } catch (Html2PdfException $e) {
            $formatter = new ExceptionFormatter($e);
            echo $formatter->getHtmlMessage();
        }

    }

    public function getInfoSeccion($params){
        $sql = "SELECT * FROM $this->table AS s INNER JOIN usuarios AS u ON s.id_usuario = u.id_usuario INNER JOIN asignaturas AS a ON s.id_asignatura = a.id_asignatura WHERE id_seccion = ?";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($params['id_seccion']));

        return $sth->fetchAll();
    }



}