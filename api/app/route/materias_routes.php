<?php

use App\Model\MateriasModel;

$app->group('/materia',function(){
    $this->get('/all',function($req, $res, $args){
        $m = new MateriasModel();

        $result = $m->getAll($args['id_malla']);
        return $this->response->withJson($result);
    });

    $this->get('/{id}',function($req, $res, $args){
        $m = new MateriasModel();

        $result = $m->get($args['id']);
        
        return $this->response->withJson($result);
    });

    $this->post('/add', function($req, $res){
        $m = new MateriasModel();

        $params = $req->getParsedBody();

        $result = $m->add($params);
        
        return $this->response->withJson($result);
    });

    $this->put('/update', function($req, $res){
        $m = new MateriasModel();

        $params = $req->getParsedBody();

        $result = $m->update($params);

        return $this->response->withJson($result, 200);
    });

})->add($mw);