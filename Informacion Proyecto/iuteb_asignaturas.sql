-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-12-2017 a las 23:53:52
-- Versión del servidor: 10.1.19-MariaDB
-- Versión de PHP: 7.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `iuteb_asignaturas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos_has_asistencias`
--

CREATE TABLE `alumnos_has_asistencias` (
  `id` int(11) NOT NULL,
  `id_seccion` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `asistio` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `alumnos_has_asistencias`
--

INSERT INTO `alumnos_has_asistencias` (`id`, `id_seccion`, `id_usuario`, `fecha`, `asistio`) VALUES
(1, 1, 2, '2017-11-23', 0),
(2, 1, 1, '2017-11-23', 1),
(3, 1, 2, '2017-11-24', 1),
(4, 1, 1, '2017-11-24', 1),
(5, 1, 5, '2017-11-24', 0),
(6, 1, 5, '2017-11-23', 1),
(7, 1, 2, '2017-11-16', 1),
(8, 1, 1, '2017-11-16', 1),
(9, 1, 5, '2017-11-16', 0),
(10, 2, 1, '2017-11-23', 0),
(11, 2, 2, '2017-11-23', 1),
(12, 2, 5, '2017-11-23', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos_has_secciones`
--

CREATE TABLE `alumnos_has_secciones` (
  `id` int(11) NOT NULL,
  `id_usuario` int(20) DEFAULT NULL,
  `id_seccion` int(20) DEFAULT NULL,
  `estado` int(11) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `alumnos_has_secciones`
--

INSERT INTO `alumnos_has_secciones` (`id`, `id_usuario`, `id_seccion`, `estado`) VALUES
(1, 2, 1, 1),
(2, 1, 1, 1),
(3, 5, 1, 1),
(4, 1, 2, 1),
(5, 2, 2, 1),
(6, 6, 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `app_config`
--

CREATE TABLE `app_config` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `versionApp` varchar(45) DEFAULT NULL,
  `fecha_creaccion` date DEFAULT NULL,
  `descripcion` varchar(900) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `app_config`
--

INSERT INTO `app_config` (`id`, `nombre`, `versionApp`, `fecha_creaccion`, `descripcion`) VALUES
(1, 'IUTEB GATE', 'v0.1', '2017-11-21', 'Administrador de Asistencias');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignaturas`
--

CREATE TABLE `asignaturas` (
  `id_asignatura` int(11) NOT NULL,
  `nombre_asig` varchar(45) DEFAULT NULL,
  `trimestre` int(11) DEFAULT NULL,
  `id_malla` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `asignaturas`
--

INSERT INTO `asignaturas` (`id_asignatura`, `nombre_asig`, `trimestre`, `id_malla`) VALUES
(1, 'Programacion', 1, 1),
(2, 'adrian', 1, 1),
(3, 'michel', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `basededatos`
--

CREATE TABLE `basededatos` (
  `id` int(11) NOT NULL,
  `filename` varchar(100) DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `malla_curricular`
--

CREATE TABLE `malla_curricular` (
  `id_malla` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `malla_curricular`
--

INSERT INTO `malla_curricular` (`id_malla`, `nombre`) VALUES
(1, 'Informatica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicaciones`
--

CREATE TABLE `publicaciones` (
  `id_publicacion` int(11) NOT NULL,
  `titulo` varchar(45) DEFAULT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `id_seccion` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `fecha_publicacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `nombre_archivo` varchar(100) DEFAULT 'grabatar.jpg'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `publicaciones`
--

INSERT INTO `publicaciones` (`id_publicacion`, `titulo`, `descripcion`, `id_seccion`, `id_usuario`, `fecha_publicacion`, `nombre_archivo`) VALUES
(1, 'Prueba pendiente', 'para el lunes', 1, 1, '2017-11-30 14:39:00', NULL),
(2, 'Mami', 'Hola', 1, 1, '2017-11-23 17:31:39', NULL),
(3, 'Publicacion de prueba 2', 'Esta es una prueba', 1, 1, '2017-11-26 08:56:45', 'grabatar.jpg'),
(4, 'Publicacion de prueba 2', 'Esta es una prueba', 1, 1, '2017-11-26 08:58:12', 'grabatar.jpg'),
(5, NULL, NULL, NULL, NULL, '2017-11-26 09:59:56', 'grabatar.jpg'),
(6, 'Hola', '1', 1, 1, '2017-11-26 10:08:37', 'grabatar.jpg'),
(7, 'Hoooola', 'dsasadasd', 1, 1, '2017-11-26 10:12:10', 'grabatar.jpg'),
(8, 'fdsf', 'sdfsdfds', 1, 1, '2017-11-26 10:13:29', 'grabatar.jpg'),
(9, 'dsfs', 'sdfsdf', 1, 1, '2017-11-26 10:16:49', 'grabatar.jpg'),
(10, 'dsdd', 'sdsdfdsfdsf', 1, 1, '2017-11-26 10:18:12', 'grabatar.jpg'),
(11, 'rrrrrrrrrrrrrrrr', 'rrrrrrrrrrrrrr', 1, 1, '2017-11-26 10:19:01', 'grabatar.jpg'),
(12, 'gg', 'ggggg', 1, 1, '2017-11-26 10:21:05', 'grabatar.jpg'),
(13, 'ff', 'fffff', 1, 1, '2017-11-26 10:22:54', 'grabatar.jpg'),
(14, 'referfreferfrefref', 'freferfer', 1, 1, '2017-11-26 10:32:54', 'grabatar.jpg'),
(15, 'GG', 'GG', 2, 1, '2017-11-26 10:35:14', 'grabatar.jpg'),
(16, 'HHH', 'GGGGG', 2, 1, '2017-11-26 15:45:16', 'grabatar.jpg'),
(17, 'ddsdsdsds', 'sd', 1, 1, '2017-11-26 15:52:22', 'grabatar.jpg'),
(18, 'Prueba pendiente', 'para el lunes', 1, 1, '2017-11-30 14:39:00', NULL),
(19, 'Prueba pendiente', 'para el lunes', 1, 1, '2017-11-30 14:39:00', NULL),
(20, 'Prueba pendiente', 'para el lunes', 1, 1, '2017-11-23 14:39:00', NULL),
(22, 'aaaaaaaaaaaaa', '33', 1, 1, '2017-11-26 22:11:29', 'grabatar.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reportes`
--

CREATE TABLE `reportes` (
  `id_reporte` int(11) NOT NULL,
  `nombre_reporte` varchar(450) NOT NULL,
  `desde` date NOT NULL,
  `hasta` date NOT NULL,
  `id_usuario` int(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `reportes`
--

INSERT INTO `reportes` (`id_reporte`, `nombre_reporte`, `desde`, `hasta`, `id_usuario`) VALUES
(2, 'A-01-12-2017-18-26-13-reporte-asistencias.pdf', '2017-11-16', '2017-11-29', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `secciones`
--

CREATE TABLE `secciones` (
  `id_seccion` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `id_asignatura` int(11) DEFAULT NULL,
  `codigo` varchar(45) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `secciones`
--

INSERT INTO `secciones` (`id_seccion`, `nombre`, `id_asignatura`, `codigo`, `id_usuario`) VALUES
(1, 'INF-T4', 1, '29365d69', 1),
(2, 'GG', 2, '8108eb4d', 1),
(3, 'nueva', 1, '1987256f', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `usuario` varchar(45) DEFAULT NULL,
  `contrasena` varchar(50) DEFAULT NULL,
  `nombre_completo` varchar(45) DEFAULT NULL,
  `cedula` int(11) DEFAULT NULL,
  `correo` varchar(45) DEFAULT NULL,
  `fecha_ingreso` datetime DEFAULT CURRENT_TIMESTAMP,
  `telefono` int(11) DEFAULT NULL,
  `id_malla` int(11) DEFAULT NULL,
  `estado` enum('0','1') DEFAULT '1',
  `tipo` enum('Estudiante','Administrador','Profesor') DEFAULT 'Estudiante',
  `color_ui` varchar(40) DEFAULT 'positive',
  `gravatar` varchar(450) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `usuario`, `contrasena`, `nombre_completo`, `cedula`, `correo`, `fecha_ingreso`, `telefono`, `id_malla`, `estado`, `tipo`, `color_ui`, `gravatar`) VALUES
(1, 'Administrador', '1', 'Iuteb Gate', 0, 'iutebgate@gmail.com', '0000-00-00 00:00:00', 2147483647, 1, '1', 'Administrador', 'positive', 'hombre'),
(2, 'prueba', '12345', 'hola', 12345, 'prueba@gmail.com', '2017-11-23 14:33:13', 12345, 1, '1', 'Profesor', 'positive', 'hombre'),
(3, 'eudo', '1', 'Prueba Usuario', 67, 'hedfsfl@gmail.com', '2017-11-26 10:28:26', 3455333, 1, '1', 'Estudiante', 'positive', 'hombre'),
(4, 'Luisa', '1', 'dsdfsdf', 1, 'd@g.c', '2017-11-26 10:28:27', 2, 1, '1', 'Estudiante', 'positive', 'hombre'),
(5, 'Luisadd', '1', 'dsdfsdfsss', 112, 'd@g.cs', '2017-11-26 10:29:30', 2, 1, '1', 'Estudiante', 'energized', 'hombre'),
(6, 'Buajaja', '1', 'dsd', 23132, 'luisdtcw@g.c', '2017-11-26 11:36:31', 1231, 1, '1', 'Estudiante', 'positive', 'hombre'),
(7, 'Juan Manuel', '12345', 'Juan', 27367873, 'juan@gmail.com', '2017-11-29 11:01:43', 123456789, 1, '1', 'Estudiante', 'positive', 'mujer.'),
(9, 'Adiran', '123', 'adrian', 123, 'adrian.fl1991@gmail.com', '2017-11-29 11:48:07', 123, 1, '1', 'Estudiante', 'positive', 'hombre'),
(10, 'dsfhsiu', '343343', 'dsoifsoi', 21321, 'dsf@.c', '2017-11-29 12:39:57', 213213, 1, '1', 'Estudiante', 'positive', 'hombre');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos_has_asistencias`
--
ALTER TABLE `alumnos_has_asistencias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `a_has_id_usuarios_idx` (`id_usuario`),
  ADD KEY `a_has_id_seccion_idx` (`id_seccion`);

--
-- Indices de la tabla `alumnos_has_secciones`
--
ALTER TABLE `alumnos_has_secciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `al_has_id_usuario_idx` (`id_usuario`),
  ADD KEY `al_has_s_id_seccion_idx` (`id_seccion`);

--
-- Indices de la tabla `app_config`
--
ALTER TABLE `app_config`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `asignaturas`
--
ALTER TABLE `asignaturas`
  ADD PRIMARY KEY (`id_asignatura`),
  ADD KEY `m_id_malla_idx` (`id_malla`);

--
-- Indices de la tabla `basededatos`
--
ALTER TABLE `basededatos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `filename_UNIQUE` (`filename`);

--
-- Indices de la tabla `malla_curricular`
--
ALTER TABLE `malla_curricular`
  ADD PRIMARY KEY (`id_malla`);

--
-- Indices de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD PRIMARY KEY (`id_publicacion`),
  ADD KEY `p_id_usuario_idx` (`id_usuario`),
  ADD KEY `p_id_seccion_idx` (`id_seccion`);

--
-- Indices de la tabla `reportes`
--
ALTER TABLE `reportes`
  ADD PRIMARY KEY (`id_reporte`);

--
-- Indices de la tabla `secciones`
--
ALTER TABLE `secciones`
  ADD PRIMARY KEY (`id_seccion`),
  ADD KEY `s_id_materia_idx` (`id_asignatura`),
  ADD KEY `s_id_usuario_idx` (`id_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `correo_UNIQUE` (`correo`),
  ADD UNIQUE KEY `usuario_UNIQUE` (`usuario`),
  ADD KEY `user_id_malla_idx` (`id_malla`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alumnos_has_asistencias`
--
ALTER TABLE `alumnos_has_asistencias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT de la tabla `alumnos_has_secciones`
--
ALTER TABLE `alumnos_has_secciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `app_config`
--
ALTER TABLE `app_config`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `asignaturas`
--
ALTER TABLE `asignaturas`
  MODIFY `id_asignatura` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `basededatos`
--
ALTER TABLE `basededatos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `malla_curricular`
--
ALTER TABLE `malla_curricular`
  MODIFY `id_malla` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  MODIFY `id_publicacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT de la tabla `reportes`
--
ALTER TABLE `reportes`
  MODIFY `id_reporte` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `secciones`
--
ALTER TABLE `secciones`
  MODIFY `id_seccion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alumnos_has_asistencias`
--
ALTER TABLE `alumnos_has_asistencias`
  ADD CONSTRAINT `a_has_id_seccion` FOREIGN KEY (`id_seccion`) REFERENCES `secciones` (`id_seccion`),
  ADD CONSTRAINT `a_has_id_usuarios` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `alumnos_has_secciones`
--
ALTER TABLE `alumnos_has_secciones`
  ADD CONSTRAINT `al_has_s_id_seccion` FOREIGN KEY (`id_seccion`) REFERENCES `secciones` (`id_seccion`) ON UPDATE CASCADE,
  ADD CONSTRAINT `al_has_s_id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `asignaturas`
--
ALTER TABLE `asignaturas`
  ADD CONSTRAINT `m_id_malla` FOREIGN KEY (`id_malla`) REFERENCES `malla_curricular` (`id_malla`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD CONSTRAINT `p_id_seccion` FOREIGN KEY (`id_seccion`) REFERENCES `secciones` (`id_seccion`) ON UPDATE CASCADE,
  ADD CONSTRAINT `p_id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `secciones`
--
ALTER TABLE `secciones`
  ADD CONSTRAINT `s_id_asignatura` FOREIGN KEY (`id_asignatura`) REFERENCES `asignaturas` (`id_asignatura`) ON UPDATE CASCADE,
  ADD CONSTRAINT `s_id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `user_id_malla` FOREIGN KEY (`id_malla`) REFERENCES `malla_curricular` (`id_malla`) ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
