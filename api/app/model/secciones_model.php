<?php

namespace App\Model;

use App\Lib\Database;
use Spipu\Html2Pdf\Html2Pdf;
use Spipu\Html2Pdf\Exception\ExceptionFormatter;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dompdf\Dompdf;

class SeccionesModel {
    private $db;
    private $table = 'secciones';
    private $table2 = 'alumnos_has_secciones';
    private $table3 = 'publicaciones';
    private $table4 = 'alumnos_has_asistencias';
    private $path_reporte = 'public/outputPDF/';

    public function __CONSTRUCT(){
        $this->db = Database::conexion();
    }

    // Secciones
    public function getAll($params){

        # Si el usuario es profesor
        if(isset($params['tipo']) != NULL){
            if(isset($params['id_usuario']) != NULL ){
            $sth = $this->db->prepare('SELECT s.nombre, s.id_seccion FROM secciones AS s INNER JOIN asignaturas as a WHERE a.id_asignatura = ? AND s.id_asignatura = a.id_asignatura AND s.id_usuario = ?');
            $sth->execute(array($params['id_asignatura'], $params['id_usuario']));
            $result = $sth->fetchAll();

                if(count($result) > 0){
                    return $result;
                }else{
                    return array('msg' => 'No estas inscrito a ninguna sección.');
                }
            }
        }

        # Si no es profesor
        if(isset($params['id_usuario']) != NULL ){
            $sth = $this->db->prepare('SELECT s.nombre, s.id_seccion FROM alumnos_has_secciones AS ahs INNER JOIN secciones AS s INNER JOIN asignaturas AS a WHERE ahs.id_usuario = ? AND s.id_seccion = ahs.id_seccion AND a.id_asignatura = ? AND a.id_asignatura = s.id_asignatura');
            $sth->execute(array( $params['id_usuario'], $params['id_asignatura']));
            $result = $sth->fetchAll();

            if(count($result) > 0){
                return $result;
            }else{
                return array('msg' => 'No estas inscrito a ninguna sección.');
            }

        }

        return array('msg' => 'Debes mandar id_usuario, trimestre y id_asignatura');

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
        $sql = "SELECT usuario, nombre_completo,contrasena, correo FROM usuarios WHERE id_usuario = ?";
        $sth = $this->db->prepare($sql);
        $sth->execute(array($params['id_usuario']));
        $datos = $sth->fetch();

        $params['correo'] = $datos['correo'];
        $params['nombre'] = $datos['nombre_completo'];

        return array('msg' => 'Seccion Creada', 'params' => $params);

    }

    public function update($params){
        
        $sql = "UPDATE $this->table SET nombre = ? WHERE id_seccion = ?";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($params['nombre'], $params['id_seccion']));

