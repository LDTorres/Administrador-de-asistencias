<?php

require 'middleware.php';

use App\Model\SeccionesModel;

$sm = new SeccionesModel();

$app->group('/seccion',function(){

    $this->post('/getInfo', function($req, $res){

        $params = $req->getParsedBody();
        
        $result = $GLOBALS['sm']->getInfoSeccion($params);

        return $this->response->withJson($result, 200);

    });

    $this->get('/all/{id_asignatura}',function($req, $res, $args){

        $result = $GLOBALS['sm']->getAll($args['id_asignatura']);
        return $this->response->withJson($result);
    });

    $this->get('/{id}/{idP}',function($req, $res, $args){

        $result = $GLOBALS['sm']->get($args['id'],$args['idP']);
        
        return $this->response->withJson($result);
    });

    $this->post('/add', function($req, $res){

        $params = $req->getParsedBody();

        $result = $GLOBALS['sm']->add($params);
        
        return $this->response->withJson($result);
    });

    $this->post('/update', function($req, $res){

        $params = $req->getParsedBody();

        $result = $GLOBALS['sm']->update($params);

        return $this->response->withJson($result, 200);
    });

    $this->post('/members', function($req, $res){
        $params = $req->getParsedBody();

        $result = $GLOBALS['sm']->getMembers($params);

        return $this->response->withJson($result, 200);
    });

    $this->get('/member/{id}', function($req, $res, $args){

        $result = $GLOBALS['sm']->getMember($args['id']);

        return $this->response->withJson($result, 200);

    });

    $this->post('/member/status', function($req, $res){

        $params = $req->getParsedBody();

        $result = $GLOBALS['sm']->statusMember($params);

        return $this->response->withJson($result, 200);
        
    });

    $this->post('/member/add', function($req, $res){

        $params = $req->getParsedBody();

        $result = $GLOBALS['sm']->addMember($params);
        
        return $this->response->withJson($result);
    });

    $this->get('/posts/timeline/{id}', function($req, $res, $args){

        $result = $GLOBALS['sm']->getPostsTimeline($args);

        return $this->response->withJson($result, 200);

    });

    $this->post('/posts', function($req, $res){

        $params = $req->getParsedBody();

        $result = $GLOBALS['sm']->getPosts($params);

        return $this->response->withJson($result, 200);

    });

    $this->post('/post/get', function($req, $res){

        $params = $req->getParsedBody();
        
        $result = $GLOBALS['sm']->getPost($params);

        return $this->response->withJson($result, 200);
    });

    $this->post('/post/add', function($req, $res){

        $directory = $this->upload;

        $archivos = $req->getUploadedFiles();

        $params = $req->getParsedBody();

        if(isset($archivos['archivo'])):
            $archivo = $archivos['archivo'];
            if (!empty($archivo)):
                if ($archivo->getError() === UPLOAD_ERR_OK):
                    $filename = moveUploadedFile($directory, $archivo);
                endif;
            endif;
        else:
            $filename = NULL;
        endif;

        $result = $GLOBALS['sm']->addPost($params, $filename);
        
        return $this->response->withJson($result);
    });

    $this->post('/post/update', function($req, $res){

        $directory = $this->upload;

        $archivos = $req->getUploadedFiles();

        $params = $req->getParsedBody();

        if(isset($archivos['archivo'])):
            $archivo = $archivos['archivo'];
            if (!empty($archivo)):
                if ($archivo->getError() === UPLOAD_ERR_OK):
                    $filename = moveUploadedFile($directory, $archivo);
                endif;
            endif;
        else:
            $filename = NULL;
        endif;

        $result = $GLOBALS['sm']->updatePost($params, $filename);
        
        return $this->response->withJson($result);
    });

    $this->post('/post/delete', function($req, $res){

        $params = $req->getParsedBody();

        return $this->response->withJson($GLOBALS['sm']->deletePost($params), 200);
    });

    $this->post('/asistencia', function($req, $res){
        $params = $req->getParsedBody();

        return $this->response->withJson($GLOBALS['sm']->setAsistence($params), 200);
    });
    
    $this->post('/asistencia/get', function($req, $res){
        $params = $req->getParsedBody();
        return $this->response->withJson($GLOBALS['sm']->getAsistences($params), 200);
    });

    $this->post('/reporte', function($req, $res){
        $params = $req->getParsedBody();

        return $this->response->withJson($GLOBALS['sm']->getReport($params), 200);
    });

})->add($mw);

// ->add($mw);