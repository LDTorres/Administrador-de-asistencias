<?php

use App\Model\SeccionesModel;

$sm = new SeccionesModel();

$app->group('/seccion',function(){

    $this->get('/all',function($req, $res, $args){

        $result = $GLOBALS['sm']->getAll($args['id_materia']);
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

    $this->put('/update', function($req, $res){

        $params = $req->getParsedBody();

        $result = $GLOBALS['sm']->update($params);

        return $this->response->withJson($result, 200);
    });

    $this->get('/members/{id}', function($req, $res, $args){

        $result = $GLOBALS['sm']->getMembers($args['id']);

        return $this->response->withJson($result, 200);
    });

    $this->get('/member/{id}', function($req, $res, $args){

        $result = $GLOBALS['sm']->getMember($args['id']);

        return $this->response->withJson($result, 200);

    });

    $this->get('/member/delete/{id}', function($req, $res, $args){

        $result = $GLOBALS['sm']->deleteMember($args['id']);

        return $this->response->withJson($result, 200);
    });

    $this->post('/member/add', function($req, $res){

        $params = $req->getParsedBody();

        $result = $GLOBALS['sm']->addMember($params);
        
        return $this->response->withJson($result);
    });

    $this->get('/posts/{id}/{offset}', function($req, $res, $args){

        $result = $GLOBALS['sm']->getPosts($args['id'], $args['offset']);

        return $this->response->withJson($result, 200);
    });

    $this->post('/posts/get', function($req, $res){

        $params = $req->getParsedBody();
        
        $result = $GLOBALS['sm']->getPost($params['id']);

        return $this->response->withJson($result, 200);
    });

    $this->post('/post/add', function($req, $res){

        $directory = $this->upload;

        $archivos = $req->getUploadedFiles();

        $params = $req->getParsedBody();

        if(isset($archivo)):
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

    $this->post('/posts/delete', function($req, $res){

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

})->add($mw);