        return $params;
    }

    // Miembros Seccion

    public function getMembers($params){
        $sql = "SELECT u.*, ahs.estado, ahs.id_seccion FROM $this->table2 as ahs INNER JOIN usuarios as u WHERE id_seccion = ? AND ahs.id_usuario = u.id_usuario";

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

        return array("msg" => "Registro Exitoso!","insertId" => $this->db->lastInsertId(), "id_seccion" => $seccion['id_seccion'], 'nombre' => $seccion['nombre']);
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

            $sql = "SELECT p.titulo,  p.id_publicacion, p.id_usuario, p.descripcion, p.id_seccion, p.fecha_publicacion, s.nombre, a.nombre_asig FROM publicaciones AS p INNER JOIN secciones AS s INNER JOIN asignaturas AS a WHERE p.id_usuario = ? AND p.id_seccion = s.id_seccion AND s.id_asignatura = a.id_asignatura ORDER BY p.fecha_publicacion DESC LIMIT $offset,20";
            
            $sth = $this->db->prepare($sql);
            $sth->execute(array($params['id_usuario']));
    
            $publicaciones = $sth->fetchAll();
    
            return  $publicaciones;
        }

        $sth = $this->db->prepare("SELECT id_seccion FROM alumnos_has_secciones WHERE id_usuario = ?");
        $sth->execute(array($params['id_usuario']));
        $secciones = $sth->fetchAll();

        $publicaciones = [];

        foreach($secciones as $key => $value):
            $sql = "SELECT p.titulo,  p.id_publicacion, p.id_usuario, p.descripcion, p.id_seccion, p.fecha_publicacion, s.nombre, a.nombre_asig FROM publicaciones AS p INNER JOIN secciones AS s INNER JOIN asignaturas AS a WHERE p.id_seccion = ? AND p.id_seccion = s.id_seccion AND s.id_asignatura = a.id_asignatura ORDER BY p.fecha_publicacion DESC LIMIT $offset,10";
            $sth = $this->db->prepare($sql);
            $sth->execute(array($value['id_seccion']));
            $datos = $sth->fetchAll();
            foreach ($datos as $key => $value) {
               $publicaciones[] = $value;
            }
        endforeach;

        return  $publicaciones;
    }

    public function getPosts($params){
        if(isset($params['offset']) == NULL){
            $offset = 0;
        }else{
            $offset = $params['offset'];
        }

        $sql = "SELECT p.titulo, p.id_publicacion, p.id_usuario, p.descripcion, p.id_seccion, p.fecha_publicacion, s.nombre, a.nombre_asig FROM publicaciones AS p INNER JOIN secciones AS s INNER JOIN asignaturas AS a WHERE p.id_seccion = ? AND p.id_seccion = s.id_seccion AND s.id_asignatura = a.id_asignatura ORDER BY p.fecha_publicacion DESC LIMIT $offset,20";

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

        $sql = "INSERT INTO $this->table3 (titulo, descripcion, id_seccion, id_usuario) VALUES (?,?,?,?)";
        
        $sth = $this->db->prepare($sql);

        $sth->execute(array($params['titulo'],$params['descripcion'], $params['id_seccion'], $params['id_usuario']));

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

        #datos profesor

        $sth = $this->db->prepare("SELECT u.usuario, u.nombre_completo, u.correo, a.nombre_asig, a.trimestre, s.nombre AS nombreSeccion,m.nombre AS nombreMalla FROM usuarios AS u INNER JOIN secciones AS s INNER JOIN asignaturas AS a INNER JOIN malla_curricular AS m WHERE u.id_usuario = ? AND s.id_seccion = ? AND u.id_usuario = s.id_usuario AND s.id_asignatura = a.id_asignatura AND u.id_malla = m.id_malla");

        $sth->execute(array($params['id_usuario'], $params['id_seccion']));

        $datos['datos']['seccion'] = $sth->fetchAll();

        if(count($datos['datos']['seccion']) == 0){
            return array('msg' => 'La sección no Existe.');
        }

        #asistencias

        $sth = $this->db->prepare("SELECT fecha, id_usuario, asistio FROM alumnos_has_asistencias WHERE id_seccion = ? AND fecha >= ? AND fecha <= ? ORDER BY fecha ASC");

        $sth->execute(array($params['id_seccion'], $params['desde'], $params['hasta']));

        $datos['datos']['asistencias'] = $sth->fetchAll();

        if(count($datos['datos']['asistencias']) == 0){
             return array('msg' => 'No hay asistencias para la fecha dada.');
        }

        #numero de encuentros

        $sth = $this->db->prepare("SELECT fecha FROM alumnos_has_asistencias WHERE id_seccion = ? AND fecha >= ? AND fecha <= ? GROUP BY fecha ASC");

        $sth->execute(array($params['id_seccion'], $params['desde'], $params['hasta']));

        $a = $sth->fetchAll();

        $datos['datos']['encuentros'] = $a;

        $encuentros = count($a);

        if(count($datos['datos']['encuentros']) == 0){
             return array('msg' => 'No hay asistencias para la fecha dada.');
        }

        #datos alumnos 

        $sql = "SELECT u.id_usuario, u.cedula, u.nombre_completo, ahs.id_seccion, ahs.estado FROM alumnos_has_secciones AS ahs INNER JOIN usuarios AS u WHERE id_seccion = ? AND ahs.id_usuario = u.id_usuario GROUP BY cedula ORDER BY cedula ASC";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($params['id_seccion']));

        $datos['datos']['alumnos_seccion'] = $sth->fetchAll();

        foreach($datos['datos']['alumnos_seccion'] as $llave => $usuario){
            if($usuario['estado'] == 0){
                unset($datos['datos']['alumnos_seccion'][$llave]);
            }
        }

        foreach($datos['datos']['alumnos_seccion'] as $llave => $usuario) {

            foreach($datos['datos']['encuentros'] as $llave2 => $enc){

                $asis_n = array('fecha' => $enc['fecha'], 'id_usuario' => $datos['datos']['alumnos_seccion'][$llave]['id_usuario'] ,'asistio' => "0" );

                $datos['datos']['alumnos_seccion'][$llave]['asistencias'][] = $asis_n;

                foreach ($datos['datos']['asistencias'] as $llave3 => $asis) {

                    if($enc['fecha'] == $asis['fecha']){

                        if($asis['id_usuario'] == $usuario['id_usuario']){
                            foreach($datos['datos']['alumnos_seccion'][$llave]['asistencias'] as $l => $s){
                                if($s['fecha'] == $asis['fecha']){
                                    $datos['datos']['alumnos_seccion'][$llave]['asistencias'][$l] = $asis;
                                }
                            }

                        }

                    } 
                }

            }

        }
        
        foreach($datos['datos']['alumnos_seccion'] as $llave => $value) {

            foreach ($datos['datos']['alumnos_seccion'][$llave]['asistencias'] as $llave2 => $value) {

                if($value['asistio'] == 1){

                    $datos['datos']['alumnos_seccion'][$llave]['ap'][] = $value['asistio'];

                }else {

                    $datos['datos']['alumnos_seccion'][$llave]['an'][] = $value['asistio'];       

                }

            }

            # Asistencias Positivas

            if(isset($datos['datos']['alumnos_seccion'][$llave]['ap']) != NULL){

              $ta = count($datos['datos']['alumnos_seccion'][$llave]['ap']);

            }else{

                $ta = 0;

            }

            # Asistencias Negativas

            if (isset($datos['datos']['alumnos_seccion'][$llave]['an']) != NULL) {

                $ti = count($datos['datos']['alumnos_seccion'][$llave]['an']);

            }else{

                $ti = 0;

            }

            if($ta > 0){

                $datos['datos']['alumnos_seccion'][$llave]['porcentaje_asistencias'] = round($ti * 100 / $encuentros, 0, PHP_ROUND_HALF_UP);

                $datos['datos']['alumnos_seccion'][$llave]['porcentaje_inasistencias'] = 100 - $datos['datos']['alumnos_seccion'][$llave]['porcentaje_asistencias'];

            }

            if($ti > 0){

                $datos['datos']['alumnos_seccion'][$llave]['porcentaje_inasistencias'] = round($ti * 100 / $encuentros, 0, PHP_ROUND_HALF_UP);

                $datos['datos']['alumnos_seccion'][$llave]['porcentaje_asistencias'] = 100 - $datos['datos']['alumnos_seccion'][$llave]['porcentaje_inasistencias'];

            }
        }

        // Creamos el archivo PDF
        $date = date("d-m-Y-H-i-s");
        $nombreProfesor = $datos['datos']['seccion'][0]['usuario'];

        $filename =  "$nombreProfesor-$date-reporte-asistencias.pdf";

        $content = "
        <!DOCTYPE html>
        <html lang='en'>
        <head>
        <meta charset='UTF-8'>
        <meta http-equiv='Content-Type' content='text/html; charset=utf-8'/>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <meta http-equiv='X-UA-Compatible' content='ie=edge'>
        <title>Reporte</title>
  <style>
    *{
        font-family:monospace;
    }
    .elemento {
        margin-right: 30px;
        display: inline-block;
        margin-bottom: 5px;
    }
    .cuerpo {
        margin: 20px 0;
    }

    .text-center {
      text-align: center;
    }

    .membrete {
      width:100%;
      height:50px;
    }

    .no-borde{border:none !important;}

    .text-rotado {
    display: block;
    word-break: break-word;
    text-align:center;
        width: 70px !important;
    max-width: 70px !important;
    }

    span.campo_subrayado {
      width: auto;
      padding: 0 8px;
      border-bottom: 1px solid black;
      min-width: 80px;
      display: inline-block;
    }

    span.elementoFirma {
      border-top: 1px solid black;
      padding: 0 8px;
    }

    table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      font-size: 10px;
       margin: auto;

    }

    th,
    td {
      border: 1px solid black;
      padding: 4px 2px;
      text-align: center !important;
    }

    .pivote th {
        height: 30px;
        width: 30px;
    }

    .cuerpo {
        margin-bottom:80px;
    }

  </style>

        </head>
