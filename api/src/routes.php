<?php
// USUARIOS

$app->get('/usuarios', function ($request, $response, $args) {
    $sth = $this->db->prepare("SELECT * FROM usuarios WHERE tipo = 'Estudiante' ORDER BY id_usuario");
    $sth->execute();
    $todos = $sth->fetchAll();
    return $this->response->withJson($todos);
});

$app->get('/usuario/[{id}]', function ($request, $response, $args) {
    $sth = $this->db->prepare("SELECT * FROM usuarios WHERE id_usuario=:id");
    $sth->bindParam("id", $args['id']);
    $sth->execute();
    $usuario = $sth->fetchObject();
    return $this->response->withJson($usuario);
 });

$app->post('/usuario/nuevo/', function ($request, $response) {

    $input = $request->getParsedBody();
    $sql = "INSERT INTO usuarios (usuario, contrasena, nombre_completo, cedula, correo, telefono, id_malla) VALUES (:usuario, :contrasena, :nombre_completo, :cedula, :correo, :telefono, :id_malla)";
    $sth = $this->db->prepare($sql);
    $sth->execute(array(
        ':usuario' => $input['usuario'], 
        ':contrasena' => $input['contrasena'], 
        ':nombre_completo' => $input['nombre_completo'],
        ':cedula' => $input['cedula'], 
        ':correo' => $input['correo'],
        ':telefono' => $input['telefono'],
        ':id_malla' => $input['id_malla']
    ));
    $input['id'] = $this->db->lastInsertId();

    return $this->response->withJson($input);
});

$app->get('/[{name}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");
    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});


