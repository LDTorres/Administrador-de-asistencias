<?php

namespace App\Model;

use mysqli;

class BDModel {
    
    private $db;
    private $path = "app/lib/backups/";
    private $table;
    private $aplication = 'Administrador de Asistencias';
    private $database = 'iuteb_asignaturas';
    private $description = 'Base de datos para aplicacion de asistencias del IUTEB';
    
    public function __CONSTRUCT()
    {
        $this->table = 'basededatos';
        $this->db = new mysqli('127.0.0.1', 'root', '', 'iuteb_asignaturas');
        
        // Check connection
        if ($this->db->connect_error) {
            die("Connection failed: " . $this->db->connect_error);
        } 
    }

    public function backup(){

        $fechaNombre=date("d-m-Y-H-i-s");

        // Hacemos el registro en la base de datos
        $consulta = $this->db->query("INSERT INTO basededatos (filename) VALUES ('bd-iuteb-$fechaNombre.sql')");

        $date = date("d-m-Y H-i-s");
        $tables= '*';
        $return = "-- MySQL Script generado por $this->aplication \n-- $date \n-- Version: 1.0 \n-- MySQL Admin \n\n";
        $return .= "SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;\nSET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;\nSET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES'; \n\n\n -- ----------------------------------------------------- \n -- Schema $this->database \n -- \n -- $this->description \n -- \n -- Luis Torres -- \n -- Adrian Flores -- \n -- Michel Novellino \n \n CREATE SCHEMA IF NOT EXISTS `$this->database`;\n USE `$this->database`; \n\n ";

        //get all of the tables  
        if($tables == '*'):
            $tables = array();
            $result = $this->db->query('SHOW TABLES');

            if ($result->num_rows > 0):
                // output data of each row
                while($row = $result->fetch_array()):
                    array_push($tables, $row[0]);
                endwhile;
            endif;
        else:
            $tables = is_array($tables) ? $tables : explode(',',$tables);
        endif;
    
        foreach($tables as $table):
            $result = $this->db->query("SELECT * FROM $table");
            $num_fields = mysqli_num_fields($result);
            $return .= "-- ----------------------------------------------------- \n -- Table `Iuteb_asignaturas`.`$table` \n -- ----------------------------------------------------- \n\n";
            
            $return.="DROP TABLE IF EXISTS $table;";

            $query = $this->db->query("SHOW CREATE TABLE $table");
            $row2 = $query->fetch_row();
            $return.= "\n\n".$row2[1].";\n\n";
            
            for ($i = 0; $i < $num_fields; $i++):
                while($row = $result->fetch_row()):
                    $return.= 'INSERT INTO '.$table.' VALUES(';
                        for($j=0; $j < $num_fields; $j++):
                            $row[$j] = addslashes($row[$j]);
                            $row[$j] = preg_replace("~[\n]~","\\n",$row[$j]);
                            if (isset($row[$j])):
                                $return.= '"'.$row[$j].'"';
                            else: 
                                $return.= '""'; 
                            endif;
                            if ($j < ($num_fields-1)): 
                                $return.= ','; 
                            endif;
                        endfor;
                    $return.= ");\n";
                endwhile;
            endfor;
            $return.="\n";
        endforeach;

        $filename = $this->path."bd-$fechaNombre.sql";

        $handle = fopen($filename,'w+');
        fwrite($handle,$return);
        fclose($handle);

        return array('Ruta'=>$filename,'Consulta'=>$consulta);
    }

    public function restore($filename){

        $texto = file_get_contents($this->path.$filename);
        $sentencia = explode(";", $texto);
        $errors = array();
        for($i = 0; $i < (count($sentencia)-1); $i++):
            $query = $this->db->query("$sentencia[$i];");
            
            if("" !== mysqli_info($this->db)):
                array_push($errors, mysqli_error($this->db));
            endif;
        endfor;

        if(count($errors) > 0): 
            foreach($errors as $error):
                if($error !== null):
                    return $errors;
                endif;
            endforeach;
        endif;

        return array('msg'=> 'Restauracion Exitosa!');

    }

    public function delete($filename, $id){

        if(unlink($this->path.$filename)):
            
            /* Borrar Registros Base de datos */
            $sql = "DELETE FROM $this->table WHERE $id";
            $result = $this->db->query($sql);

            if($result == false):
                return array('msg'=>'No existe el registro');
            endif;

            return array('archivo' => $filename, 'Consulta' => $result);
        else:
            return array('msg'=>'No existe el archivo');
        endif;

    }

    public function getBackups(){
        $backups = array();

        $sql = "SELECT id, filename, date  FROM basededatos";
        $result = $this->db->query($sql);

        if ($result->num_rows > 0):
            while($row = $result->fetch_array()):
                array_push($backups, $row);
            endwhile;
        else:
            return array('msg'=>'No hay registros');
        endif;

        return $backups;
    }

}
