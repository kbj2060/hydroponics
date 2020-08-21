-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        5.7.31-log - MySQL Community Server (GPL)
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- iot 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `iot` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `iot`;

-- 테이블 iot.current 구조 내보내기
CREATE TABLE IF NOT EXISTS `current` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `led_current_1` float DEFAULT NULL,
  `led_current_2` float DEFAULT NULL,
  `led_current_3` float DEFAULT NULL,
  `led_current_4` float DEFAULT NULL,
  `airconditioner_current_1` float DEFAULT NULL,
  `airconditioner_current_2` float DEFAULT NULL,
  `fan_current_1` float DEFAULT NULL,
  `fan_current_2` float DEFAULT NULL,
  `fan_current_3` float DEFAULT NULL,
  `fan_current_4` float DEFAULT NULL,
  `waterpump_current_1` int(11) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `isDeleted` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- 테이블 데이터 iot.current:~1 rows (대략적) 내보내기
/*!40000 ALTER TABLE `current` DISABLE KEYS */;
INSERT IGNORE INTO `current` (`id`, `led_current_1`, `led_current_2`, `led_current_3`, `led_current_4`, `airconditioner_current_1`, `airconditioner_current_2`, `fan_current_1`, `fan_current_2`, `fan_current_3`, `fan_current_4`, `waterpump_current_1`, `created`, `isDeleted`) VALUES
	(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, '2020-08-17 15:07:43', 0);
/*!40000 ALTER TABLE `current` ENABLE KEYS */;

-- 테이블 iot.plant1 구조 내보내기
CREATE TABLE IF NOT EXISTS `plant1` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime DEFAULT NULL,
  `co2` float DEFAULT NULL,
  `humidity` float DEFAULT NULL,
  `temperature` float DEFAULT NULL,
  `isDeleted` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 iot.plant1:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `plant1` DISABLE KEYS */;
INSERT IGNORE INTO `plant1` (`id`, `created`, `co2`, `humidity`, `temperature`, `isDeleted`) VALUES
	(1, '2020-08-17 15:08:05', 1, 1, 1, 0);
/*!40000 ALTER TABLE `plant1` ENABLE KEYS */;

-- 테이블 iot.plant2 구조 내보내기
CREATE TABLE IF NOT EXISTS `plant2` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime DEFAULT NULL,
  `co2` float DEFAULT NULL,
  `humidity` float DEFAULT NULL,
  `temperature` float DEFAULT NULL,
  `isDeleted` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 iot.plant2:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `plant2` DISABLE KEYS */;
INSERT IGNORE INTO `plant2` (`id`, `created`, `co2`, `humidity`, `temperature`, `isDeleted`) VALUES
	(1, '2020-08-17 15:08:26', 1, 1, 1, 0);
/*!40000 ALTER TABLE `plant2` ENABLE KEYS */;

-- 테이블 iot.plant3 구조 내보내기
CREATE TABLE IF NOT EXISTS `plant3` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime DEFAULT NULL,
  `co2` float DEFAULT NULL,
  `humidity` float DEFAULT NULL,
  `temperature` float DEFAULT NULL,
  `isDeleted` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 iot.plant3:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `plant3` DISABLE KEYS */;
INSERT IGNORE INTO `plant3` (`id`, `created`, `co2`, `humidity`, `temperature`, `isDeleted`) VALUES
	(1, '2020-08-17 15:08:39', 1, 1, 1, 0);
/*!40000 ALTER TABLE `plant3` ENABLE KEYS */;

