<?php

use App\Model\UserModel;
use App\Model\BDModel;

$app->post('/login', function ($req, $res, $args) {
    // Se instancia el modelo
    $m = new UserModel();

    $params = $req->getParsedBody();

    $result = $m->login($params);

    if(!isset($result)):
        return $this->response->withJson(array("error"=>"acceso negado"), 405);
    else:
        return $this->response->withJson($result, 200);
    endif;
});

$app->get('/logout', function ($req, $res, $args) {
    session_destroy();
    return $this->response->withJson(array("ok"=>"sesion finalizada"));
});

$app->get('/session', function ($req, $res, $args) {
    return $this->response->withJson(array("usuario"=>$_SESSION['usuario']));
});

$app->get('/app', function ($req, $res, $args) {

    $sql = 'SELECT * FROM app_config';

    $sth = $this->db->prepare($sql);

    $sth->execute();

    $result = $sth->fetch();

    return $this->response->withJson($result);

})->add($mw);

$app->group('/bd',function(){

    $this->get('/restore',function($req, $res, $args){
        $m = new BDModel();
        
        $result = $m->restore();
                
        return $this->response->withJson($result);
    });

    $this->get('/backup',function($req, $res, $args){
        $m = new BDModel();

        $result = $m->backup();
        
        return $this->response->withJson($result);
    });

    $this->get('/backups',function($req, $res, $args){
        $m = new BDModel();

        $result = $m->getBackups();
        
        return $this->response->withJson($result);
    });

})->add($mw);
