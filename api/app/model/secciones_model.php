<?php

namespace App\Model;

use App\Lib\Database;

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
    public function getAll($id){
        $sql = "SELECT * FROM $this->table WHERE id_asignatura = ?";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($id));

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

        $sql = "INSERT INTO $this->table (nombre, id_asignatura, codigo, id_usuario) VALUES (?,?,?,?)";

        $sth = $this->db->prepare($sql);

        $codigo = bin2hex(openssl_random_pseudo_bytes(4)); 

        $sth->execute(array($params['nombre'], $params['id_asignatura'], $codigo, $params['id_usuario']));

        $params['insert_id'] = $this->db->lastInsertId();
        
        return $params;
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

    public function statusMember($accion, $id){
        
        $sql = "UPDATE $this->table2 SET estado = ? WHERE id_usuario = ? and id_seccion = ?";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($params['accion'],$params['id_usuario'], $params['id_seccion']));
        
        return $params;
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
        //$offset = $params['offset'];
        
        $sth = $this->db->prepare("SELECT id_seccion FROM alumnos_has_secciones WHERE id_usuario = ?");

        $sth->execute(array($params['id']));

        $secciones = $sth->fetchAll();

        $publicaciones = [];

        foreach($secciones as $seccion):
            $sth = $this->db->prepare("SELECT * FROM publicaciones WHERE id_seccion = ?");
            $sth->execute(array($seccion['id_seccion']));
            $publicacion = $sth->fetchAll();
            array_push($publicaciones, $publicacion);
        endforeach;

        return  $publicaciones;
    }

    public function getPosts($params){
        $offset = $params['offset'];

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

        return $result;
    }

    public function addPost($params, $filename){

        $sql = "INSERT INTO $this->table3 (titulo, descripcion, id_seccion, id_usuario, nombre_archivo) VALUES (?,?,?,?,?)";
        
        $sth = $this->db->prepare($sql);

        $sth->execute(array($params['titulo'],$params['descripcion'], $params['id_seccion'], $params['id_usuario'], $filename));

        return  array("msg" => 'Publicacion Subida', "InsertId" => $this->db->lastInsertId());
    }

    public function deletePost($params){
        
        $sql = "DELETE FROM $this->table3 WHERE id_publicacion = ? AND id_usuario = ? AND id_seccion = ?";
                
        $sth = $this->db->prepare($sql);
        
        $sth->execute(array($params['id_publicacion'], $params['id_usuario'], $params['id_seccion']));
        
        return  array('deleted_id' => $params['id_publicacion']);
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

        $sql = "SELECT * FROM $this->table4 INNER JOIN usuarios WHERE id_seccion = ? AND fecha = ? AND $this->table4.id_usuario = usuarios.id_usuario";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($params['id_seccion'], $params['fecha']));

        return $sth->fetchAll();
    }

    public function getReport($params){
        
        $sql = "SELECT * FROM $this->table4 INNER JOIN usuarios WHERE id_seccion = ? AND $this->table4.id_usuario = usuarios.id_usuario AND fecha >= ? AND fecha <= ? GROUP BY fecha";

        $sth = $this->db->prepare($sql);
        
        $sth->execute(array($params['id_seccion'], $params['desde'], $params['hasta']));

        return $sth->fetchAll();
    }

    public function getInfoSeccion($params){
        $sql = "SELECT * FROM $this->table AS s INNER JOIN usuarios AS u ON s.id_usuario = u.id_usuario INNER JOIN asignaturas AS a ON s.id_asignatura = a.id_asignatura WHERE id_seccion = ?";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($params['id_seccion']));

        return $sth->fetchAll();
    }



}