<body>
        <div>
            <div>
                <img class='membrete' src='app/outputPDF/banner.png'>
            </div>
            
            <div class='datos'>
            <H4 class='text-center' style='margin-top:20px;'>PROGRAMA NACIONAL DE FORMACIÓN EN  <span style='text-transform:UPPERCASE;'>".$datos['datos']['seccion'][0]['nombreMalla']."</span> (PNFI) CONTROL DE PLANIFICACIÓN Y ASISTENCIA</H4>
                <div class='datos1'>
                    <span class='elemento'>
                        <span>Docente:</span>
                        <span class='campo_subrayado'>
                            ".$datos['datos']['seccion'][0]['nombre_completo']."
                        </span>
                    </span>

                    <span class='elemento'>
                        <span>Unidad Curricular:</span>
                        <span class='campo_subrayado'>
                            ".$datos['datos']['seccion'][0]['nombre_asig']."
                        </span>
                    </span>
                    <span class='elemento'>
                        <span>Sección:</span>
                        <span class='campo_subrayado'>
                            ".$datos['datos']['seccion'][0]['nombreSeccion']."
                        </span>
                    </span>
                </div>
                <div class='datos2'>
                    <span class='elemento'>
                        <span>PNF:</span>
                        <span class='campo_subrayado'>
                            ".$datos['datos']['seccion'][0]['nombreMalla']."
                        </span>
                    </span>
                    <span class='elemento'>
                        <span>Año:</span>
                        <span class='campo_subrayado'>
                            ".date('Y')."
                        </span>
                    </span>
                    <span class='elemento'>
                        <span>Período Académico:</span>
                        <span class='campo_subrayado'>
                            ".$datos['datos']['seccion'][0]['trimestre']." Trimestre
                        </span>
                    </span>
                </div>
            </div>
        </div>
        <div class='cuerpo'>
            <table>
            <thead>
                <tr class='pivote'>
                <th colspan='4' style='border:none;'></th>";
                    foreach($datos['datos']['encuentros'] as $key => $v):
                        $content .= "<th></th>";
                    endforeach;
                $content .= "
                <th rowspan='3' >Total <br>Asistencia</th>
                <th rowspan='3' >Porcentaje <br>Asistencias</th>
                <th rowspan='3' >Porcentaje <br>Inasistencias</th>
                </tr>
                <tr>
                <th colspan='4' style='border:none; text-align:right !important;'>OBJETIVOS FACILITADOS O EVALUADOS</th>";
                    foreach($datos['datos']['encuentros'] as $key => $v):
                        $n = $key + 1;
                        $content .= "<th>C".$n.":</th>";
                    endforeach;
                $content .= "
                </tr>
                <tr>
                <th colspan='4' style='border:none; text-align:right !important;'>FECHA</th>";
                    foreach($datos['datos']['encuentros'] as $key => $v):
                        $fecha = date_create_from_format('Y-m-d', $v['fecha']);
                        $fecha = date_format($fecha, 'm-d');
                        $content .= "<th>".$fecha."</th>";
                    endforeach;
                $content .= "
                </tr>
                <tr>
                    <th>Nº</th>
                    <th>CEDULA</th>
                    <th>APELLIDOS Y NOMBRES</th>
                    <th>EDE</th>";
                        foreach($datos['datos']['encuentros'] as $key => $v):
                            $content .= "<th></th>";
                        endforeach;
                    $content .= "
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            ";
                foreach ($datos['datos']['alumnos_seccion'] as $key => $value) {
                    $n = $key + 1;
                    $content .= "
                    <tr>
                    <td>".$n."</td>
                    <td>".$value['cedula']."</td>
                    <td>".$value['nombre_completo']."</td>
                    <td>CMA</td>";

                    foreach ($datos['datos']['alumnos_seccion'][$key]['asistencias'] as $llave => $value) {
                        $content .= "<td>".$value['asistio']."</td>";
                    }
                    
                    $content .= "
                    <td>".$encuentros."</td>
                    <td>".$datos['datos']['alumnos_seccion'][$key]['porcentaje_asistencias']."%</td>
                    <td>".$datos['datos']['alumnos_seccion'][$key]['porcentaje_inasistencias']."%</td>
                    </tr>";
                }
            $content .= "
                <tr>
                <th colspan='3' style='border:none;'></th>
                <td style='border:none;'>Firma Vocero</td>";

                foreach($datos['datos']['encuentros'] as $key => $v):
                    $content .= "<td></td>";
                endforeach;
                

            $content .= "
                <td class='no-borde'></td>
                <td class='no-borde'></td>
                <td class='no-borde'></td>
                </tr>
            </tbody>
            </table>
        </div>
        <div style='text-align:center;'>
            <div style='display:inline-block; width:35%; text-align:center;'>
                <span class='elementoFirma' >Firma del Docente</span>
            </div>
            <div style='display:inline-block; width:60%; text-align:center;'>
                <span class='elementoFirma'>Firma y Sello de la Coordinación que administra la Sección</span>
            </div>
        </div>
