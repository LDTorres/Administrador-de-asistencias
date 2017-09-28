<?php
// Application middleware
use Firebase\JWT\JWT;

require 'config.php';

$mw = function ($request, $response, $next) {

    $jwt = $request->getHeader('Auth');
    $data = JWT::decode($jwt, $key, array('HS256'));

    
    if(true):
        return $this->response->withJson(array("error"=>"acceso negado"));
    else:
        $newResponse = $response->withHeader('auth', var_dump($data));
        $response = $next($request, $newResponse);
        return $response;
    endif;
};

