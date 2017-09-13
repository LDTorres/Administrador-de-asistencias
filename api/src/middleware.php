<?php
// Application middleware

$mw = function ($request, $response, $next) {
    if(!isset($_SESSION["usuario"])):
        return $this->response->withJson(array("error"=>"acceso negado"));
    else:
        $response = $next($request, $response);
        return $response;
    endif;
};

