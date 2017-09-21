<?php
// Application middleware

$mw = function ($request, $response, $next) {
    if(!isset($_SESSION["usuario"])):
        return $this->response->withJson(array("error"=>"acceso negado"));
    else:
        $newResponse = $response->withHeader('auth', $_SESSION['usuario']);
        $response = $next($request, $newResponse);
        return $response;
    endif;
};

