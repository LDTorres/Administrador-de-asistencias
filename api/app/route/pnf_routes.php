<?php

use App\Model\PnfModel;

$pm = new PnfModel();

$app->group('/pnf',function(){
    $this->get('/all',function($req, $res, $args){

        $result = $GLOBALS['pm']->getAll();

        return $this->response->withJson($result);
    });

    $this->get('/{id}',function($req, $res, $args){

        $result = $GLOBALS['pm']->get($args['id']);
        
        return $this->response->withJson($result);
    });

    $this->post('/add', function($req, $res){

        $params = $req->getParsedBody();

        $result = $GLOBALS['pm']->add($params);
        
        return $this->response->withJson($result);
    });

    $this->put('/update', function($req, $res){

        $params = $req->getParsedBody();

        $result = $GLOBALS['pm']->update($params);

        return $this->response->withJson($result, 200);
    });

});