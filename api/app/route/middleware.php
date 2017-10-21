<?php
// Application middleware

use App\Model\UserModel;

$um = new UserModel();

$mw = function ($request, $response, $next) {

    $jwt = $request->getHeader('auth');
    if(isset($jwt[0]) != NULL){
        $data = $GLOBALS['um']->Check($jwt[0]);
        if($data == 'Token Vacio' || $data == 'Token Expirado' || $data == 'Aud Invalido'):
            return $this->response->withJson($data, 401);
        else:
            $newResponse = $response->withHeader('auth', $data);
            $response = $next($request, $newResponse); 
            return $response;
        endif;
    }else{
        return $this->response->withJson(array('msg'=>'Cabecera Auth no Enviada'), 401);
    }
};

