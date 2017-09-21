<?php

use App\Model\UserModel;

// Se instancia el modelo
$um = new UserModel();

// USUARIOS
$app->group('/user', function () {

    $this->get('/all[/{tipo}]', function ($req, $res, $args) {

        // Llamamos a la funcion de obtener usuarios
        if(isset($args['tipo']) && $args['tipo'] == 'Profesor'):
            $result = $GLOBALS['um']->getAll($args['tipo']);
        else:
            $result = $GLOBALS['um']->getAll('Estudiante');
        endif;

        return $this->response->withJson($result);
        
    });

    $this->get('/{id}', function ($req, $res, $args) {

        $result = $GLOBALS['um']->get($args['id']);
        return $this->response->withJson($result);

    });
        
    $this->put('/update', function ($req, $res) {
       
        $params = $req->getParsedBody();

        $result = $GLOBALS['um']->update($params);

        return $this->response->withJson($result);

    });
    
    $this->post('/picture', function ($req, $res) {
       
        $directory = $this->upload;
        $archivos = $req->getUploadedFiles();
        $archivo = $archivos['foto'];
    
        if (empty($archivo)):
            throw new Exception('Archivo Esperado');
        endif;
        
        if ($archivo->getError() === UPLOAD_ERR_OK):
            $filename = moveUploadedFile($directory, $archivo);
            $res->write('<h3>Archivo Subido:</h3> <p>Nombre:</br> ' . $filename . '</p>');
        endif;
    
        $params = $req->getParsedBody();
        $result = $GLOBALS['um']->picture($params, $filename);
            
        return $this->response->withJson($result);
            
    });

    $this->get('/status/{id}[/{accion}]', function ($req, $res, $args) {

        return $this->response->withJson($GLOBALS['um']->status($args));      

    });

})->add($mw);

$app->post('/registro', function ($req, $res) {

    $data = $req->getParsedBody();

    $result = $GLOBALS['um']->add($data);
        
    return $this->response->withJson($result);

});

