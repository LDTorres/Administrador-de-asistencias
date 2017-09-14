<?php

namespace App\Model;

use mysqli;

class BDModel {

    private $db;
    private $path = 'C:\Users\Luis Torres\Documents\GitHub\adminAsistent\api\app\lib\backups';
    
    public function __CONSTRUCT()
    {
        $this->db = new mysqli('localhost', 'root', '', 'iuteb_asignaturas');
        
        // Check connection
        if ($this->db->connect_error) {
            die("Connection failed: " . $this->db->connect_error);
        } 
    }

    public function backup(){

        $tables= '*';

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
        
        //cycle through
        $return="";
    
        foreach($tables as $table):
            $result = $this->db->query("SELECT * FROM $table");
            $num_fields = mysqli_num_fields($result);
            
            $return.="DROP TABLE $table;";

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
            $return.="\n\n\n";
        endforeach;
        
        $fechaNombre=date("d-m-Y H-i-s");

        $filename = "$path\basededatos-iuteb-$fechaNombre.sql";
        
        $handle = fopen($filename,'w+');
        fwrite($handle,$return);
        fclose($handle);

        return array('filename'=>$filename, 'sql'=>$return);
    }

    public function restore($filename){

        $texto = file_get_contents($path.$filename);
        $sentencia = explode(";", $texto);
        $errors = array();
        for($i = 0; $i < (count($sentencia)-1); $i++):
            $query = $this->db->query("$sentencia[$i];");
            array_push($errors, mysqli_error($this->db));
        endfor;

        return $errors;
    }

    public function delete($filename){
        /* Borrar Registros Base de datos */
        unlink($path.$filename);
    }

    public function getBackups(){

        $directorio = opendir($this->path); 
        
        $backups = array();

        while ($archivo = readdir($directorio)):
               
            if ($archivo{0} == '.') continue;
            if ($archivo{0} == '..') continue;
            array_push($backups, $archivo);
            
        endwhile;

        return $backups;
    }

}
