-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-09-2024 a las 03:42:51
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `baimax`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alarmas_medicamentos`
--

CREATE TABLE `alarmas_medicamentos` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `dia` date NOT NULL,
  `hora` time NOT NULL,
  `minutos` int(11) NOT NULL,
  `medicamento` varchar(100) NOT NULL,
  `estado` enum('Pendiente','Sonada','Tomada') DEFAULT 'Pendiente',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_programada` datetime NOT NULL DEFAULT '1970-01-01 00:00:01'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alarmas_medicamentos`
--

INSERT INTO `alarmas_medicamentos` (`id`, `usuario_id`, `dia`, `hora`, `minutos`, `medicamento`, `estado`, `created_at`, `fecha_programada`) VALUES
(14, 1, '2024-09-15', '00:00:19', 39, 'acetaminofen', 'Sonada', '2024-09-16 00:38:17', '2024-09-15 19:39:00'),
(15, 1, '2024-09-15', '00:00:19', 37, 'loratadina', 'Sonada', '2024-09-16 00:38:48', '2024-09-15 19:37:00'),
(16, 1, '2024-09-15', '00:00:19', 40, 'loratadina', 'Sonada', '2024-09-16 00:39:31', '2024-09-15 19:40:00'),
(17, 1, '2024-09-15', '00:00:19', 48, 'acetaminofen', 'Sonada', '2024-09-16 00:48:00', '2024-09-15 19:48:00'),
(18, 12, '2024-09-16', '00:00:20', 37, 'aspirina', 'Sonada', '2024-09-17 01:36:57', '2024-09-16 20:37:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `enfermeros`
--

CREATE TABLE `enfermeros` (
  `id` int(11) NOT NULL,
  `nombre_completo` varchar(100) NOT NULL,
  `cedula` varchar(20) NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `genero` enum('masculino','femenino','otro') DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `usuario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `enfermeros`
--

INSERT INTO `enfermeros` (`id`, `nombre_completo`, `cedula`, `fecha_nacimiento`, `genero`, `telefono`, `created_at`, `usuario_id`) VALUES
(10, 'juan camilo vargas lloza', '1057986532', '2000-02-15', 'masculino', '3151670376', '2024-09-16 22:12:42', 1),
(11, 'Alexander Barros ', '103698721', '1995-10-18', 'masculino', '3310392817', '2024-09-17 01:31:01', 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados_humor`
--

CREATE TABLE `estados_humor` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `estado` enum('Muy Enojado','Triste','Neutral','Contento','Muy Feliz') NOT NULL,
  `observacion` text DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estados_humor`
--

INSERT INTO `estados_humor` (`id`, `usuario_id`, `estado`, `observacion`, `fecha_registro`) VALUES
(8, 1, 'Neutral', 'me siento triste', '2024-09-15 00:46:44'),
(9, 1, 'Neutral', 'me siento triste', '2024-09-15 00:46:44'),
(10, 1, 'Muy Enojado', 'enojado', '2024-09-15 01:15:21'),
(11, 1, 'Muy Feliz', 'feliz', '2024-09-15 02:08:12'),
(12, 1, 'Contento', 'el dia de hoy estuvo feliz', '2024-09-16 00:41:19'),
(13, 12, 'Muy Enojado', 'el paciente siente dolor en el pecho lo que provoca que este bravo todo el tiempo ', '2024-09-17 01:32:06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `observaciones`
--

CREATE TABLE `observaciones` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `texto` text NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `observaciones`
--

INSERT INTO `observaciones` (`id`, `usuario_id`, `texto`, `fecha`, `hora`, `created_at`) VALUES
(43, 1, 'wdw', '2024-09-17', '19:57:00', '2024-09-17 00:57:06'),
(44, 12, 'El tratamiento no esta dando resultados de seguir haci es posible el cambio de tratamiento', '2024-09-17', '20:35:00', '2024-09-17 01:35:51');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `gender` enum('Masculino','Femenino','Prefiero no decir') DEFAULT NULL,
  `cedula` varchar(20) NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `enfermedades` text DEFAULT NULL,
  `medicamentos` text DEFAULT NULL,
  `tratamiento` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `password`, `email`, `full_name`, `phone_number`, `gender`, `cedula`, `fecha_nacimiento`, `enfermedades`, `medicamentos`, `tratamiento`, `created_at`) VALUES
(1, 'andresfelipe', 'pipe321', 'andresfelipejimenezgonzales@gmail.com', 'Andres Felipe Jimenez', '3204558357', 'Masculino', '1033697339', '2006-05-18', 'renitis', 'loratadina', 'medicado', '2024-09-12 23:51:32'),
(2, 'Carmenza1986', 'carmenza1234', 'carmenza@gmail.com', 'Carmenza Gonzalez Santos', '3204558357', 'Femenino', '86670357', '1981-05-20', 'higado graso', 'aspirina', 'maquina', '2024-09-13 00:01:15'),
(3, 'sara2008', 'sra123', 'sara@gmail.com', 'sara gonzalez', '37567980', 'Femenino', '1487698543', '2006-06-21', 'sapo', 'acetaminofen', 'pastas', '2024-09-14 00:21:11'),
(4, 'juan2006', 'juan321', 'juan@gmail.com', 'juan', '3136340987', 'Masculino', '20398431', '2000-03-16', 'as', 'ass', 's', '2024-09-15 00:22:30'),
(12, 'Jhon1988', 'jhon9876?', 'jhon@gmail.com', 'Jhon Jimenez Erazo', '3143630640', 'Masculino', '80369598', '1970-02-17', 'Angina', 'Aspirina, Nitroglicerina, Betabloqueadores, Estatinas,', 'Cambios en el estilo de vida, como seguir una alimentación saludable y hacer actividad física', '2024-09-17 01:29:09');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alarmas_medicamentos`
--
ALTER TABLE `alarmas_medicamentos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_alarmas_dia_hora` (`dia`,`hora`),
  ADD KEY `idx_alarmas_usuario` (`usuario_id`);

--
-- Indices de la tabla `enfermeros`
--
ALTER TABLE `enfermeros`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cedula` (`cedula`),
  ADD KEY `idx_enfermero_cedula` (`cedula`),
  ADD KEY `idx_enfermero_usuario` (`usuario_id`);

--
-- Indices de la tabla `estados_humor`
--
ALTER TABLE `estados_humor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `idx_estado_humor_fecha` (`fecha_registro`);

--
-- Indices de la tabla `observaciones`
--
ALTER TABLE `observaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `idx_observaciones_fecha` (`fecha`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `cedula` (`cedula`),
  ADD KEY `idx_username` (`username`),
  ADD KEY `idx_cedula` (`cedula`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alarmas_medicamentos`
--
ALTER TABLE `alarmas_medicamentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `enfermeros`
--
ALTER TABLE `enfermeros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `estados_humor`
--
ALTER TABLE `estados_humor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `observaciones`
--
ALTER TABLE `observaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alarmas_medicamentos`
--
ALTER TABLE `alarmas_medicamentos`
  ADD CONSTRAINT `alarmas_medicamentos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `enfermeros`
--
ALTER TABLE `enfermeros`
  ADD CONSTRAINT `enfermeros_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `estados_humor`
--
ALTER TABLE `estados_humor`
  ADD CONSTRAINT `estados_humor_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `observaciones`
--
ALTER TABLE `observaciones`
  ADD CONSTRAINT `observaciones_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
