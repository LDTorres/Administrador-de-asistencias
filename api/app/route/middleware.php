<?php
// Application middleware

use App\Model\UserModel;

$um = new UserModel();

$mw = function ($request, $response, $next) {

    $jwt = $request->getHeader('auth');
    $data = $GLOBALS['um']->Check($jwt[0]);

    if($data == 'Token Vacio' || $data == 'Token Expirado' || $data == 'Aud Invalido'):
        return $this->response->withJson($data, 401);
    else:
        $newResponse = $response->withHeader('auth', $data);
        $response = $next($request, $newResponse);
        return $response;
    endif;
};

