/*
SQLyog Ultimate v13.1.1 (64 bit)
MySQL - 10.4.32-MariaDB : Database - senalearn
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`senalearn` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `senalearn`;

/*Table structure for table `categorias` */

DROP TABLE IF EXISTS `categorias`;

CREATE TABLE `categorias` (
  `Id_Cat` varchar(100) NOT NULL,
  `Nom_Cat` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id_Cat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `categorias` */

insert  into `categorias`(`Id_Cat`,`Nom_Cat`) values 
('1','sistemas'),
('2','confección'),
('3','Automotriz'),
('5','Gestión');

/*Table structure for table `certificados` */

DROP TABLE IF EXISTS `certificados`;

CREATE TABLE `certificados` (
  `Tit_Cert` varchar(255) DEFAULT NULL,
  `Descp_Cert` varchar(255) DEFAULT NULL,
  `Fec_Crea_Cert` date DEFAULT NULL,
  `Firm_Dig_Cert` blob DEFAULT NULL,
  `Id_User_FK` varchar(100) NOT NULL,
  `Id_Cur_FK` varchar(100) NOT NULL,
  PRIMARY KEY (`Id_User_FK`,`Id_Cur_FK`),
  KEY `Id_Cur_FK` (`Id_Cur_FK`),
  CONSTRAINT `certificados_ibfk_2` FOREIGN KEY (`Id_Cur_FK`) REFERENCES `cursos` (`Id_Cur`),
  CONSTRAINT `certificados_ibfk_3` FOREIGN KEY (`Id_User_FK`) REFERENCES `usuarios` (`Id_User`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `certificados` */

/*Table structure for table `comentarios` */

DROP TABLE IF EXISTS `comentarios`;

CREATE TABLE `comentarios` (
  `Id_Com` int(255) NOT NULL,
  `Id_User_FK` varchar(100) DEFAULT NULL,
  `Id_Cursos_FK` varchar(100) DEFAULT NULL,
  `Fecha_Pub_Com` date DEFAULT NULL,
  `Desc_Comentario` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id_Com`),
  KEY `Id_User_FK` (`Id_User_FK`),
  KEY `Id_Cursos_FK` (`Id_Cursos_FK`),
  CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`Id_Cursos_FK`) REFERENCES `cursos` (`Id_Cur`),
  CONSTRAINT `comentarios_ibfk_3` FOREIGN KEY (`Id_User_FK`) REFERENCES `usuarios` (`Id_User`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `comentarios` */

/*Table structure for table `contenido_modulo` */

DROP TABLE IF EXISTS `contenido_modulo`;

CREATE TABLE `contenido_modulo` (
  `Id_Cont` varchar(100) NOT NULL,
  `Tip_Cont` int(50) DEFAULT NULL COMMENT '1:audio, 2:video, 3: texto, 4:documento',
  `Url_Cont` varchar(255) DEFAULT NULL,
  `Tit_Cont` varchar(255) DEFAULT NULL,
  `Id_Mod_FK` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id_Cont`),
  KEY `Id_Mod_FK` (`Id_Mod_FK`),
  CONSTRAINT `contenido_modulo_ibfk_1` FOREIGN KEY (`Id_Mod_FK`) REFERENCES `modulocurso` (`Id_Mod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `contenido_modulo` */

/*Table structure for table `cursos` */

DROP TABLE IF EXISTS `cursos`;

CREATE TABLE `cursos` (
  `Id_Cur` varchar(100) NOT NULL,
  `Nom_Cur` varchar(255) DEFAULT NULL,
  `Des_Cur` varchar(255) DEFAULT NULL,
  `Hor_Cont_Total` int(11) DEFAULT NULL,
  `Fech_Crea_Cur` date DEFAULT NULL,
  `Id_Cat_FK` varchar(100) DEFAULT NULL,
  `Id_Instr_FK` varchar(100) DEFAULT NULL,
  `Fot_Cur` varchar(200) DEFAULT NULL,
  `Est_Cur` int(1) DEFAULT NULL COMMENT '1:CREADO, 2: PUBLICADO, 3:ELIMINADO',
  PRIMARY KEY (`Id_Cur`),
  KEY `Id_Cat_FK` (`Id_Cat_FK`),
  KEY `Id_Instr_FK` (`Id_Instr_FK`),
  CONSTRAINT `cursos_ibfk_1` FOREIGN KEY (`Id_Cat_FK`) REFERENCES `categorias` (`Id_Cat`),
  CONSTRAINT `cursos_ibfk_2` FOREIGN KEY (`Id_Instr_FK`) REFERENCES `instructores` (`INST_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `cursos` */

/*Table structure for table `evaluacion` */

DROP TABLE IF EXISTS `evaluacion`;

CREATE TABLE `evaluacion` (
  `Id_Eva` int(11) NOT NULL,
  `Tit_Eva` varchar(255) DEFAULT NULL,
  `Des_Eva` varchar(255) DEFAULT NULL,
  `Fec_Crea` date DEFAULT NULL,
  `Fec_Cer` date DEFAULT NULL,
  `Id_Mod_Cur_FK` varchar(100) DEFAULT NULL,
  `Not_Min_Apr_Eva` decimal(5,2) DEFAULT NULL,
  `Estado_Eval` varchar(50) DEFAULT NULL,
  `Intentos_Eval` int(11) DEFAULT NULL,
  `Tipo_Eval` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id_Eva`),
  KEY `Id_Mod_Cur_FK` (`Id_Mod_Cur_FK`),
  CONSTRAINT `evaluacion_ibfk_1` FOREIGN KEY (`Id_Mod_Cur_FK`) REFERENCES `modulocurso` (`Id_Mod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `evaluacion` */

/*Table structure for table `inscripciones` */

DROP TABLE IF EXISTS `inscripciones`;

CREATE TABLE `inscripciones` (
  `Id_User_FK` varchar(100) NOT NULL,
  `Id_Cur_FK` varchar(100) NOT NULL,
  `Prog_Cur` varchar(50) DEFAULT NULL,
  `fecha_insc` date DEFAULT NULL,
  PRIMARY KEY (`Id_User_FK`,`Id_Cur_FK`),
  KEY `Id_Cur_FK` (`Id_Cur_FK`),
  CONSTRAINT `inscripciones_ibfk_2` FOREIGN KEY (`Id_Cur_FK`) REFERENCES `cursos` (`Id_Cur`),
  CONSTRAINT `inscripciones_ibfk_3` FOREIGN KEY (`Id_User_FK`) REFERENCES `usuarios` (`Id_User`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `inscripciones` */

/*Table structure for table `instructores` */

DROP TABLE IF EXISTS `instructores`;

CREATE TABLE `instructores` (
  `INST_ID` varchar(100) NOT NULL,
  `INST_NOMBRE` varchar(100) NOT NULL,
  `INST_ESPE` varchar(100) DEFAULT NULL,
  `INST_EMAIL` varchar(100) DEFAULT NULL,
  `INST_TEL` varchar(20) DEFAULT NULL,
  `INST_EST` char(1) DEFAULT NULL,
  `INST_FECHA_CONTR` date DEFAULT NULL,
  PRIMARY KEY (`INST_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `instructores` */

/*Table structure for table `localizacion` */

DROP TABLE IF EXISTS `localizacion`;

CREATE TABLE `localizacion` (
  `Id_Loc` int(11) NOT NULL AUTO_INCREMENT,
  `Dir_Ip` varchar(255) DEFAULT NULL,
  `Id_User_FK` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id_Loc`),
  KEY `Id_User_FK` (`Id_User_FK`),
  CONSTRAINT `localizacion_ibfk_1` FOREIGN KEY (`Id_User_FK`) REFERENCES `usuarios` (`Id_User`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `localizacion` */

insert  into `localizacion`(`Id_Loc`,`Dir_Ip`,`Id_User_FK`) values 
(44,'198','6ss84glti5k595'),
(45,'198','6ss94ltjkiq8y'),
(46,'198','6sscdgltz31bbg');

/*Table structure for table `modulocurso` */

DROP TABLE IF EXISTS `modulocurso`;

CREATE TABLE `modulocurso` (
  `Id_Mod` varchar(100) NOT NULL,
  `Tit_Mod` varchar(255) DEFAULT NULL,
  `Est_Mod` int(1) DEFAULT NULL COMMENT '0: creado, 1:activo, 2: bloqueado',
  `Id_Cur_FK` varchar(100) DEFAULT NULL,
  `Horas_Cont_Mod` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id_Mod`),
  KEY `Id_Cur_FK` (`Id_Cur_FK`),
  CONSTRAINT `modulocurso_ibfk_1` FOREIGN KEY (`Id_Cur_FK`) REFERENCES `cursos` (`Id_Cur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `modulocurso` */

/*Table structure for table `objetivos_cursos` */

DROP TABLE IF EXISTS `objetivos_cursos`;

CREATE TABLE `objetivos_cursos` (
  `Id_Objetivo` varchar(100) NOT NULL,
  `Desc_Objetivo` varchar(255) DEFAULT NULL,
  `Id_Cur_FK` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id_Objetivo`),
  KEY `Id_Cur_FK` (`Id_Cur_FK`),
  CONSTRAINT `objetivos_cursos_ibfk_1` FOREIGN KEY (`Id_Cur_FK`) REFERENCES `cursos` (`Id_Cur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `objetivos_cursos` */

/*Table structure for table `opciones` */

DROP TABLE IF EXISTS `opciones`;

CREATE TABLE `opciones` (
  `id_opcion` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_opcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_opcion`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `opciones` */

/*Table structure for table `preguntaseval` */

DROP TABLE IF EXISTS `preguntaseval`;

CREATE TABLE `preguntaseval` (
  `Id_Preg_Eval` int(11) NOT NULL,
  `Text_Preg_Eval` varchar(255) DEFAULT NULL,
  `Id_Eval_FK` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id_Preg_Eval`),
  KEY `Id_Eval_FK` (`Id_Eval_FK`),
  CONSTRAINT `preguntaseval_ibfk_1` FOREIGN KEY (`Id_Eval_FK`) REFERENCES `evaluacion` (`Id_Eva`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `preguntaseval` */

/*Table structure for table `respuestaseval` */

DROP TABLE IF EXISTS `respuestaseval`;

CREATE TABLE `respuestaseval` (
  `Id_Res_Eval` int(11) NOT NULL,
  `Text_Resp_Eval` varchar(255) DEFAULT NULL,
  `Resp_Correcta_Eval` tinyint(1) DEFAULT NULL,
  `Id_Preg_Eval_FK` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id_Res_Eval`),
  KEY `Id_Preg_Eval_FK` (`Id_Preg_Eval_FK`),
  CONSTRAINT `respuestaseval_ibfk_1` FOREIGN KEY (`Id_Preg_Eval_FK`) REFERENCES `preguntaseval` (`Id_Preg_Eval`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `respuestaseval` */

/*Table structure for table `resultados_evaluacion` */

DROP TABLE IF EXISTS `resultados_evaluacion`;

CREATE TABLE `resultados_evaluacion` (
  `Id_Res_Eval` int(11) NOT NULL,
  `Id_Eval_FK` int(11) DEFAULT NULL,
  `Id_User_FK` varchar(100) DEFAULT NULL,
  `Puntuacion` decimal(5,2) DEFAULT NULL,
  `Fech_Real_Eval` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Res_Eval`),
  KEY `Id_Eval_FK` (`Id_Eval_FK`),
  KEY `Id_User_FK` (`Id_User_FK`),
  CONSTRAINT `resultados_evaluacion_ibfk_1` FOREIGN KEY (`Id_Eval_FK`) REFERENCES `evaluacion` (`Id_Eva`),
  CONSTRAINT `resultados_evaluacion_ibfk_2` FOREIGN KEY (`Id_User_FK`) REFERENCES `usuarios` (`Id_User`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `resultados_evaluacion` */

/*Table structure for table `roles` */

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `Id_Rol` int(11) NOT NULL AUTO_INCREMENT,
  `Nom_Rol` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id_Rol`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `roles` */

insert  into `roles`(`Id_Rol`,`Nom_Rol`) values 
(1,'ESTUDIANTE'),
(2,'ADMIN'),
(3,'INSTRUCTOR'),
(6,'VOCERO');

/*Table structure for table `roles_opciones` */

DROP TABLE IF EXISTS `roles_opciones`;

CREATE TABLE `roles_opciones` (
  `Id_Rol_fk` int(11) NOT NULL,
  `id_opcion_fk` int(11) NOT NULL,
  PRIMARY KEY (`Id_Rol_fk`,`id_opcion_fk`),
  KEY `id_opcion_fk` (`id_opcion_fk`),
  CONSTRAINT `roles_opciones_ibfk_2` FOREIGN KEY (`id_opcion_fk`) REFERENCES `opciones` (`id_opcion`),
  CONSTRAINT `roles_opciones_ibfk_3` FOREIGN KEY (`Id_Rol_fk`) REFERENCES `roles` (`Id_Rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `roles_opciones` */

/*Table structure for table `tokens` */

DROP TABLE IF EXISTS `tokens`;

CREATE TABLE `tokens` (
  `Id_Token` int(11) NOT NULL AUTO_INCREMENT,
  `Token` varchar(255) DEFAULT NULL,
  `Fec_Caducidad` varchar(100) DEFAULT NULL,
  `User_Id_FK` varchar(100) DEFAULT NULL,
  `Tipo_token` char(1) DEFAULT NULL COMMENT '1: inicio Sesion, 2: verificacion Email, 3: recuperacion de contraseña, 4: Verificar IP',
  PRIMARY KEY (`Id_Token`),
  KEY `Usuario_Id` (`User_Id_FK`),
  CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`User_Id_FK`) REFERENCES `usuarios` (`Id_User`)
) ENGINE=InnoDB AUTO_INCREMENT=366 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `tokens` */

insert  into `tokens`(`Id_Token`,`Token`,`Fec_Caducidad`,`User_Id_FK`,`Tipo_token`) values 
(303,'472113','1709872462','6ss84glti5k595','2'),
(304,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M4NGdsdGk1azU5NSIsIkVtYV9Vc2VyIjoic3RldmVuMDgxMG1pZ3VlbEBvdXRsb29rLmVzIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzA5ODcxOTIxLCJleHAiOjE3MDk4ODYzMjF9.5k9CrkH7_nkMumkkuVRQfJfIO8qXWnq3rBuxY9igLuc','1709886321','6ss84glti5k595','1'),
(305,'209280','1709958057','6ss94ltjkiq8y','2'),
(306,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzA5OTU3NDkxLCJleHAiOjE3MDk5NzE4OTF9.JksDUqWwZVoi7wtpf4uG3ysv4rGhCDdobhnAwbuGhhU','1709971891','6ss94ltjkiq8y','1'),
(307,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzA5OTU3NjM1LCJleHAiOjE3MDk5NzIwMzV9.lXuiKtqGQKxgsAJ5VQVvuLtKhx1p24vJfYsT67U-ZvU','1709972035','6ss94ltjkiq8y','1'),
(308,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzA5OTU5NzA3LCJleHAiOjE3MDk5NzQxMDd9.w6ZcX9bYHXLCz9WPciIs6AiiWe8Mb_abfuynuL1MHJc','1709974107','6ss94ltjkiq8y','1'),
(309,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzA5OTU5OTUwLCJleHAiOjE3MDk5NzQzNTB9.JoYZ-ASpPutz4Ri9_3Ti1_pbsV6Nzj3qNK1GHMcaJHg','1709974350','6ss94ltjkiq8y','1'),
(310,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEwMDAzNzAwLCJleHAiOjE3MTAwMTgxMDB9.kdfURD_o93v8gWsmw1yxUDzNgH601kLRsKrNFMmCrns','1710018100','6ss94ltjkiq8y','1'),
(311,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEwMDAzNzQ0LCJleHAiOjE3MTAwMTgxNDR9.XEaDLvVKomawNHCn-YN9OC0dkgn3Qj8lWfs3gtiW420','1710018144','6ss94ltjkiq8y','1'),
(312,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEwMDQzNzMzLCJleHAiOjE3MTAwNTgxMzN9.PvY4lg3M1McwDyGnaSalsIMJkH6nxNLrK0nwqzReM04','1710058133','6ss94ltjkiq8y','1'),
(313,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEwMTExNTc2LCJleHAiOjE3MTAxMjU5NzZ9.LclquIaaUv4Gx30CYa2nABEEDEiN1fitkgfdd2YB7PQ','1710125976','6ss94ltjkiq8y','1'),
(314,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEwMTEzMDUzLCJleHAiOjE3MTAxMjc0NTN9.SzEccjVfyqGg5zW8aUpSGbMk8HfjJMa1uGTrEdxtO08','1710127453','6ss94ltjkiq8y','1'),
(315,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEwMTEzMzgwLCJleHAiOjE3MTAxMjc3ODB9.7QUMhPR0FrNg-LFYZXfQLh3Os5eLE3SDM65c1gOw9jw','1710127780','6ss94ltjkiq8y','1'),
(316,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEwMTEzNTY4LCJleHAiOjE3MTAxMjc5Njh9.CRJZ_wpU-lJGpYGHei5z2ZW_xavGxpKzR_Iamhzf5Fw','1710127968','6ss94ltjkiq8y','1'),
(317,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEwMTE0NDA1LCJleHAiOjE3MTAxMjg4MDV9.b-CbcqNcqs9117aHrKZRzwMtLz5FQviCGIas9KRGyFg','1710128805','6ss94ltjkiq8y','1'),
(318,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEwMTE1MzQxLCJleHAiOjE3MTAxMjk3NDF9.jOokkae5ikwFCiy-AovkZMgpPdJmTdl83hh7drju2pE','1710129741','6ss94ltjkiq8y','1'),
(319,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEwMTE2NDA1LCJleHAiOjE3MTAxMzA4MDV9.lIcJpoR-pV2194XW8MtwSb1Nyvd8weXMIC1lr5M6CUY','1710130805','6ss94ltjkiq8y','1'),
(320,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEwMTE2NzIxLCJleHAiOjE3MTAxMzExMjF9.Zz99-qM4Z7k330uiC2bkubuQNflvJ9XYnEvql1iP4To','1710131121','6ss94ltjkiq8y','1'),
(321,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEwMTMxODg3LCJleHAiOjE3MTAxNDYyODd9.X2W93yrRJstascep5ZKMPKKMDL3opoi2fQUic9xsy1I','1710146287','6ss94ltjkiq8y','1'),
(322,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEwMTg0OTcxLCJleHAiOjE3MTAyNz','1710271371','6ss94ltjkiq8y','1'),
(323,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEwMTg1MDMwLCJleHAiOjE3MTAyNz','1710271430','6ss94ltjkiq8y','1'),
(324,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEwMTg1MjM1LCJleHAiOjE3MTAyNz','1710271635','6ss94ltjkiq8y','1'),
(325,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEwMTg1MjUxLCJleHAiOjE3MTAyNz','1710271651','6ss94ltjkiq8y','1'),
(326,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEwMjAxNTc5LCJleHAiOjE3MTAyOD','1710287979','6ss94ltjkiq8y','1'),
(327,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEwMjAxNjA0LCJleHAiOjE3MTAyOD','1710288004','6ss94ltjkiq8y','1'),
(328,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEwMjAyOTk5LCJleHAiOjE3MTAyOD','1710289399','6ss94ltjkiq8y','1'),
(329,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEwMjAzMDEwLCJleHAiOjE3MTAyOD','1710289410','6ss94ltjkiq8y','1'),
(330,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEwMjA1Njc3LCJleHAiOjE3MTAyOT','1710292077','6ss94ltjkiq8y','1'),
(331,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEwMjA4OTgzLCJleHAiOjE3MTAyOT','1710295383','6ss94ltjkiq8y','1'),
(332,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEwMjA5MzQ4LCJleHAiOjE3MTAyOT','1710295748','6ss94ltjkiq8y','1'),
(333,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEwMjc2ODU3LCJleHAiOjE3MTAzNj','1710363257','6ss94ltjkiq8y','1'),
(334,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEwMjgxMjg4LCJleHAiOjE3MTAzNj','1710367688','6ss94ltjkiq8y','1'),
(335,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEwMjgxNjgxLCJleHAiOjE3MTAzNj','1710368081','6ss94ltjkiq8y','1'),
(336,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEwMjgxNjkwLCJleHAiOjE3MTAzNj','1710368090','6ss94ltjkiq8y','1'),
(337,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEwODgyNTE2LCJleHAiOjE3MTA5Nj','1710968916','6ss94ltjkiq8y','1'),
(338,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEwODk0ODQyLCJleHAiOjE3MTA5OD','1710981242','6ss94ltjkiq8y','1'),
(339,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEwODk0OTQ3LCJleHAiOjE3MTA5OD','1710981347','6ss94ltjkiq8y','1'),
(340,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEwODk1NDY4LCJleHAiOjE3MTA5OD','1710981868','6ss94ltjkiq8y','1'),
(341,'780912','1710896150','6sscdgltz31bbg','2'),
(342,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3NjZGdsdHozMWJiZyIsIk5vbV9Vc2VyIjoiTWFyaWEiLCJBcGVfVXNlciI6IlBvbG8iLCJFbWFfVXNlciI6Im1hcmlhQGdtYWlsLmNvbSIsIklkX1JvbF9GSyI6MX0sImlhdCI6MTcxMDg5NTU4OSwiZXhwIjoxNzEwOTgxOTg5fQ.XeQUqwNGxUt0h-A','1710981989','6sscdgltz31bbg','1'),
(343,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzExMjE4NDU2LCJleHAiOjE3MTEzMD','1711304856','6ss94ltjkiq8y','1'),
(344,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzExMjE4OTMxLCJleHAiOjE3MTEzMD','1711305331','6ss94ltjkiq8y','1'),
(345,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzExMjE5OTMxLCJleHAiOjE3MTEzMD','1711306331','6ss94ltjkiq8y','1'),
(346,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzExMjIwMTQyLCJleHAiOjE3MTEzMD','1711306542','6ss94ltjkiq8y','1'),
(347,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzExMjIwNTYyLCJleHAiOjE3MTEzMD','1711306962','6ss94ltjkiq8y','1'),
(348,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzExMjIxMTQ1LCJleHAiOjE3MTEzMD','1711307545','6ss94ltjkiq8y','1'),
(349,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzExNTE2ODgyLCJleHAiOjE3MTE2MD','1711603282','6ss94ltjkiq8y','1'),
(350,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzExNTE2OTEzLCJleHAiOjE3MTE2MD','1711603313','6ss94ltjkiq8y','1'),
(351,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzExNTIyMDkwLCJleHAiOjE3MTE2MD','1711608490','6ss94ltjkiq8y','1'),
(352,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzExNTIyOTU0LCJleHAiOjE3MTE2MD','1711609354','6ss94ltjkiq8y','1'),
(353,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzExNTIzMDA2LCJleHAiOjE3MTE2MD','1711609406','6ss94ltjkiq8y','1'),
(354,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzExNTU5OTQ1LCJleHAiOjE3MTE2ND','1711646345','6ss94ltjkiq8y','1'),
(355,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzExNTYxNzY4LCJleHAiOjE3MTE2ND','1711648168','6ss94ltjkiq8y','1'),
(356,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzExNTYxOTc5LCJleHAiOjE3MTE2ND','1711648379','6ss94ltjkiq8y','1'),
(357,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzExNTYxOTkyLCJleHAiOjE3MTE2ND','1711648392','6ss94ltjkiq8y','1'),
(358,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzExNTY1NzE4LCJleHAiOjE3MTE2NT','1711652118','6ss94ltjkiq8y','1'),
(359,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzExNTY1NzQ0LCJleHAiOjE3MTE2NT','1711652144','6ss94ltjkiq8y','1'),
(360,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzExNjU0ODEyLCJleHAiOjE3MTE3ND','1711741212','6ss94ltjkiq8y','1'),
(361,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEyMDMwOTk0LCJleHAiOjE3MTIxMT','1712117394','6ss94ltjkiq8y','1'),
(362,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEyMDM2NzYxLCJleHAiOjE3MTIxMj','1712123161','6ss94ltjkiq8y','1'),
(363,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEyMTI3NjA3LCJleHAiOjE3MTIyMT','1712214007','6ss94ltjkiq8y','1'),
(364,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEyMjkyNTY5LCJleHAiOjE3MTIzNz','1712378969','6ss94ltjkiq8y','1'),
(365,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3M5NGx0amtpcTh5IiwiTm9tX1VzZXIiOiJTdGV2ZW4iLCJBcGVfVXNlciI6IkdvbnphbGV6IiwiRW1hX1VzZXIiOiJhbGZyZWRvMjQuMjEuMjIuMjNAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEyNDIxODQwLCJleHAiOjE3MTI1MD','1712508240','6ss94ltjkiq8y','1');

/*Table structure for table `usuarios` */

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `Id_User` varchar(100) NOT NULL,
  `Nom_User` varchar(255) DEFAULT NULL,
  `Ape_User` varchar(255) DEFAULT NULL,
  `Tel_User` varchar(20) DEFAULT NULL,
  `Ema_User` varchar(255) DEFAULT NULL,
  `Pass_User` varchar(255) DEFAULT NULL,
  `Id_Rol_FK` int(11) DEFAULT NULL,
  `Fot_User` varchar(255) DEFAULT NULL,
  `Est_Email_User` int(1) DEFAULT 0 COMMENT '0: No verificado, 1: verificado',
  PRIMARY KEY (`Id_User`),
  KEY `Id_Rol_FK` (`Id_Rol_FK`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`Id_Rol_FK`) REFERENCES `roles` (`Id_Rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `usuarios` */

insert  into `usuarios`(`Id_User`,`Nom_User`,`Ape_User`,`Tel_User`,`Ema_User`,`Pass_User`,`Id_Rol_FK`,`Fot_User`,`Est_Email_User`) values 
('6ss84glti5k595','Steven','Gonzalez',NULL,'steven0810miguel@outlook.es','$2b$10$NVBjHQT4rWLN3HcQD3KJf.oqGSvebVPnEJfO/3PFrxlsS3CU7ukkS',1,NULL,1),
('6ss94ltjkiq8y','Steven','Gonzalez',NULL,'alfredo24.21.22.23@gmail.com','$2b$10$ZmIrxMoItmpmVO/pOe2.MOShRIauDxgT7zKuY6TEwaZIMv511HgnK',1,NULL,1),
('6sscdgltz31bbg','Maria','Polo',NULL,'maria@gmail.com','$2b$10$VxgGwnRET.EML4yzW1u0JeVQgeCZy/yMsdG223moU/xBAI7hPTstu',1,NULL,0);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
