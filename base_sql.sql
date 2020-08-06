-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: iot
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `current`
--

DROP TABLE IF EXISTS `current`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `current` (
  `id` int NOT NULL AUTO_INCREMENT,
  `led_current_1` float DEFAULT NULL,
  `led_current_2` float DEFAULT NULL,
  `led_current_3` float DEFAULT NULL,
  `led_current_4` float DEFAULT NULL,
  `airconditioner_current_1` float DEFAULT NULL,
  `airconditioner_current_2` float DEFAULT NULL,
  `created` date DEFAULT NULL,
  `isDeleted` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `current`
--

LOCK TABLES `current` WRITE;
/*!40000 ALTER TABLE `current` DISABLE KEYS */;
INSERT INTO `current` VALUES (1,1,1,1,1,1,1,NULL,0),(2,1,1,1,1,1,1,NULL,0),(3,1,1,1,1,1,1,NULL,0);
/*!40000 ALTER TABLE `current` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plant1`
--

DROP TABLE IF EXISTS `plant1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plant1` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created` datetime DEFAULT NULL,
  `co2` float DEFAULT NULL,
  `humidity` float DEFAULT NULL,
  `temperature` float DEFAULT NULL,
  `isDeleted` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plant1`
--

LOCK TABLES `plant1` WRITE;
/*!40000 ALTER TABLE `plant1` DISABLE KEYS */;
INSERT INTO `plant1` VALUES (1,'2020-07-31 16:33:19',1000,60,25,0),(2,'2020-07-31 16:34:32',1100,60,25,0),(3,'2020-07-31 16:34:43',1100,50,25,0),(4,'2020-07-31 22:56:48',500,20,23,0);
/*!40000 ALTER TABLE `plant1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plant2`
--

DROP TABLE IF EXISTS `plant2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plant2` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created` datetime DEFAULT NULL,
  `co2` float DEFAULT NULL,
  `humidity` float DEFAULT NULL,
  `temperature` float DEFAULT NULL,
  `isDeleted` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plant2`
--

LOCK TABLES `plant2` WRITE;
/*!40000 ALTER TABLE `plant2` DISABLE KEYS */;
INSERT INTO `plant2` VALUES (1,'2020-07-31 16:34:52',1100,50,25,0),(2,'2020-07-31 16:35:00',1100,40,25,0),(3,'2020-07-31 16:35:05',900,40,25,0),(4,'2020-07-31 22:57:01',800,20,23,0);
/*!40000 ALTER TABLE `plant2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plant3`
--

DROP TABLE IF EXISTS `plant3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plant3` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created` datetime DEFAULT NULL,
  `co2` float DEFAULT NULL,
  `humidity` float DEFAULT NULL,
  `temperature` float DEFAULT NULL,
  `isDeleted` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plant3`
--

LOCK TABLES `plant3` WRITE;
/*!40000 ALTER TABLE `plant3` DISABLE KEYS */;
INSERT INTO `plant3` VALUES (1,'2020-07-31 16:35:09',700,40,25,0),(2,'2020-07-31 16:35:13',700,20,25,0),(3,'2020-07-31 16:35:17',700,20,23,0),(4,'2020-07-31 22:57:26',1000,21,24,0);
/*!40000 ALTER TABLE `plant3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `switch`
--

DROP TABLE IF EXISTS `switch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `switch` (
  `id` int NOT NULL AUTO_INCREMENT,
  `machine` tinytext,
  `status` tinyint DEFAULT NULL,
  `date` varchar(45) DEFAULT NULL,
  `isDeleted` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=334 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `switch`
--

LOCK TABLES `switch` WRITE;
/*!40000 ALTER TABLE `switch` DISABLE KEYS */;
INSERT INTO `switch` VALUES (11,'LED',1,'2020-08-04 02:36:33',0),(12,'LED',0,'2020-08-04 02:36:43',0),(13,'AirConditioner',1,'2020-08-04 02:37:38',0),(14,'AirConditioner',0,'2020-08-04 02:37:39',0),(15,'LED',1,'2020-08-04 02:37:48',0),(16,'AirConditioner',1,'2020-08-04 02:37:49',0),(17,'LED',0,'2020-08-04 02:47:09',0),(18,'LED',0,'2020-08-04 02:47:09',0),(19,'LED',0,'2020-08-04 02:47:11',0),(20,'LED',0,'2020-08-04 02:47:12',0),(21,'LED',0,'2020-08-04 02:47:13',0),(22,'AirConditioner',0,'2020-08-04 02:47:26',0),(23,'AirConditioner',0,'2020-08-04 02:47:32',0),(24,'LED',0,'2020-08-04 02:47:34',0),(25,'LED',0,'2020-08-04 02:48:11',0),(26,'LED',0,'2020-08-04 02:48:18',0),(27,'AirConditioner',0,'2020-08-04 02:48:19',0),(28,'LED',0,'2020-08-04 02:48:57',0),(29,'LED',0,'2020-08-04 02:49:01',0),(30,'AirConditioner',0,'2020-08-04 02:49:04',0),(31,'AirConditioner',0,'2020-08-04 02:49:05',0),(32,'LED',0,'2020-08-04 02:49:35',0),(33,'LED',0,'2020-08-04 02:49:36',0),(34,'LED',0,'2020-08-04 02:49:37',0),(35,'AirConditioner',0,'2020-08-04 02:49:43',0),(36,'LED',0,'2020-08-04 02:50:14',0),(37,'AirConditioner',0,'2020-08-04 02:50:20',0),(38,'LED',0,'2020-08-04 02:50:35',0),(39,'AirConditioner',0,'2020-08-04 02:50:36',0),(40,'LED',1,'2020-08-04 02:51:23',0),(41,'LED',0,'2020-08-04 02:51:25',0),(42,'AirConditioner',1,'2020-08-04 02:51:26',0),(43,'AirConditioner',0,'2020-08-04 02:51:27',0),(44,'LED',1,'2020-08-04 02:51:32',0),(45,'LED',0,'2020-08-04 02:51:33',0),(46,'LED',1,'2020-08-04 02:51:51',0),(47,'LED',0,'2020-08-04 02:51:53',0),(48,'LED',1,'2020-08-04 02:51:54',0),(49,'LED',0,'2020-08-04 02:51:54',0),(50,'LED',1,'2020-08-04 02:51:55',0),(51,'LED',0,'2020-08-04 02:51:55',0),(52,'LED',1,'2020-08-04 02:51:55',0),(53,'LED',1,'2020-08-04 02:51:55',0),(54,'LED',0,'2020-08-04 02:51:56',0),(55,'LED',0,'2020-08-04 02:51:56',0),(56,'LED',1,'2020-08-04 02:52:30',0),(57,'LED',0,'2020-08-04 02:52:32',0),(58,'LED',1,'2020-08-04 02:52:34',0),(59,'LED',0,'2020-08-04 02:52:34',0),(60,'LED',1,'2020-08-04 02:52:35',0),(61,'LED',1,'2020-08-04 02:52:35',0),(62,'LED',0,'2020-08-04 02:52:35',0),(63,'LED',0,'2020-08-04 02:52:35',0),(64,'LED',1,'2020-08-04 02:52:36',0),(65,'LED',1,'2020-08-04 02:52:36',0),(66,'AirConditioner',1,'2020-08-04 02:52:37',0),(67,'AirConditioner',1,'2020-08-04 02:52:37',0),(68,'AirConditioner',0,'2020-08-04 02:52:37',0),(69,'AirConditioner',1,'2020-08-04 02:52:37',0),(70,'AirConditioner',0,'2020-08-04 02:52:37',0),(71,'AirConditioner',1,'2020-08-04 02:52:38',0),(72,'AirConditioner',1,'2020-08-04 02:52:40',0),(73,'AirConditioner',0,'2020-08-04 02:52:41',0),(74,'LED',1,'2020-08-04 02:53:24',0),(75,'LED',0,'2020-08-04 02:53:25',0),(76,'LED',1,'2020-08-04 02:53:49',0),(77,'AirConditioner',1,'2020-08-04 02:53:50',0),(78,'AirConditioner',1,'2020-08-04 02:54:22',0),(79,'AirConditioner',0,'2020-08-04 02:54:24',0),(80,'AirConditioner',1,'2020-08-04 02:54:26',0),(81,'LED',0,'2020-08-04 02:55:10',0),(82,'AirConditioner',0,'2020-08-04 02:55:12',0),(83,'LED',0,'2020-08-04 02:55:38',0),(84,'AirConditioner',0,'2020-08-04 02:55:39',0),(85,'LED',1,'2020-08-04 02:56:28',0),(86,'AirConditioner',1,'2020-08-04 02:56:29',0),(87,'LED',0,'2020-08-04 02:56:40',0),(88,'LED',0,'2020-08-04 02:56:46',0),(89,'AirConditioner',0,'2020-08-04 02:56:47',0),(90,'LED',0,'2020-08-04 02:57:04',0),(91,'LED',0,'2020-08-04 02:58:12',0),(92,'LED',1,'2020-08-04 02:59:42',0),(93,'AirConditioner',0,'2020-08-04 02:59:47',0),(94,'LED',0,'2020-08-04 02:59:48',0),(95,'LED',1,'2020-08-04 02:59:51',0),(96,'LED',0,'2020-08-04 03:01:31',0),(97,'LED',0,'2020-08-04 03:12:02',0),(98,'LED',0,'2020-08-04 03:12:17',0),(99,'LED',0,'2020-08-04 03:12:26',0),(100,'AirConditioner',0,'2020-08-04 03:12:26',0),(101,'AirConditioner',1,'2020-08-04 03:12:27',0),(102,'LED',1,'2020-08-04 03:12:44',0),(103,'AirConditioner',0,'2020-08-04 03:12:45',0),(104,'AirConditioner',1,'2020-08-04 03:12:56',0),(105,'AirConditioner',0,'2020-08-04 03:13:01',0),(106,'LED',0,'2020-08-04 03:13:01',0),(107,'AirConditioner',1,'2020-08-04 03:13:43',0),(108,'LED',1,'2020-08-04 03:13:44',0),(109,'LED',0,'2020-08-04 03:24:43',0),(110,'LED',1,'2020-08-04 03:50:10',0),(111,'LED',0,'2020-08-04 14:43:11',0),(112,'LED',1,'2020-08-04 14:43:12',0),(113,'LED',0,'2020-08-04 14:43:13',0),(114,'AirConditioner',0,'2020-08-04 14:43:14',0),(115,'LED',1,'2020-08-04 14:43:16',0),(116,'LED',0,'2020-08-04 14:43:17',0),(117,'LED',1,'2020-08-04 14:43:18',0),(118,'LED',0,'2020-08-04 14:43:19',0),(119,'LED',1,'2020-08-04 14:43:19',0),(120,'LED',0,'2020-08-04 14:43:21',0),(121,'LED',1,'2020-08-04 14:43:22',0),(122,'AirConditioner',1,'2020-08-04 14:43:23',0),(123,'AirConditioner',0,'2020-08-04 14:43:25',0),(124,'LED',0,'2020-08-04 14:43:26',0),(125,'LED',1,'2020-08-04 14:49:21',0),(126,'AirConditioner',1,'2020-08-04 16:26:17',0),(127,'AirConditioner',0,'2020-08-05 00:10:09',0),(128,'AirConditioner',1,'2020-08-05 00:10:13',0),(129,'LED',0,'2020-08-05 01:34:17',0),(130,'AirConditioner',0,'2020-08-05 01:34:22',0),(131,'LED',1,'2020-08-05 01:34:53',0),(132,'AirConditioner',1,'2020-08-05 01:34:56',0),(133,'LED',0,'2020-08-05 01:35:13',0),(134,'AirConditioner',0,'2020-08-05 01:35:14',0),(135,'AirConditioner',1,'2020-08-05 01:35:15',0),(136,'LED',1,'2020-08-05 01:35:34',0),(137,'LED',0,'2020-08-05 01:35:36',0),(138,'LED',1,'2020-08-05 01:35:37',0),(139,'LED',0,'2020-08-05 01:38:13',0),(140,'LED',1,'2020-08-05 01:38:54',0),(141,'LED',0,'2020-08-05 01:44:34',0),(142,'LED',1,'2020-08-05 01:44:36',0),(143,'AirConditioner',0,'2020-08-05 01:44:39',0),(144,'AirConditioner',1,'2020-08-05 01:44:44',0),(145,'LED',0,'2020-08-05 01:48:00',0),(146,'AirConditioner',0,'2020-08-05 01:48:04',0),(147,'AirConditioner',1,'2020-08-05 01:48:06',0),(148,'LED',1,'2020-08-05 01:48:12',0),(149,'LED',0,'2020-08-05 01:48:13',0),(150,'AirConditioner',0,'2020-08-05 01:48:14',0),(151,'AirConditioner',1,'2020-08-05 01:48:15',0),(152,'LED',1,'2020-08-05 01:50:27',0),(153,'LED',0,'2020-08-05 01:50:39',0),(154,'LED',1,'2020-08-05 01:50:43',0),(155,'AirConditioner',0,'2020-08-05 01:50:44',0),(156,'LED',0,'2020-08-05 01:54:18',0),(157,'LED',1,'2020-08-05 01:54:28',0),(158,'LED',0,'2020-08-05 01:54:30',0),(159,'AirConditioner',1,'2020-08-05 01:54:32',0),(160,'AirConditioner',0,'2020-08-05 01:54:32',0),(161,'AirConditioner',1,'2020-08-05 01:54:53',0),(162,'LED',1,'2020-08-05 01:55:30',0),(163,'AirConditioner',0,'2020-08-05 01:55:31',0),(164,'LED',0,'2020-08-05 02:23:27',0),(165,'LED',1,'2020-08-05 02:25:58',0),(166,'LED',0,'2020-08-05 02:29:41',0),(167,'LED',1,'2020-08-05 02:29:42',0),(168,'AirConditioner',1,'2020-08-05 02:29:49',0),(169,'AirConditioner',0,'2020-08-05 02:29:51',0),(170,'AirConditioner',1,'2020-08-05 02:29:53',0),(171,'LED',0,'2020-08-05 02:29:54',0),(172,'LED',1,'2020-08-05 02:29:56',0),(173,'LED',0,'2020-08-05 02:30:33',0),(174,'LED',1,'2020-08-05 02:30:35',0),(175,'AirConditioner',0,'2020-08-05 02:30:36',0),(176,'AirConditioner',1,'2020-08-05 02:30:36',0),(177,'LED',0,'2020-08-05 02:31:21',0),(178,'LED',1,'2020-08-05 02:31:23',0),(179,'LED',0,'2020-08-05 02:31:24',0),(180,'AirConditioner',0,'2020-08-05 02:31:25',0),(181,'AirConditioner',1,'2020-08-05 02:31:26',0),(182,'LED',1,'2020-08-05 02:33:40',0),(183,'AirConditioner',0,'2020-08-05 02:33:43',0),(184,'AirConditioner',1,'2020-08-05 02:33:44',0),(185,'LED',0,'2020-08-05 02:35:13',0),(186,'AirConditioner',0,'2020-08-05 02:35:16',0),(187,'AirConditioner',1,'2020-08-05 02:35:27',0),(188,'LED',1,'2020-08-05 02:36:09',0),(189,'LED',0,'2020-08-05 02:36:22',0),(190,'AirConditioner',0,'2020-08-05 02:36:37',0),(191,'LED',1,'2020-08-05 02:36:38',0),(192,'AirConditioner',1,'2020-08-05 02:36:39',0),(193,'LED',0,'2020-08-05 02:36:40',0),(194,'AirConditioner',0,'2020-08-05 02:36:41',0),(195,'AirConditioner',1,'2020-08-05 02:36:55',0),(196,'LED',1,'2020-08-05 02:40:33',0),(197,'LED',0,'2020-08-05 02:40:34',0),(198,'AirConditioner',0,'2020-08-05 02:40:38',0),(199,'AirConditioner',1,'2020-08-05 02:40:39',0),(200,'LED',1,'2020-08-05 02:40:39',0),(201,'LED',0,'2020-08-05 02:40:40',0),(202,'LED',1,'2020-08-05 02:41:18',0),(203,'AirConditioner',0,'2020-08-05 02:41:22',0),(204,'LED',0,'2020-08-05 02:43:34',0),(205,'LED',1,'2020-08-05 02:43:36',0),(206,'LED',0,'2020-08-05 02:44:34',0),(207,'LED',1,'2020-08-05 02:44:35',0),(208,'AirConditioner',1,'2020-08-05 02:44:49',0),(209,'AirConditioner',0,'2020-08-05 02:47:01',0),(210,'AirConditioner',1,'2020-08-05 02:47:04',0),(211,'AirConditioner',0,'2020-08-05 02:47:05',0),(212,'AirConditioner',1,'2020-08-05 02:47:06',0),(213,'AirConditioner',0,'2020-08-05 02:47:07',0),(214,'LED',0,'2020-08-05 02:47:28',0),(215,'LED',1,'2020-08-05 02:47:28',0),(216,'LED',0,'2020-08-05 02:47:29',0),(217,'LED',1,'2020-08-05 02:47:30',0),(218,'LED',0,'2020-08-05 02:47:31',0),(219,'LED',1,'2020-08-05 02:47:32',0),(220,'LED',0,'2020-08-05 02:47:33',0),(221,'LED',1,'2020-08-05 02:52:12',0),(222,'LED',0,'2020-08-05 02:52:13',0),(223,'LED',1,'2020-08-05 02:52:14',0),(224,'LED',0,'2020-08-05 02:52:14',0),(225,'LED',1,'2020-08-05 02:52:15',0),(226,'LED',0,'2020-08-05 02:52:16',0),(227,'LED',1,'2020-08-05 02:52:17',0),(228,'LED',0,'2020-08-05 02:53:56',0),(229,'LED',1,'2020-08-05 02:53:56',0),(230,'LED',0,'2020-08-05 02:53:57',0),(231,'LED',1,'2020-08-05 02:53:57',0),(232,'LED',0,'2020-08-05 02:53:58',0),(233,'LED',1,'2020-08-05 02:53:59',0),(234,'LED',0,'2020-08-05 02:54:28',0),(235,'LED',1,'2020-08-05 02:54:30',0),(236,'LED',0,'2020-08-05 02:54:31',0),(237,'LED',1,'2020-08-05 02:54:54',0),(238,'LED',0,'2020-08-05 02:54:56',0),(239,'LED',1,'2020-08-05 02:54:57',0),(240,'LED',0,'2020-08-05 02:55:27',0),(241,'LED',1,'2020-08-05 02:55:29',0),(242,'LED',0,'2020-08-05 02:55:29',0),(243,'LED',1,'2020-08-05 02:55:31',0),(244,'AirConditioner',1,'2020-08-05 02:55:32',0),(245,'AirConditioner',0,'2020-08-05 02:55:32',0),(246,'AirConditioner',1,'2020-08-05 02:55:34',0),(247,'AirConditioner',0,'2020-08-05 02:55:34',0),(248,'LED',0,'2020-08-05 02:56:01',0),(249,'LED',1,'2020-08-05 02:56:02',0),(250,'LED',0,'2020-08-05 02:57:02',0),(251,'LED',1,'2020-08-05 02:57:03',0),(252,'LED',0,'2020-08-05 02:57:09',0),(253,'AirConditioner',1,'2020-08-05 02:57:28',0),(254,'AirConditioner',0,'2020-08-05 02:57:30',0),(255,'AirConditioner',1,'2020-08-05 02:57:31',0),(256,'LED',1,'2020-08-05 02:58:40',0),(257,'LED',0,'2020-08-05 02:58:41',0),(258,'LED',1,'2020-08-05 02:58:47',0),(259,'LED',0,'2020-08-05 02:58:49',0),(260,'LED',1,'2020-08-05 02:59:04',0),(261,'LED',0,'2020-08-05 02:59:16',0),(262,'LED',1,'2020-08-05 02:59:18',0),(263,'LED',0,'2020-08-05 02:59:19',0),(264,'LED',1,'2020-08-05 02:59:21',0),(265,'LED',0,'2020-08-05 02:59:22',0),(266,'LED',1,'2020-08-05 03:00:28',0),(267,'LED',0,'2020-08-05 03:00:29',0),(268,'LED',1,'2020-08-05 03:00:30',0),(269,'LED',0,'2020-08-05 03:00:31',0),(270,'LED',1,'2020-08-05 03:00:31',0),(271,'LED',0,'2020-08-05 03:00:32',0),(272,'LED',1,'2020-08-05 03:00:32',0),(273,'LED',0,'2020-08-05 03:00:32',0),(274,'LED',1,'2020-08-05 03:01:21',0),(275,'LED',0,'2020-08-05 03:01:22',0),(276,'LED',1,'2020-08-05 03:01:32',0),(277,'LED',0,'2020-08-05 03:01:33',0),(278,'LED',1,'2020-08-05 03:01:34',0),(279,'LED',0,'2020-08-05 03:02:02',0),(280,'LED',1,'2020-08-05 03:02:03',0),(281,'LED',0,'2020-08-05 03:02:19',0),(282,'LED',1,'2020-08-05 03:02:33',0),(283,'LED',0,'2020-08-05 03:02:36',0),(284,'LED',1,'2020-08-05 03:16:49',0),(285,'LED',0,'2020-08-05 03:17:21',0),(286,'LED',1,'2020-08-05 03:17:23',0),(287,'LED',0,'2020-08-05 03:17:24',0),(288,'LED',1,'2020-08-05 03:17:59',0),(289,'LED',0,'2020-08-05 03:18:01',0),(290,'LED',1,'2020-08-05 03:18:11',0),(291,'LED',0,'2020-08-05 03:18:12',0),(292,'LED',0,'2020-08-05 03:18:14',0),(293,'LED',0,'2020-08-05 03:18:14',0),(294,'LED',1,'2020-08-05 03:18:29',0),(295,'LED',0,'2020-08-05 03:18:30',0),(296,'LED',1,'2020-08-05 03:18:31',0),(297,'AirConditioner',0,'2020-08-05 03:18:40',0),(298,'LED',0,'2020-08-05 03:20:39',0),(299,'AirConditioner',1,'2020-08-05 03:20:41',0),(300,'AirConditioner',0,'2020-08-05 03:20:41',0),(301,'AirConditioner',1,'2020-08-05 03:20:42',0),(302,'AirConditioner',0,'2020-08-05 03:20:43',0),(303,'AirConditioner',1,'2020-08-05 03:20:44',0),(304,'AirConditioner',0,'2020-08-05 03:21:03',0),(305,'AirConditioner',1,'2020-08-05 03:21:04',0),(306,'AirConditioner',0,'2020-08-05 03:21:05',0),(307,'LED',1,'2020-08-05 03:29:03',0),(308,'AirConditioner',1,'2020-08-05 03:29:06',0),(309,'AirConditioner',0,'2020-08-05 03:29:08',0),(310,'LED',0,'2020-08-05 03:29:10',0),(311,'LED',1,'2020-08-05 03:29:12',0),(312,'AirConditioner',1,'2020-08-05 03:29:13',0),(313,'LED',0,'2020-08-06 01:27:06',0),(314,'LED',1,'2020-08-06 02:38:40',0),(315,'AirConditioner',0,'2020-08-06 02:38:42',0),(316,'LED',0,'2020-08-06 02:38:43',0),(317,'AirConditioner',1,'2020-08-06 02:38:48',0),(318,'AirConditioner',0,'2020-08-06 02:38:51',0),(319,'AirConditioner',1,'2020-08-06 02:38:57',0),(320,'LED',1,'2020-08-06 02:38:58',0),(321,'LED',0,'2020-08-06 02:38:59',0),(322,'AirConditioner',0,'2020-08-06 02:39:01',0),(323,'AirConditioner',1,'2020-08-06 02:39:02',0),(324,'LED',1,'2020-08-06 02:39:04',0),(325,'LED',0,'2020-08-06 02:39:05',0),(326,'AirConditioner',0,'2020-08-06 02:39:25',0),(327,'AirConditioner',1,'2020-08-06 02:39:25',0),(328,'AirConditioner',0,'2020-08-06 02:39:26',0),(329,'AirConditioner',1,'2020-08-06 02:39:27',0),(330,'LED',1,'2020-08-06 02:39:28',0),(331,'LED',0,'2020-08-06 02:39:29',0),(332,'LED',1,'2020-08-06 02:39:31',0),(333,'AirConditioner',0,'2020-08-06 02:39:32',0);
/*!40000 ALTER TABLE `switch` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-06  4:48:19
