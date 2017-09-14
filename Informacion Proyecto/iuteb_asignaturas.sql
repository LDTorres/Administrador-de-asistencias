-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-09-2017 a las 16:53:25
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
  `fecha` datetime DEFAULT NULL,
  `asistio` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos_has_secciones`
--

CREATE TABLE `alumnos_has_secciones` (
  `id` int(11) NOT NULL,
  `id_usuario` int(20) DEFAULT NULL,
  `id_seccion` int(20) DEFAULT NULL,
  `estado` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
-- Estructura de tabla para la tabla `asistencias`
--

CREATE TABLE `asistencias` (
  `id_asistencia` int(11) NOT NULL,
  `id_seccion` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `basededatos`
--

CREATE TABLE `basededatos` (
  `id` int(11) NOT NULL,
  `fecha` varchar(45) DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL
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
(1, 'Infortrolica'),
(2, 'Electricidad');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materias`
--

CREATE TABLE `materias` (
  `id_materia` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `trimestre` int(11) DEFAULT NULL,
  `id_malla` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `materias`
--

INSERT INTO `materias` (`id_materia`, `nombre`, `trimestre`, `id_malla`) VALUES
(1, 'Bulala', 1, 1),
(2, 'Formacion Critica', 2, 1);

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
  `nombre_archivo` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `publicaciones`
--

INSERT INTO `publicaciones` (`id_publicacion`, `titulo`, `descripcion`, `id_seccion`, `id_usuario`, `fecha_publicacion`, `nombre_archivo`) VALUES
(1, 'Hola', 'adasd', 1, 3, '2017-09-12 23:10:57', 'NULL'),
(2, 'Holadgff', 'adasdgggggggggggg', 1, 14, '2017-09-12 23:10:57', 'NULL'),
(4, 'Hola', 'Papi', 1, 4, '2017-09-12 23:50:50', NULL),
(5, 'Hola', 'Papi', 1, 4, '2017-09-12 23:52:18', NULL),
(6, 'Hola', 'Papi', 1, 4, '2017-09-12 23:52:43', NULL),
(7, 'Hola', 'Papi', 1, 4, '2017-09-12 23:53:45', NULL),
(8, 'Hola', 'Papi', 1, 4, '2017-09-12 23:54:30', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `secciones`
--

CREATE TABLE `secciones` (
  `id_seccion` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `id_materia` int(11) DEFAULT NULL,
  `codigo` varchar(45) DEFAULT NULL,
  `id_usuario` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `secciones`
--

INSERT INTO `secciones` (`id_seccion`, `nombre`, `id_materia`, `codigo`, `id_usuario`) VALUES
(1, '4n-jajaja', 1, 'e627d4c6c8056f563315ccfff2c70ea1', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `usuario` varchar(45) DEFAULT NULL,
  `contrasena` int(20) DEFAULT NULL,
  `nombre_completo` varchar(45) DEFAULT NULL,
  `cedula` int(30) DEFAULT NULL,
  `correo` varchar(45) DEFAULT NULL,
  `fecha_ingreso` datetime DEFAULT CURRENT_TIMESTAMP,
  `telefono` bigint(50) DEFAULT NULL,
  `foto_perfil` varchar(450) DEFAULT 'gravatar.png',
  `id_malla` int(11) DEFAULT NULL,
  `estado` enum('0','1') DEFAULT '1',
  `tipo` enum('Administrador','Estudiante','Profesor') DEFAULT 'Estudiante',
  `token` int(64) NOT NULL,
  `expiracion_token` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `usuario`, `contrasena`, `nombre_completo`, `cedula`, `correo`, `fecha_ingreso`, `telefono`, `foto_perfil`, `id_malla`, `estado`, `tipo`, `token`, `expiracion_token`) VALUES
(3, 'Luis', 123456789, 'Luis Daniel Torres', 25659843, 'luisdtc2696@gmail.com', '2017-09-08 14:00:00', 4128594981, NULL, 1, '0', 'Administrador', 0, '0000-00-00 00:00:00'),
(4, 'Hola', NULL, 'Vanessa', NULL, NULL, NULL, NULL, '7765755377f0c13f.jpg', NULL, '1', 'Estudiante', 0, '0000-00-00 00:00:00'),
(5, 'Papi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Administrador', 0, '0000-00-00 00:00:00'),
(6, 'Array', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Profesor', 0, '0000-00-00 00:00:00'),
(9, 'holDSFDSFa', 123, 'dasd', 324, 'asd', '2017-09-08 15:54:00', 23432, NULL, 1, NULL, 'Profesor', 0, '0000-00-00 00:00:00'),
(10, NULL, NULL, NULL, NULL, NULL, '2017-09-08 16:00:45', NULL, NULL, NULL, NULL, 'Profesor', 0, '0000-00-00 00:00:00'),
(11, NULL, NULL, NULL, NULL, NULL, '2017-09-08 16:02:02', NULL, NULL, NULL, NULL, 'Estudiante', 0, '0000-00-00 00:00:00'),
(12, 'Papissdfdsf', 12345678, 'Amen', 25659843, 'AdsdDAS@GMAIL.COM', '2017-09-08 16:04:45', 4128594981, 'NULL', 1, '1', 'Estudiante', 0, '0000-00-00 00:00:00'),
(13, 'Papissdfdsfsdfdsfdsf', 12345678, 'Amen', 25659843, 'AdsdsdfdsfDAS@GMAIL.COM', '2017-09-08 16:08:23', 4128594981, 'NULL', 1, '1', 'Estudiante', 0, '0000-00-00 00:00:00'),
(14, 'Vanessa Yamalidd', 12345, 'Juanes', 23532524, 'sadasd', '2017-09-11 15:53:15', 2343242, 'gravatar.png', 1, '1', 'Estudiante', 0, '2017-09-11 22:53:15'),
(16, 'Vanessa Yamaliddsada', 12345, 'Juanesasdasd', 23532524, 'sadasdsadasd', '2017-09-11 15:54:04', 2343242, 'gravatar.png', 1, '1', 'Estudiante', 0, '2017-09-11 22:54:04');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos_has_asistencias`
--
ALTER TABLE `alumnos_has_asistencias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `aha_usuarios_idUsuario_idx` (`id_usuario`),
  ADD KEY `aha_secciones_idSeccion_idx` (`id_seccion`);

--
-- Indices de la tabla `alumnos_has_secciones`
--
ALTER TABLE `alumnos_has_secciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ahs_usuario_idUsuario_idx` (`id_usuario`),
  ADD KEY `ahs_secciones_idSeccion_idx` (`id_seccion`);

--
-- Indices de la tabla `app_config`
--
ALTER TABLE `app_config`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `asistencias`
--
ALTER TABLE `asistencias`
  ADD PRIMARY KEY (`id_asistencia`),
  ADD KEY `a_secciones_idSeccion_idx` (`id_seccion`),
  ADD KEY `a_usuarios_idUsuario_idx` (`id_usuario`);

--
-- Indices de la tabla `basededatos`
--
ALTER TABLE `basededatos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `malla_curricular`
--
ALTER TABLE `malla_curricular`
  ADD PRIMARY KEY (`id_malla`);

--
-- Indices de la tabla `materias`
--
ALTER TABLE `materias`
  ADD PRIMARY KEY (`id_materia`),
  ADD KEY `m_malla_idMalla_idx` (`id_malla`);

--
-- Indices de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD PRIMARY KEY (`id_publicacion`),
  ADD KEY `p_secciones_idSeccion_idx` (`id_seccion`),
  ADD KEY `p_usuario_idUsuario_idx` (`id_usuario`);

--
-- Indices de la tabla `secciones`
--
ALTER TABLE `secciones`
  ADD PRIMARY KEY (`id_seccion`),
  ADD KEY `materia_idMateria_idx` (`id_materia`),
  ADD KEY `Sec_usuario_idUsuario_idx` (`id_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `correo_UNIQUE` (`correo`),
  ADD UNIQUE KEY `usuario_UNIQUE` (`usuario`),
  ADD KEY `malla_idMalla_idx` (`id_malla`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alumnos_has_asistencias`
--
ALTER TABLE `alumnos_has_asistencias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `alumnos_has_secciones`
--
ALTER TABLE `alumnos_has_secciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `app_config`
--
ALTER TABLE `app_config`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `asistencias`
--
ALTER TABLE `asistencias`
  MODIFY `id_asistencia` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `basededatos`
--
ALTER TABLE `basededatos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `malla_curricular`
--
ALTER TABLE `malla_curricular`
  MODIFY `id_malla` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `materias`
--
ALTER TABLE `materias`
  MODIFY `id_materia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  MODIFY `id_publicacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `secciones`
--
ALTER TABLE `secciones`
  MODIFY `id_seccion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `materias`
--
ALTER TABLE `materias`
  ADD CONSTRAINT `m_malla_idMalla` FOREIGN KEY (`id_malla`) REFERENCES `malla_curricular` (`id_malla`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD CONSTRAINT `p_secciones_idSeccion` FOREIGN KEY (`id_seccion`) REFERENCES `secciones` (`id_seccion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `p_usuario_idUsuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `secciones`
--
ALTER TABLE `secciones`
  ADD CONSTRAINT `Sec_usuario_idUsuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `materia_idMateria` FOREIGN KEY (`id_materia`) REFERENCES `materias` (`id_materia`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `malla_idMalla` FOREIGN KEY (`id_malla`) REFERENCES `malla_curricular` (`id_malla`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
