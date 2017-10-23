<?php

require 'middleware.php';

use App\Model\UserModel;
use App\Model\BDModel;

// Se instancia el modelo
$um = new UserModel();
$bdm = new BDModel();

$app->post('/login', function ($req, $res) {

    $params = $req->getParsedBody();

    $result =  $GLOBALS['um']->login($params);

    if($result == false):
        return $this->response->withJson(array("error"=>"Datos Invalidos"), 404);
    else:
        return $this->response->withJson($result, 200);
    endif;
});

$app->get('/logout', function ($req, $res, $args) {
    session_destroy();
    return $this->response->withJson(array("ok"=>"sesion finalizada"));
});

$app->post('/checkAuth', function ($req, $res) {
    $params = $req->getParsedBody();
    return $this->response->withJson($GLOBALS['um']->check($params['token']));
});

$app->post('/decodeToken', function ($req, $res) {
    $params = $req->getParsedBody();
    return $this->response->withJson($GLOBALS['um']->getData($params['token']));
});

$app->get('/', function ($req, $res, $args) {

    $sql = 'SELECT * FROM app_config';

    $sth = $this->db->prepare($sql);

    $sth->execute();
    
    return $this->response->withJson($sth->fetch());

});

// ->add($mw);

$app->group('/bd',function(){
    
    $this->post('/restore',function($req, $res){
        $params = $req->getParsedBody();
        $result = $GLOBALS['bdm']->restore($params['filename']);
        return $this->response->withJson($result);
    });

    $this->get('/backup',function($req, $res, $args){
        $result = $GLOBALS['bdm']->backup();
        return $this->response->withJson($result);
    });

    $this->post('/delete',function($req, $res){
        $params = $req->getParsedBody();
        $result = $GLOBALS['bdm']->delete($params['filename'], $params['id']);

        return $this->response->withJson($result);
    });

    $this->get('/backups',function($req, $res, $args){        
        return $this->response->withJson($GLOBALS['bdm']->getBackups());
    });
})->add($mw);

// ->add($mw);
