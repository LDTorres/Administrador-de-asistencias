<?php

namespace App\Lib;

use PDO;

class Database
{
    public static function conexion()
    {
        $db = [
            'host' => 'localhost',
            'user' => 'root',
            'pass' => '',
            'dbname' => 'iuteb_asignaturas'
        ];
        
        $pdo = new PDO("mysql:host=" . $db['host'] . ";dbname=" . $db['dbname'], $db['user'], $db['pass']);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        
        return $pdo;
    }
}