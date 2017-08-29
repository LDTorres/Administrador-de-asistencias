/* INGRESO */

$http.post('/usuario/ingresar');
$http.post('/usuario/salir');

/* Usuario */

$http.post('/usuario/registrar'); /* Registra un nuevo usuario puede ser tres tipos de usuario 'profesor' - 'alumno' - 'administrador' */
$http.get('/usuario/perfil'); /* Trae los datos de un usuario por su id */
$http.post('/usuario/modificar'); /* Trae los datos de un usuario por su id */
$http.get('/usuario/configuracion'); /* Trae los datos de un usuario por su id */
$http.get('/usuario/baja'); /* Darse de baja */
$http.get('/usuario/activar'); /* Activar */

/* ALUMNOS */

$http.get('/alumnos'); /* Lista todos los alumnos */
$http.get('/alumno'); /* Traer un alumno por su id y tipo de usuario 'alumno' */

/* PROFESORES */

$http.get('/profesores'); /* Lista todos los profesores */
$http.get('/profesor'); /* Traer un profesor por su id y tipo de usuario 'profesor' */

/* PNF / Malla */

$http.get('/pnf'); /* Lista Todos los PNF */
$http.post('/pnf/registrar'); /* Registra un nuevo PNF */
$http.post('/pnf/modificar'); /* Registra un nuevo PNF */

/* Materias */

$http.get('/pnf/materias'); /* Lista todas las materias */
$http.post('/pnf/materia/crear'); /* Crea una nueva materia */
$http.get('/pnf/materia/modificar'); /* Modifica el nombre de una materia */

/* Secciones */

$http.get('/secciones'); /* Lista todas las secciones */
$http.post('/seccion/crear'); /* Crea una nueva seccion */
$http.get('/seccion/modificar'); /* Modifica el nombre de una seccion */
$http.post('/seccion/nuevoAlumno'); /* Crea una nueva seccion */
$http.get('/seccion/alumno/sacar'); /* Saca un usuario de una seccion */

/* Base de datos */

$http.get('/bd/respaldar'); /* Cron Job (Respaldo) */
$http.get('/bd/restaurar'); 

/* App Config */

$http.post('/appInfo'); /* Modificar La informacion della Aplicacion */