</body>
</html>";

        $dompdf = new Dompdf();
        $dompdf->setPaper('A4', 'landscape');
        $dompdf->loadHtml($content);
        $dompdf->render();
        $pdf_gen = $dompdf->output();
        
        if(isset($params['app']) != NULL){
            if(!file_put_contents('app/outputPDF/'.$filename, $pdf_gen)){
                return array('msg' => 'pdf no generado');
            }

            $adjunto = 'app/outputPDF/'.$filename;
            $mail = new PHPMailer(true);   
        
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

                if($params['app'] == 'Correo Propio'){
                    $mail->addAddress($datos['datos']['seccion'][0]['correo']);
                }else{
                    $mail->addAddress($params['correo']);
                }

                $mail->addAttachment($adjunto);    // Optional name

                $mail->isHTML(true);                                  // Set email format to HTML
                $mail->Subject = 'Reporte de Asistencias!';
                $mail->Body    = "<h2>Reporte adjunto en el correo</h2>";

                $mail->CharSet = 'utf-8';
                $mail->SMTPOptions = array(
                    'ssl' => array(
                        'verify_peer' => false,
                        'verify_peer_name' => false,
                        'allow_self_signed' => true
                    )
                );

                $mail->send();

                # Registramos el reporte en la base de datos

                $sth = $this->db->prepare("INSERT INTO reportes (nombre_reporte, desde, hasta, id_usuario) VALUES (?,?,?,?)");
                $sth->execute(array($filename, $params['desde'], $params['hasta'], $params['id_usuario']));

                return array('msg' => 'pdf generado y Correo Enviado!', 'nombre_pdf' => $filename, 'insertId' => $this->db->lastInsertId());

            } catch (Exception $e) {

                return array('msg' => $mail->ErrorInfo);

            }
            
        }

        if(!file_put_contents('app/outputPDF/'.$filename, $pdf_gen)){
            return array('msg' => 'pdf no generado');
        }else{

            # Registramos el reporte en la base de datos

            $sth = $this->db->prepare("INSERT INTO reportes (nombre_reporte, desde, hasta, id_usuario) VALUES (?,?,?,?)");
            $sth->execute(array($filename, $params['desde'], $params['hasta'], $params['id_usuario']));
            
            return array('msg' => 'pdf generado!', 'nombre_reporte' => $filename, 'insertId' => $this->db->lastInsertId(), 'nombre_completo' => $nombreProfesor);
        }
    }

    public function deleteReport($params){
        
        if(unlink($this->path_reporte.$params['nombre'])):
            
            /* Borrar Registros Base de datos */
            $sth = $this->db->prepare("DELETE FROM reportes WHERE id_reporte = ?");
            $result = $sth->execute(array($params['id']));

            if($result == false):
                return array('msg'=>'No existe el registro');
            endif;

            return array('archivo eliminado' => $params['nombre'], 'Consulta' => $result);
        else:
            return array('msg'=>'No existe el archivo');
        endif;

    }

    public function getAllReport($params){

        if(isset($params['id_usuario']) != NULL){

            $sql = "SELECT * FROM reportes INNER JOIN usuarios WHERE id_usuario = ? AND reportes.id_usuario = usuarios.id_usuario";

            $sth = $this->db->prepare($sql);

            $sth->execute(array($params['id_usuario']));
            $reportes = $sth->fetchAll();

            if(count($reportes) > 0){
                return array('msg' => 'Reportes Cargados', 'reportes' => $reportes);
            }
        }

        $sth = $this->db->prepare("SELECT *, usuarios.nombre_completo FROM reportes INNER JOIN usuarios WHERE reportes.id_usuario = usuarios.id_usuario ");
        $sth->execute();
        $reportes = $sth->fetchAll();

        if(count($reportes) > 0){
            return array('msg' => 'Reportes Cargados', 'reportes' => $reportes);
        }

    }

    public function getInfoSeccion($params){
        $sql = "SELECT * FROM $this->table AS s INNER JOIN usuarios AS u ON s.id_usuario = u.id_usuario INNER JOIN asignaturas AS a ON s.id_asignatura = a.id_asignatura WHERE id_seccion = ?";

        $sth = $this->db->prepare($sql);

        $sth->execute(array($params['id_seccion']));

        return $sth->fetchAll();
    }

}