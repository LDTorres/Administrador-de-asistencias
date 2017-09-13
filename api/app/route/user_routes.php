<?php

use App\Model\UserModel;

// USUARIOS
$app->group('/user', function () {

    $this->get('/all[/{tipo}]', function ($req, $res, $args) {
        // Se instancia el modelo
        $m = new UserModel();

        // Llamamos a la funcion de obtener usuarios
        if(isset($args['tipo']) && $args['tipo'] == 'Profesor'):
            $result = $m->getAll($args['tipo']);
        else:
            $result = $m->getAll('Estudiante');
        endif;

        return $this->response->withJson($result);
        
    });

    $this->get('/{id}', function ($req, $res, $args) {
        // Se instancia el modelo
        $m = new UserModel();

        $result = $m->get($args['id']);
        return $this->response->withJson($result);

    });

    $this->post('/add', function ($req, $res) {
        // Se instancia el modelo
        $m = new UserModel();

        $data = $req->getParsedBody();
        $result = $m->add($data);
        
        return $this->response->withJson($result);
    });
        
    $this->put('/update', function ($req, $res) {
        // Se instancia el modelo
        $m = new UserModel();
        $params = $req->getParsedBody();

        $result = $m->update($params);
        return $this->response->withJson($result);
    });
    
    $this->post('/picture', function ($req, $res) {
        // Se instancia el modelo
        $m = new UserModel();

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
        $result = $m->picture($params, $filename);
            
        return $this->response->withJson($result);
            
    });

    $this->get('/status/{id}[/{accion}]', function ($req, $res, $args) {

        $m = new UserModel();

        return $this->response->withJson($m->status($args));             
    });

})->add($mw);

