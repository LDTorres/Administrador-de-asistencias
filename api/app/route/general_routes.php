<?php

require 'middleware.php';

use App\Model\UserModel;
use App\Model\BDModel;
use App\Model\PnfModel;
use App\Model\correosModel;

// Se instancia el modelo
$um = new UserModel();
$bdm = new BDModel();
$pnfm = new PnfModel();
$cm = new correosModel();

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

$app->post('/sendMail', function ($req, $res) {
    $params = $req->getParsedBody();
    $result = $GLOBALS['pnfm']->sendMail($params);
    return $this->response->withJson($result);
});

$app->post('/forgotPass', function ($req, $res) {
    $params = $req->getParsedBody();
    $result = $GLOBALS['um']->forgotPass($params);
    return $this->response->withJson($result);
});

$app->get('/[{app}]', function ($req, $res, $args) {

    $sql = 'SELECT * FROM app_config';

    $sth = $this->db->prepare($sql);

    $sth->execute();

    if(isset($args['app']) != NULL){
        return $this->response->withJson($sth->fetch());
    }

    return $this->renderer->render($res, 'index.php', array('datos' => $sth->fetch()));

});

$app->post('/update', function ($req, $res) {

        $params = $req->getParsedBody();
        
        $sql = "UPDATE `app_config` SET `nombre`= ?,`versionApp`= ?,`fecha_creacion`= ?,`descripcion`= ? WHERE 1";
    
        $sth = $this->db->prepare($sql);
    
        $sth->execute(array($params['nombre'], $params['versionApp'], $params['fecha_creacion'], $params['descripcion']));
        
        return $this->response->withJson(array('filas_afectadas' => $sth->rowCount()));
   
})->add($mw);

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


$app->group('/mail',function(){
    
    $this->post('/newPost',function($req, $res){
        $params = $req->getParsedBody();
        return $this->response->withJson($GLOBALS['cm']->newPost($params));
    });

    $this->post('/newSeccion',function($req, $res){
        $params = $req->getParsedBody();
        return $this->response->withJson($GLOBALS['cm']->newSeccion($params));
    });

    $this->post('/newUser',function($req, $res){
        $params = $req->getParsedBody();
        return $this->response->withJson($GLOBALS['cm']->newUser($params));
    });

})->add($mw);

// ->add($mw);