-- 테이블 iot.setting 구조 내보내기
CREATE TABLE IF NOT EXISTS `setting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `co2_min` float DEFAULT NULL,
  `co2_max` float DEFAULT NULL,
  `temperature_min` float DEFAULT NULL,
  `temperature_max` float DEFAULT NULL,
  `humidity_min` float DEFAULT NULL,
  `humidity_max` float DEFAULT NULL,
  `led_min` float DEFAULT NULL,
  `led_max` float DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `isDeleted` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COMMENT='	';

-- 테이블 데이터 iot.setting:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `setting` DISABLE KEYS */;
INSERT IGNORE INTO `setting` (`id`, `co2_min`, `co2_max`, `temperature_min`, `temperature_max`, `humidity_min`, `humidity_max`, `led_min`, `led_max`, `created`, `isDeleted`) VALUES
	(1, 1, 2, 1, 2, 1, 2, 1, 2, '2020-08-17 15:09:11', 0),
	(2, 802, 1229, 23, 28, 25, 76, 7, 19, '2020-08-20 15:50:18', 0);
/*!40000 ALTER TABLE `setting` ENABLE KEYS */;

-- 테이블 iot.switch 구조 내보내기
CREATE TABLE IF NOT EXISTS `switch` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `machine` tinytext,
  `status` tinyint(4) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `isDeleted` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1931 DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 iot.switch:~36 rows (대략적) 내보내기
/*!40000 ALTER TABLE `switch` DISABLE KEYS */;
INSERT IGNORE INTO `switch` (`id`, `machine`, `status`, `date`, `isDeleted`) VALUES
	(1878, 'AirConditioner', 0, '2020-08-19 13:57:34', 0),
	(1879, 'LED', 0, '2020-08-19 13:57:35', 0),
	(1880, 'FAN', 0, '2020-08-19 13:57:35', 0),
	(1881, 'WaterPump', 0, '2020-08-20 14:59:02', 0),
	(1882, 'WaterPump', 1, '2020-08-20 14:59:11', 0),
	(1883, 'WaterPump', 0, '2020-08-20 14:59:12', 0),
	(1884, 'FAN', 1, '2020-08-20 14:59:13', 0),
	(1885, 'FAN', 0, '2020-08-20 14:59:13', 0),
	(1886, 'LED', 1, '2020-08-20 14:59:14', 0),
	(1887, 'LED', 0, '2020-08-20 14:59:15', 0),
	(1888, 'AirConditioner', 1, '2020-08-20 14:59:15', 0),
	(1889, 'AirConditioner', 0, '2020-08-20 14:59:15', 0),
	(1890, 'WaterPump', 1, '2020-08-20 15:21:55', 0),
	(1891, 'WaterPump', 0, '2020-08-20 15:21:56', 0),
	(1892, 'FAN', 1, '2020-08-20 15:21:56', 0),
	(1893, 'WaterPump', 1, '2020-08-20 15:22:09', 0),
	(1894, 'WaterPump', 0, '2020-08-20 15:22:09', 0),
	(1895, 'FAN', 0, '2020-08-20 15:50:50', 0),
	(1896, 'LED', 1, '2020-08-20 15:50:51', 0),
	(1897, 'AirConditioner', 1, '2020-08-20 15:50:52', 0),
	(1898, 'AirConditioner', 0, '2020-08-20 16:50:48', 0),
	(1899, 'LED', 0, '2020-08-20 16:50:55', 0),
	(1900, 'LED', 1, '2020-08-20 16:50:56', 0),
	(1901, 'AirConditioner', 1, '2020-08-20 16:51:28', 0),
	(1902, 'AirConditioner', 0, '2020-08-20 16:51:28', 0),
	(1903, 'AirConditioner', 1, '2020-08-20 16:51:28', 0),
	(1904, 'AirConditioner', 0, '2020-08-20 16:51:28', 0),
	(1905, 'LED', 0, '2020-08-20 16:51:28', 0),
	(1906, 'LED', 1, '2020-08-20 16:51:28', 0),
	(1907, 'LED', 0, '2020-08-20 16:51:28', 0),
	(1908, 'LED', 1, '2020-08-20 16:51:33', 0),
	(1909, 'AirConditioner', 1, '2020-08-20 16:52:44', 0),
	(1910, 'LED', 0, '2020-08-20 16:52:46', 0),
	(1911, 'LED', 1, '2020-08-20 16:52:49', 0),
	(1912, 'AirConditioner', 0, '2020-08-20 16:52:51', 0),
	(1913, 'AirConditioner', 1, '2020-08-20 16:52:51', 0),
	(1914, 'AirConditioner', 0, '2020-08-20 16:53:04', 0),
	(1915, 'AirConditioner', 1, '2020-08-20 16:53:06', 0),
	(1916, 'LED', 0, '2020-08-20 16:53:09', 0),
	(1917, 'LED', 1, '2020-08-20 16:53:10', 0),
	(1918, 'WaterPump', 1, '2020-08-21 17:16:00', 0),
	(1919, 'FAN', 1, '2020-08-21 17:16:01', 0),
	(1920, 'FAN', 0, '2020-08-21 17:16:01', 0),
	(1921, 'WaterPump', 0, '2020-08-21 17:16:02', 0),
	(1922, 'WaterPump', 1, '2020-08-21 17:23:13', 0),
	(1923, 'WaterPump', 0, '2020-08-21 17:23:14', 0),
	(1924, 'FAN', 1, '2020-08-21 17:23:15', 0),
	(1925, 'WaterPump', 1, '2020-08-21 17:23:27', 0),
	(1926, 'WaterPump', 0, '2020-08-21 17:23:28', 0),
	(1927, 'LED', 0, '2020-08-21 17:24:54', 0),
	(1928, 'LED', 1, '2020-08-21 17:24:55', 0),
	(1929, 'LED', 0, '2020-08-21 17:24:57', 0),
	(1930, 'LED', 1, '2020-08-21 17:24:58', 0);
/*!40000 ALTER TABLE `switch` ENABLE KEYS */;

-- 테이블 iot.users 구조 내보내기
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `pw` varchar(45) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- 테이블 데이터 iot.users:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT IGNORE INTO `users` (`id`, `name`, `pw`, `created`, `isDeleted`) VALUES
	(1, 'llewyn', '1234', '2020-08-19 15:27:34', 0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
