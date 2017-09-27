-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-09-2017 a las 15:52:21
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
  `asistio` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `alumnos_has_asistencias`
--

INSERT INTO `alumnos_has_asistencias` (`id`, `id_seccion`, `id_usuario`, `fecha`, `asistio`) VALUES
(1, 1, 1, '2017-09-05', 1),
(2, 1, 1, '2017-09-21', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos_has_secciones`
--

CREATE TABLE `alumnos_has_secciones` (
  `id` int(11) NOT NULL,
  `id_usuario` int(20) DEFAULT NULL,
  `id_seccion` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `alumnos_has_secciones`
--

INSERT INTO `alumnos_has_secciones` (`id`, `id_usuario`, `id_seccion`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `app_config`
--

CREATE TABLE `app_config` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `version` varchar(45) DEFAULT NULL,
  `fecha_creaccion` datetime DEFAULT NULL,
  `descripcion` varchar(900) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignaturas`
--

CREATE TABLE `asignaturas` (
  `id_asignatura` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `trimestre` int(11) DEFAULT NULL,
  `id_malla` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `asignaturas`
--

INSERT INTO `asignaturas` (`id_asignatura`, `nombre`, `trimestre`, `id_malla`) VALUES
(1, 'Delincuencia', 1, 1);

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
  `nombre` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `malla_curricular`
--

INSERT INTO `malla_curricular` (`id_malla`, `nombre`) VALUES
(1, 'La vida');

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
  `nombre_archivo` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `publicaciones`
--

INSERT INTO `publicaciones` (`id_publicacion`, `titulo`, `descripcion`, `id_seccion`, `id_usuario`, `fecha_publicacion`, `nombre_archivo`) VALUES
(2, 'Mami', 'Hola', 1, 1, '2017-09-24 21:20:50', 'grabatar.jpg'),
(3, 'sdfds', 'ewrw', 2, 1, '2017-09-24 21:26:33', 'grabatar.jpg'),
(4, 'cxzv', 'jhj', 2, 1, '2017-09-24 21:30:59', 'grabatar.jpg'),
(5, 'hOLAsdfdsfdsf', 'Esta es una prueba', 1, 1, '2017-09-24 21:36:11', 'grabatar.jpg'),
(6, 'hOLAsdfdsfdsf', 'Esta es una prueba', 2, 1, '2017-09-24 21:36:25', 'grabatar.jpg'),
(7, 'hOLAsdfdsfdsf', 'Esta es una prueba', 1, 1, '2017-09-24 21:37:01', 'grabatar.jpg');

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
(1, 'INF-V-3N', 1, 'abcde', 1),
(2, '44', 1, 'sd', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `usuario` varchar(45) DEFAULT NULL,
  `contrasena` int(11) DEFAULT NULL,
  `nombre_completo` varchar(45) DEFAULT NULL,
  `cedula` int(11) DEFAULT NULL,
  `correo` varchar(45) DEFAULT NULL,
  `fecha_ingreso` datetime DEFAULT CURRENT_TIMESTAMP,
  `telefono` int(11) DEFAULT NULL,
  `foto_perfil` varchar(450) DEFAULT NULL,
  `id_malla` int(11) DEFAULT NULL,
  `estado` enum('0','1') DEFAULT '1',
  `tipo` enum('Estudiante','Administrador','Profesor') DEFAULT 'Estudiante'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `usuario`, `contrasena`, `nombre_completo`, `cedula`, `correo`, `fecha_ingreso`, `telefono`, `foto_perfil`, `id_malla`, `estado`, `tipo`) VALUES
(1, 'Admin', 1234, 'Admin Poderoso', 12345, 'admin@info.com', '2017-09-21 20:07:12', 12345, NULL, 1, '1', 'Administrador'),
(2, NULL, NULL, NULL, NULL, NULL, '2017-09-25 01:01:31', NULL, NULL, NULL, '1', 'Estudiante'),
(3, NULL, NULL, NULL, NULL, NULL, '2017-09-25 01:02:01', NULL, NULL, NULL, '1', 'Estudiante'),
(4, NULL, NULL, NULL, NULL, NULL, '2017-09-25 01:03:24', NULL, NULL, NULL, '1', 'Estudiante'),
(5, NULL, NULL, NULL, NULL, NULL, '2017-09-25 01:06:19', NULL, NULL, NULL, '1', 'Estudiante'),
(6, NULL, NULL, NULL, NULL, NULL, '2017-09-25 01:08:36', NULL, NULL, NULL, '1', 'Estudiante'),
(7, 'sadasdda', 32432432, 'asdsa', 3, 'd', '2017-09-25 01:10:09', 3, NULL, 1, '1', 'Estudiante'),
(10, 'sadasddauih', 32432432, 'asdsa', 3, 'dc', '2017-09-25 01:12:15', 3, NULL, 1, '1', 'Estudiante'),
(11, NULL, NULL, NULL, NULL, NULL, '2017-09-25 01:13:05', NULL, NULL, NULL, '1', 'Estudiante'),
(12, 'ygugu', 68, 'g', 7, 'g', '2017-09-25 01:17:01', 7, NULL, 1, '1', 'Estudiante'),
(13, NULL, NULL, NULL, NULL, NULL, '2017-09-26 10:52:16', NULL, NULL, NULL, '1', 'Estudiante'),
(14, NULL, NULL, NULL, NULL, NULL, '2017-09-26 10:54:00', NULL, NULL, NULL, '1', 'Estudiante');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `alumnos_has_secciones`
--
ALTER TABLE `alumnos_has_secciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `app_config`
--
ALTER TABLE `app_config`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `asignaturas`
--
ALTER TABLE `asignaturas`
  MODIFY `id_asignatura` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
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
  MODIFY `id_publicacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `secciones`
--
ALTER TABLE `secciones`
  MODIFY `id_seccion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
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
