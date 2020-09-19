-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        8.0.19 - MySQL Community Server - GPL
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  10.3.0.5771
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- iot 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `iot`;
USE `iot`;

-- 테이블 iot.current 구조 내보내기
CREATE TABLE IF NOT EXISTS `current` (
  `id` int NOT NULL AUTO_INCREMENT,
  `machine` varchar(45) DEFAULT NULL,
  `section` varchar(10) DEFAULT NULL,
  `current` float DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `isDeleted` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7;

-- 테이블 데이터 iot.current:~4 rows (대략적) 내보내기
DELETE FROM `current`;
/*!40000 ALTER TABLE `current` DISABLE KEYS */;
INSERT INTO `current` (`id`, `machine`, `section`, `current`, `created`, `isDeleted`) VALUES
	(1, 'WaterPump', '1', 2, '2020-08-26 22:57:23', 0),
	(2, 'waterpump', '1', 111, '2020-08-28 00:34:23', 0),
	(3, 'waterpump', '1', 111, '2020-08-28 00:34:25', 0),
	(4, 'waterpump', '1', 111, '2020-08-28 00:34:26', 0);
/*!40000 ALTER TABLE `current` ENABLE KEYS */;

-- 테이블 iot.env 구조 내보내기
CREATE TABLE IF NOT EXISTS `env` (
  `id` int NOT NULL AUTO_INCREMENT,
  `section` varchar(10) DEFAULT NULL,
  `co2` float DEFAULT NULL COMMENT '	',
  `humidity` float DEFAULT NULL,
  `temperature` float DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `isDeleted` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37;

-- 테이블 데이터 iot.env:~36 rows (대략적) 내보내기
DELETE FROM `env`;
/*!40000 ALTER TABLE `env` DISABLE KEYS */;
INSERT INTO `env` (`id`, `section`, `co2`, `humidity`, `temperature`, `created`, `isDeleted`) VALUES
	(1, '1', 20, 20, 20, '2020-08-26 22:58:21', 0),
	(2, '1', 123, 1212, 213, '2020-08-27 22:29:57', 0),
	(3, '1', 123, 1212, 213, '2020-08-27 22:29:58', 0),
	(4, '1', 123, 1212, 213, '2020-08-27 22:29:59', 0),
	(5, '1', 123, 1212, 213, '2020-08-27 22:29:59', 0),
	(6, '2', 15, 13, 12, '2020-08-27 22:30:05', 0),
	(7, '2', 15, 13, 12, '2020-08-27 22:30:06', 0),
	(8, '2', 15, 13, 12, '2020-08-27 22:30:08', 0),
	(9, '3', 7, 3, 1, '2020-08-27 22:30:19', 0),
	(10, '3', 7, 3, 1, '2020-08-27 22:30:21', 0),
	(11, '3', 7, 3, 1, '2020-08-27 22:30:22', 0),
	(12, '1', 123, 1212, 213, '2020-08-28 00:28:13', 0),
	(13, '1', 123, 1212, 213, '2020-08-28 00:28:13', 0),
	(14, '1', 123, 1212, 213, '2020-08-28 00:28:13', 0),
	(15, '2', 123, 1212, 213, '2020-08-28 00:28:16', 0),
	(16, '2', 123, 1212, 213, '2020-08-28 00:28:16', 0),
	(17, '3', 123, 1212, 213, '2020-08-28 00:28:18', 0),
	(18, '3', 123, 1212, 213, '2020-08-28 00:28:18', 0),
	(19, '3', 123, 1212, 213, '2020-08-28 00:28:18', 0),
	(20, '3', 123, 1212, 213, '2020-08-28 00:30:20', 0),
	(21, '3', 123, 1212, 213, '2020-08-28 00:30:20', 0),
	(22, '3', 123, 1212, 213, '2020-08-28 00:30:20', 0),
	(23, '3', 123, 1212, 213, '2020-08-28 00:30:20', 0),
	(24, '3', 123, 1212, 213, '2020-08-28 00:30:21', 0),
	(25, '2', 123, 1212, 213, '2020-08-28 00:30:23', 0),
	(26, '2', 123, 1212, 213, '2020-08-28 00:30:23', 0),
	(27, '2', 123, 1212, 213, '2020-08-28 00:30:23', 0),
	(28, '2', 123, 1212, 213, '2020-08-28 00:30:23', 0),
	(29, '2', 123, 1212, 213, '2020-08-28 00:30:24', 0),
	(30, '2', 123, 1212, 213, '2020-08-28 00:30:24', 0),
	(31, '2', 123, 1212, 213, '2020-08-28 00:30:24', 0),
	(32, '2', 123, 1212, 213, '2020-08-28 00:30:24', 0),
	(33, '1', 123, 1212, 213, '2020-08-28 00:30:27', 0),
	(34, '1', 123, 1212, 213, '2020-08-28 00:30:27', 0),
	(35, '1', 123, 1212, 213, '2020-08-28 00:30:27', 0),
	(36, '1', 123, 1212, 213, '2020-08-28 00:30:28', 0);
/*!40000 ALTER TABLE `env` ENABLE KEYS */;

-- 테이블 iot.setting 구조 내보내기
CREATE TABLE IF NOT EXISTS `setting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(45) DEFAULT NULL,
  `min` float DEFAULT NULL,
  `max` float DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `isDeleted` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26;

-- 테이블 데이터 iot.setting:~25 rows (대략적) 내보내기
DELETE FROM `setting`;
/*!40000 ALTER TABLE `setting` DISABLE KEYS */;
INSERT INTO `setting` (`id`, `category`, `min`, `max`, `created`, `isDeleted`) VALUES
	(1, 'LED', 9, 18, '2020-08-26 22:58:59', 0),
	(2, 'co2', NULL, NULL, '2020-08-28 00:04:51', 0),
	(3, 'humidity', NULL, NULL, '2020-08-28 00:04:51', 0),
	(4, 'temperature', NULL, NULL, '2020-08-28 00:04:51', 0),
	(5, 'led', 3, NULL, '2020-08-28 00:04:51', 0),
	(6, 'co2', 853, 1304, '2020-08-28 00:16:00', 0),
	(7, 'humidity', 36, 80, '2020-08-28 00:16:00', 0),
	(8, 'temperature', 23, 27, '2020-08-28 00:16:00', 0),
	(9, 'led', 0, 22, '2020-08-28 00:16:00', 0),
	(10, 'co2', 853, 1304, '2020-08-28 00:16:07', 0),
	(11, 'humidity', 36, 80, '2020-08-28 00:16:08', 0),
	(12, 'temperature', 23, 27, '2020-08-28 00:16:08', 0),
	(13, 'led', 6, 22, '2020-08-28 00:16:08', 0),
	(14, 'co2', 940, 1360, '2020-08-28 00:24:09', 0),
	(15, 'humidity', 36, 80, '2020-08-28 00:24:09', 0),
	(16, 'temperature', 23, 27, '2020-08-28 00:24:09', 0),
	(17, 'led', 6, 18, '2020-08-28 00:24:09', 0),
	(18, 'co2', 940, 1360, '2020-08-28 01:19:05', 0),
	(19, 'humidity', 36, 80, '2020-08-28 01:19:05', 0),
	(20, 'temperature', 23, 27, '2020-08-28 01:19:05', 0),
	(21, 'led', 8, 18, '2020-08-28 01:19:05', 0),
	(22, 'co2', 940, 1360, '2020-08-28 03:00:52', 0),
	(23, 'humidity', 44, 80, '2020-08-28 03:00:53', 0),
	(24, 'temperature', 23, 27, '2020-08-28 03:00:53', 0),
	(25, 'led', 8, 18, '2020-08-28 03:00:53', 0);
/*!40000 ALTER TABLE `setting` ENABLE KEYS */;

-- 테이블 iot.switch 구조 내보내기
CREATE TABLE IF NOT EXISTS `switch` (
  `id` int NOT NULL AUTO_INCREMENT,
  `machine` varchar(45) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `controlledBy` varchar(45) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `isDeleted` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67;

-- 테이블 데이터 iot.switch:~66 rows (대략적) 내보내기
DELETE FROM `switch`;
/*!40000 ALTER TABLE `switch` DISABLE KEYS */;
INSERT INTO `switch` (`id`, `machine`, `status`, `controlledBy`, `created`, `isDeleted`) VALUES
	(1, 'WaterPump', 1, 'llewyn', '2020-08-26 23:00:05', 0),
	(2, 'LED', 1, 'Web', '2020-08-27 22:38:15', 0),
	(3, 'FAN', 1, 'Web', '2020-08-27 22:38:19', 0),
	(4, 'WaterPump', 1, 'Web', '2020-08-27 22:38:30', 0),
	(5, 'AirConditioner', 1, 'Web', '2020-08-27 22:38:47', 0),
	(6, 'WaterPump', 0, 'llewyn', '2020-08-27 23:08:15', 0),
	(7, 'FAN', 0, 'llewyn', '2020-08-27 23:08:16', 0),
	(8, 'LED', 0, 'llewyn', '2020-08-27 23:08:16', 0),
	(9, 'AirConditioner', 0, 'llewyn', '2020-08-27 23:08:17', 0),
	(10, 'WaterPump', 1, 'llewyn', '2020-08-27 23:14:16', 0),
	(11, 'FAN', 1, 'llewyn', '2020-08-27 23:14:17', 0),
	(12, 'LED', 1, 'llewyn', '2020-08-27 23:14:17', 0),
	(13, 'AirConditioner', 1, 'llewyn', '2020-08-27 23:14:18', 0),
	(14, 'LED', 0, 'llewyn', '2020-08-27 23:44:04', 0),
	(15, 'AirConditioner', 0, 'llewyn', '2020-08-27 23:44:05', 0),
	(16, 'FAN', 0, 'llewyn', '2020-08-27 23:44:05', 0),
	(17, 'WaterPump', 0, 'llewyn', '2020-08-27 23:44:06', 0),
	(18, 'WaterPump', 1, 'llewyn', '2020-08-27 23:44:07', 0),
	(19, 'FAN', 1, 'llewyn', '2020-08-27 23:44:07', 0),
	(20, 'LED', 1, 'llewyn', '2020-08-27 23:44:09', 0),
	(21, 'AirConditioner', 1, 'llewyn', '2020-08-27 23:44:09', 0),
	(22, 'WaterPump', 0, 'llewyn', '2020-08-27 23:50:22', 0),
	(23, 'FAN', 0, 'llewyn', '2020-08-27 23:50:22', 0),
	(24, 'LED', 0, 'llewyn', '2020-08-27 23:50:22', 0),
	(25, 'AirConditioner', 0, 'llewyn', '2020-08-27 23:50:23', 0),
	(26, 'AirConditioner', 1, 'Web', '2020-08-28 00:27:40', 0),
	(27, 'AirConditioner', 1, 'Web', '2020-08-28 00:27:40', 0),
	(28, 'AirConditioner', 1, 'Web', '2020-08-28 00:27:40', 0),
	(29, 'LED', 1, 'llewyn', '2020-08-28 00:30:49', 0),
	(30, 'FAN', 1, 'llewyn', '2020-08-28 00:30:50', 0),
	(31, 'led', 111, 'Web', '2020-08-28 00:39:11', 0),
	(32, 'led', 1, 'Web', '2020-08-28 00:39:13', 0),
	(33, 'led', 0, 'Web', '2020-08-28 00:39:16', 0),
	(34, 'led', 0, 'Web', '2020-08-28 00:39:16', 0),
	(35, 'led', 0, 'Web', '2020-08-28 00:39:17', 0),
	(36, 'led', 0, 'Web', '2020-08-28 00:39:17', 0),
	(37, 'LED', 0, 'Web', '2020-08-28 00:39:24', 0),
	(38, 'LED', 0, 'Web', '2020-08-28 00:39:24', 0),
	(39, 'LED', 0, 'Web', '2020-08-28 00:39:33', 0),
	(40, 'LED', 0, 'Web', '2020-08-28 00:39:34', 0),
	(41, 'led', 0, 'Web', '2020-08-28 00:39:37', 0),
	(42, 'led', 0, 'Web', '2020-08-28 00:39:38', 0),
	(43, 'led', 1, 'Web', '2020-08-28 00:39:45', 0),
	(44, 'led', 1, 'Web', '2020-08-28 00:41:50', 0),
	(45, 'led', 0, 'Web', '2020-08-28 00:41:53', 0),
	(46, 'led', 1, 'llewyn', '2020-08-28 00:43:36', 0),
	(47, 'waterpump', 1, 'llewyn', '2020-08-28 01:24:54', 0),
	(48, 'waterpump', 0, 'llewyn', '2020-08-28 01:24:55', 0),
	(49, 'led', 0, 'Web', '2020-08-28 02:33:17', 0),
	(50, 'led', 0, 'Web', '2020-08-28 02:33:19', 0),
	(51, 'led', 0, 'Web', '2020-08-28 02:33:39', 0),
	(52, 'led', 0, 'Web', '2020-08-28 02:33:50', 0),
	(53, 'led', 1, 'Web', '2020-08-28 02:34:59', 0),
	(54, 'led', 1, 'Web', '2020-08-28 02:35:01', 0),
	(55, 'led', 1, 'Web', '2020-08-28 02:35:03', 0),
	(56, 'led', 1, 'Web', '2020-08-28 02:35:10', 0),
	(57, 'led', 0, 'Web', '2020-08-28 02:36:31', 0),
	(58, 'led', 0, 'Web', '2020-08-28 02:37:08', 0),
	(59, 'led', 1, 'Web', '2020-08-28 02:39:38', 0),
	(60, 'led', 0, 'Web', '2020-08-28 02:43:37', 0),
	(61, 'led', 1, 'Web', '2020-08-28 02:43:41', 0),
	(62, 'led', 0, 'Web', '2020-08-28 02:45:03', 0),
	(63, 'waterpump', 1, 'Web', '2020-08-28 02:45:28', 0),
	(64, 'fan', 0, 'Web', '2020-08-28 02:45:36', 0),
	(65, 'airconditioner', 0, 'Web', '2020-08-28 02:45:42', 0),
	(66, 'airconditioner', 1, 'Web', '2020-08-28 03:01:17', 0);
/*!40000 ALTER TABLE `switch` ENABLE KEYS */;

-- 테이블 iot.user 구조 내보내기
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `pw` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `isDeleted` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2;

-- 테이블 데이터 iot.user:~0 rows (대략적) 내보내기
DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `name`, `pw`, `type`, `created`, `isDeleted`) VALUES
	(1, 'llewyn', '1234', 'admin', '2020-08-26 23:00:36', 0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
