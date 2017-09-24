<?php

use App\Model\AsignaturasModel;

// Instanciamos el modelo
$mm = new AsignaturasModel();

$app->group('/asignatura',function(){
    $this->get('/all[/{id}]',function($req, $res, $args){

        $result = $GLOBALS['mm']->getAll($args['id']);
        
        return $this->response->withJson($result);
    });

    $this->get('/{id}/{trimestre}[/{pnf}]',function($req, $res, $args){

        $result = $GLOBALS['mm']->get($args);
        
        return $this->response->withJson($result);
    });

    $this->post('/add', function($req, $res){

        $params = $req->getParsedBody();

        $result = $GLOBALS['mm']->add($params);
        
        return $this->response->withJson($result);
    });

    $this->post('/update', function($req, $res){

        $params = $req->getParsedBody();

        $result = $GLOBALS['mm']->update($params);

        return $this->response->withJson($result, 200);
    });

})->add($mw);