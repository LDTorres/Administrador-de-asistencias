<?php
return [
    'settings' => [
        'displayErrorDetails' => true, // set to false in production
        'addContentLengthHeader' => false, // Allow the web server to send the content-length header

        // Renderer settings
        'renderer' => [
            'template_path' => __DIR__ . '/../templates/',
        ],
        // Database
        'db'=>[
            'host' => 'localhost',
            'user' => 'root',
            'pass' => '',
            'dbname' => 'iuteb_asignaturas'
        ],
        // Monolog settings
        'logger' => [
            'name' => 'iuteb-app',
            'path' => __DIR__ . '/../logs/app.log',
            'level' => \Monolog\Logger::DEBUG,
        ],
    ],
];
