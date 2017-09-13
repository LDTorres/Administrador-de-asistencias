<?php

use App\Model\PnfModel;

$app->group('/pnf',function(){
    $this->get('/all',function($req, $res, $args){
        $m = new PnfModel();

        $result = $m->getAll();
        return $this->response->withJson($result);
    });

    $this->get('/{id}',function($req, $res, $args){
        $m = new PnfModel();

        $result = $m->get($args['id']);
        
        return $this->response->withJson($result);
    });

    $this->post('/add', function($req, $res){
        $m = new PnfModel();

        $params = $req->getParsedBody();

        $result = $m->add($params);
        
        return $this->response->withJson($result);
    });

    $this->put('/update', function($req, $res){
        $m = new PnfModel();

        $params = $req->getParsedBody();

        $result = $m->update($params);

        return $this->response->withJson($result, 200);
    });

})->add($mw);