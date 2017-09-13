<?php

use App\Model\UserModel;

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

$app->group('/BD',function(){

    $this->post('/restore',function($req, $res, $args){

    });

    $this->get('/backup',function($req, $res, $args){
        
    });

})->add($mw);
