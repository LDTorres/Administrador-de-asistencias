<?php

use App\Model\PnfModel;

$m = new PnfModel();

$app->group('/pnf',function(){
    $this->get('/all',function($req, $res, $args){

        $result = $GLOBALS['m']->getAll();

        return $this->response->withJson($result);
    });

    $this->get('/{id}',function($req, $res, $args){

        $result = $GLOBALS['m']->get($args['id']);
        
        return $this->response->withJson($result);
    });

    $this->post('/add', function($req, $res){

        $params = $req->getParsedBody();

        $result = $GLOBALS['m']->add($params);
        
        return $this->response->withJson($result);
    });

    $this->put('/update', function($req, $res){

        $params = $req->getParsedBody();

        $result = $GLOBALS['m']->update($params);

        return $this->response->withJson($result, 200);
    });

})->add($mw);