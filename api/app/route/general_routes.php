<?php

use App\Model\UserModel;
use App\Model\BDModel;

// Se instancia el modelo
$um = new UserModel();
$bdm = new BDModel();

$app->post('/login', function ($req, $res, $args) {

    $params = $req->getParsedBody();

    $result =  $GLOBALS['m']->login($params);

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
    
    return $this->response->withJson($sth->fetch());

})->add($mw);

// FIXME: Probar rutas
$app->group('/bd',function(){

    $this->get('/restore',function($req, $res, $args){
        return $this->response->withJson($GLOBALS['bdm']->restore());
    });

    $this->get('/backup',function($req, $res, $args){
        return $this->response->withJson($GLOBALS['bdm']->backup());
    });

    $this->get('/backups',function($req, $res, $args){        
        return $this->response->withJson($GLOBALS['bdm']->getBackups());
    });
})->add($mw);
