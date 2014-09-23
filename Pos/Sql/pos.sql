-- MySQL dump 10.13  Distrib 5.5.32, for Win32 (x86)
--
-- Host: localhost    Database: pos
-- ------------------------------------------------------
-- Server version	5.5.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `area_city`
--

DROP TABLE IF EXISTS `area_city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `area_city` (
  `ac_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(15) NOT NULL,
  `ap_id` int(11) NOT NULL,
  `remark` tinytext NOT NULL,
  `create_user` int(11) NOT NULL,
  `create_time` timestamp NULL DEFAULT NULL,
  `edit_user` int(11) NOT NULL,
  `edit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ac_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area_city`
--

LOCK TABLES `area_city` WRITE;
/*!40000 ALTER TABLE `area_city` DISABLE KEYS */;
INSERT INTO `area_city` VALUES (3,'广州市',2,'',1,'2014-09-23 02:39:42',1,'2014-09-23 02:39:43'),(4,'北海市',3,'',1,'2014-09-23 06:24:05',1,'2014-09-23 06:24:06'),(5,'桂林市',3,'',1,'2014-09-23 07:25:32',1,'2014-09-23 07:25:33'),(6,'天河区',2,'',1,'2014-09-23 07:29:24',1,'2014-09-23 07:29:25');
/*!40000 ALTER TABLE `area_city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `area_district`
--

DROP TABLE IF EXISTS `area_district`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `area_district` (
  `ad_id` int(11) NOT NULL AUTO_INCREMENT,
  `ap_id` int(11) NOT NULL,
  `ac_id` int(11) NOT NULL,
  `name` varchar(15) NOT NULL,
  `remark` tinytext NOT NULL,
  `create_user` int(11) NOT NULL,
  `create_time` timestamp NULL DEFAULT NULL,
  `edit_user` int(11) NOT NULL,
  `edit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ad_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area_district`
--

LOCK TABLES `area_district` WRITE;
/*!40000 ALTER TABLE `area_district` DISABLE KEYS */;
INSERT INTO `area_district` VALUES (2,2,3,'天河区','',1,'2014-09-23 07:41:11',1,'2014-09-23 07:41:12');
/*!40000 ALTER TABLE `area_district` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `area_province`
--

DROP TABLE IF EXISTS `area_province`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `area_province` (
  `ap_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(15) NOT NULL,
  `remark` tinytext NOT NULL,
  `create_user` int(11) NOT NULL,
  `create_time` timestamp NULL DEFAULT NULL,
  `edit_user` int(11) NOT NULL,
  `edit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ap_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area_province`
--

LOCK TABLES `area_province` WRITE;
/*!40000 ALTER TABLE `area_province` DISABLE KEYS */;
INSERT INTO `area_province` VALUES (2,'广东省','',1,'2014-09-23 02:01:12',1,'2014-09-23 02:01:13'),(3,'广西省','',1,'2014-09-23 02:17:40',1,'2014-09-23 06:23:50');
/*!40000 ALTER TABLE `area_province` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bank`
--

DROP TABLE IF EXISTS `bank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bank` (
  `b_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `create_user` int(11) NOT NULL,
  `edit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `edit_user` int(11) DEFAULT NULL,
  `code` varchar(20) NOT NULL,
  PRIMARY KEY (`b_id`),
  KEY `create_user` (`create_user`),
  KEY `edit_user` (`edit_user`),
  CONSTRAINT `bank_ibfk_1` FOREIGN KEY (`create_user`) REFERENCES `user` (`u_id`),
  CONSTRAINT `bank_ibfk_2` FOREIGN KEY (`edit_user`) REFERENCES `user` (`u_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bank`
--

LOCK TABLES `bank` WRITE;
/*!40000 ALTER TABLE `bank` DISABLE KEYS */;
/*!40000 ALTER TABLE `bank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client_attr`
--

DROP TABLE IF EXISTS `client_attr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `client_attr` (
  `ca_id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `remark` tinytext NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `create_user` int(11) NOT NULL,
  `edit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `edit_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`ca_id`),
  KEY `edit_user` (`edit_user`),
  KEY `create_user` (`create_user`),
  CONSTRAINT `client_attr_ibfk_1` FOREIGN KEY (`edit_user`) REFERENCES `user` (`u_id`),
  CONSTRAINT `client_attr_ibfk_2` FOREIGN KEY (`create_user`) REFERENCES `user` (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_attr`
--

LOCK TABLES `client_attr` WRITE;
/*!40000 ALTER TABLE `client_attr` DISABLE KEYS */;
INSERT INTO `client_attr` VALUES (2,'P','个体零售','','2014-09-22 09:31:29',1,'2014-09-22 09:31:29',1);
/*!40000 ALTER TABLE `client_attr` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client_platform`
--

DROP TABLE IF EXISTS `client_platform`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `client_platform` (
  `cp_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `code` varchar(20) NOT NULL,
  `remark` tinytext NOT NULL,
  `create_user` int(11) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `edit_user` int(11) DEFAULT NULL,
  `edit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`cp_id`),
  UNIQUE KEY `code` (`code`),
  KEY `create_user` (`create_user`),
  KEY `edit_user` (`edit_user`),
  CONSTRAINT `client_platform_ibfk_1` FOREIGN KEY (`create_user`) REFERENCES `user` (`u_id`),
  CONSTRAINT `client_platform_ibfk_2` FOREIGN KEY (`edit_user`) REFERENCES `user` (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_platform`
--

LOCK TABLES `client_platform` WRITE;
/*!40000 ALTER TABLE `client_platform` DISABLE KEYS */;
INSERT INTO `client_platform` VALUES (2,'收单平台','00155800','',1,'2014-09-22 09:30:16',1,'2014-09-22 09:30:16');
/*!40000 ALTER TABLE `client_platform` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client_rate`
--

DROP TABLE IF EXISTS `client_rate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `client_rate` (
  `cr_id` int(11) NOT NULL AUTO_INCREMENT,
  `rate` int(11) NOT NULL,
  `code` varchar(20) NOT NULL,
  `remark` tinytext NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `create_user` int(11) NOT NULL,
  `edit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `edit_user` int(11) DEFAULT NULL,
  `is_inner` int(11) NOT NULL,
  PRIMARY KEY (`cr_id`),
  UNIQUE KEY `code` (`code`),
  KEY `edit_user` (`edit_user`),
  KEY `create_user` (`create_user`),
  CONSTRAINT `client_rate_ibfk_1` FOREIGN KEY (`edit_user`) REFERENCES `user` (`u_id`),
  CONSTRAINT `client_rate_ibfk_2` FOREIGN KEY (`create_user`) REFERENCES `user` (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_rate`
--

LOCK TABLES `client_rate` WRITE;
/*!40000 ALTER TABLE `client_rate` DISABLE KEYS */;
INSERT INTO `client_rate` VALUES (2,0,'GD368','','2014-09-22 09:31:09',1,'2014-09-22 09:31:09',1,1);
/*!40000 ALTER TABLE `client_rate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company` (
  `c_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `type` int(11) NOT NULL,
  `remark` tinytext NOT NULL,
  `edit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `edit_user` int(11) NOT NULL,
  `create_user` int(11) NOT NULL,
  `create_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`c_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (1,'中国银行534分行',1,'','2014-09-20 08:09:14',1,0,NULL),(2,'增城公司',0,'','2014-09-20 08:09:26',1,1,'2014-09-20 08:09:25'),(3,'增城公司',0,'','2014-09-20 08:09:37',1,1,'2014-09-20 08:09:36'),(4,'增城公司',0,'','2014-09-20 08:11:09',1,1,'2014-09-20 08:11:08'),(5,'增城公司',0,'','2014-09-20 08:11:24',1,1,'2014-09-20 08:11:23'),(6,'增城公司',0,'','2014-09-20 08:11:30',1,1,'2014-09-20 08:11:29'),(7,'增城公司',0,'','2014-09-20 08:11:55',1,1,'2014-09-20 08:11:54'),(8,'增城分公司',0,'','2014-09-20 08:12:28',1,1,'2014-09-20 08:12:27'),(9,'湛江分公司',0,'','2014-09-20 08:13:25',1,1,'2014-09-20 08:13:24');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deployorder`
--

DROP TABLE IF EXISTS `deployorder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deployorder` (
  `do_id` int(11) NOT NULL AUTO_INCREMENT,
  `source_c` int(11) NOT NULL,
  `target_c` int(11) NOT NULL,
  `m_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `create_user` int(11) NOT NULL,
  `edit_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `edit_user` int(11) DEFAULT NULL,
  `state` int(11) DEFAULT NULL,
  `remark` tinytext,
  PRIMARY KEY (`do_id`),
  KEY `create_user` (`create_user`),
  KEY `edit_user` (`edit_user`),
  KEY `m_id` (`m_id`),
  KEY `deployorder_ifbk_4` (`source_c`),
  KEY `deployorder_ifbk_5` (`target_c`),
  CONSTRAINT `deployorder_ibfk_1` FOREIGN KEY (`create_user`) REFERENCES `user` (`u_id`),
  CONSTRAINT `deployorder_ibfk_2` FOREIGN KEY (`edit_user`) REFERENCES `user` (`u_id`),
  CONSTRAINT `deployorder_ibfk_3` FOREIGN KEY (`m_id`) REFERENCES `machine` (`m_id`),
  CONSTRAINT `deployorder_ifbk_4` FOREIGN KEY (`source_c`) REFERENCES `company` (`c_id`),
  CONSTRAINT `deployorder_ifbk_5` FOREIGN KEY (`target_c`) REFERENCES `company` (`c_id`),
  CONSTRAINT `do_dom_constraint` FOREIGN KEY (`m_id`) REFERENCES `machine` (`m_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deployorder`
--

LOCK TABLES `deployorder` WRITE;
/*!40000 ALTER TABLE `deployorder` DISABLE KEYS */;
/*!40000 ALTER TABLE `deployorder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `machine`
--

DROP TABLE IF EXISTS `machine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `machine` (
  `m_id` int(11) NOT NULL AUTO_INCREMENT,
  `m_code` varchar(40) NOT NULL,
  `b_id` int(11) DEFAULT NULL,
  `m_type` int(4) DEFAULT NULL,
  `m_tcode` varchar(40) DEFAULT NULL,
  `m_bcode` varchar(40) DEFAULT NULL,
  `check_list` longtext,
  `check_time` timestamp NULL DEFAULT NULL,
  `state` int(4) DEFAULT NULL,
  `task_apply_id` int(11) DEFAULT NULL,
  `o_id` int(4) NOT NULL,
  `task_return_id` int(4) DEFAULT NULL,
  `c_id` int(11) NOT NULL,
  `create_user` int(11) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `edit_user` int(11) DEFAULT NULL,
  `edit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`m_id`),
  UNIQUE KEY `m_code` (`m_code`,`m_tcode`),
  KEY `create_user` (`create_user`),
  KEY `edit_user` (`edit_user`),
  KEY `m_bank` (`b_id`),
  KEY `machine_ifbk4` (`task_apply_id`),
  KEY `machine_ifbk5` (`task_return_id`),
  KEY `machine_ifbk_6` (`o_id`),
  KEY `machine_ifbk_7` (`c_id`),
  CONSTRAINT `machine_ibfk_1` FOREIGN KEY (`create_user`) REFERENCES `user` (`u_id`),
  CONSTRAINT `machine_ibfk_2` FOREIGN KEY (`edit_user`) REFERENCES `user` (`u_id`),
  CONSTRAINT `machine_ifbk4` FOREIGN KEY (`task_apply_id`) REFERENCES `task` (`t_id`),
  CONSTRAINT `machine_ifbk5` FOREIGN KEY (`task_return_id`) REFERENCES `task` (`t_id`),
  CONSTRAINT `machine_ifbk_3` FOREIGN KEY (`b_id`) REFERENCES `bank` (`b_id`),
  CONSTRAINT `machine_ifbk_6` FOREIGN KEY (`o_id`) REFERENCES `order` (`o_id`),
  CONSTRAINT `machine_ifbk_7` FOREIGN KEY (`c_id`) REFERENCES `company` (`c_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `machine`
--

LOCK TABLES `machine` WRITE;
/*!40000 ALTER TABLE `machine` DISABLE KEYS */;
/*!40000 ALTER TABLE `machine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `machineprovider`
--

DROP TABLE IF EXISTS `machineprovider`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `machineprovider` (
  `mp_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `remark` tinytext,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `create_user` int(11) NOT NULL,
  `edit_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `edit_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`mp_id`),
  KEY `create_user` (`create_user`),
  KEY `edit_user` (`edit_user`),
  CONSTRAINT `machineprovider_ibfk_1` FOREIGN KEY (`create_user`) REFERENCES `user` (`u_id`),
  CONSTRAINT `machineprovider_ibfk_2` FOREIGN KEY (`edit_user`) REFERENCES `user` (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `machineprovider`
--

LOCK TABLES `machineprovider` WRITE;
/*!40000 ALTER TABLE `machineprovider` DISABLE KEYS */;
INSERT INTO `machineprovider` VALUES (1,'大耗子','小耗子','2014-09-16 09:42:07',1,NULL,NULL),(8,'大耗子大','小耗子','0000-00-00 00:00:00',1,NULL,NULL),(9,'设备商1','','0000-00-00 00:00:00',1,NULL,NULL),(10,'设备商2','','0000-00-00 00:00:00',1,NULL,NULL),(11,'设备商3','','0000-00-00 00:00:00',1,NULL,NULL),(12,'设备商4','','0000-00-00 00:00:00',1,NULL,NULL),(13,'设备商5','','0000-00-00 00:00:00',1,NULL,NULL),(14,'设备商6','','0000-00-00 00:00:00',1,NULL,NULL),(15,'设备商7','','0000-00-00 00:00:00',1,NULL,NULL),(16,'设备商8','','0000-00-00 00:00:00',1,NULL,NULL),(17,'设备商9','','0000-00-00 00:00:00',1,NULL,NULL),(18,'设备商10','','0000-00-00 00:00:00',1,NULL,NULL),(19,'设备商11','','0000-00-00 00:00:00',1,NULL,NULL),(20,'设备商12','','0000-00-00 00:00:00',1,NULL,NULL),(21,'设备商13','','0000-00-00 00:00:00',1,NULL,NULL),(22,'设备商14','','0000-00-00 00:00:00',1,NULL,NULL),(23,'设备商15','','0000-00-00 00:00:00',1,NULL,NULL),(24,'设备商16','','0000-00-00 00:00:00',1,NULL,NULL),(25,'设备商17','','0000-00-00 00:00:00',1,NULL,NULL),(26,'设备商18','','0000-00-00 00:00:00',1,NULL,NULL),(27,'设备商19','','0000-00-00 00:00:00',1,NULL,NULL),(28,'设备商20','','0000-00-00 00:00:00',1,NULL,NULL),(29,'设备商21','','0000-00-00 00:00:00',1,NULL,NULL),(30,'设备商22','','0000-00-00 00:00:00',1,NULL,NULL),(31,'设备商23','','0000-00-00 00:00:00',1,NULL,NULL),(32,'设备商24','','0000-00-00 00:00:00',1,NULL,NULL),(33,'设备商25','','0000-00-00 00:00:00',1,NULL,NULL),(34,'设备商26','','0000-00-00 00:00:00',1,NULL,NULL),(35,'设备商27','','0000-00-00 00:00:00',1,NULL,NULL),(36,'设备商28','','0000-00-00 00:00:00',1,NULL,NULL),(37,'设备商29','','0000-00-00 00:00:00',1,NULL,NULL),(38,'设备商30','','0000-00-00 00:00:00',1,NULL,NULL),(39,'设备商31','','0000-00-00 00:00:00',1,NULL,NULL),(40,'设备商32','','0000-00-00 00:00:00',1,NULL,NULL),(41,'设备商33','','0000-00-00 00:00:00',1,NULL,NULL),(42,'设备商34','','0000-00-00 00:00:00',1,NULL,NULL),(43,'设备商35','','0000-00-00 00:00:00',1,NULL,NULL),(44,'设备商36','','0000-00-00 00:00:00',1,NULL,NULL),(45,'设备商37','','0000-00-00 00:00:00',1,NULL,NULL),(46,'设备商38','','0000-00-00 00:00:00',1,NULL,NULL),(47,'设备商39','','0000-00-00 00:00:00',1,NULL,NULL),(48,'设备商40','','0000-00-00 00:00:00',1,NULL,NULL),(49,'设备商41','','0000-00-00 00:00:00',1,NULL,NULL),(50,'设备商42','','0000-00-00 00:00:00',1,NULL,NULL),(51,'设备商43','','0000-00-00 00:00:00',1,NULL,NULL),(52,'设备商44','','0000-00-00 00:00:00',1,NULL,NULL),(53,'设备商45','','0000-00-00 00:00:00',1,NULL,NULL),(54,'设备商46','','0000-00-00 00:00:00',1,NULL,NULL),(55,'设备商47','','0000-00-00 00:00:00',1,NULL,NULL),(56,'设备商48','','0000-00-00 00:00:00',1,NULL,NULL),(57,'设备商49','','0000-00-00 00:00:00',1,NULL,NULL),(58,'设备商50','','0000-00-00 00:00:00',1,NULL,NULL),(59,'设备商51','','0000-00-00 00:00:00',1,NULL,NULL),(60,'设备商52','','0000-00-00 00:00:00',1,NULL,NULL),(61,'设备商53','','0000-00-00 00:00:00',1,NULL,NULL),(62,'设备商54','','0000-00-00 00:00:00',1,NULL,NULL),(63,'设备商55','','0000-00-00 00:00:00',1,NULL,NULL),(64,'设备商56','','0000-00-00 00:00:00',1,NULL,NULL),(65,'设备商57','','2014-09-16 03:21:27',1,NULL,NULL);
/*!40000 ALTER TABLE `machineprovider` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `machinetype`
--

DROP TABLE IF EXISTS `machinetype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `machinetype` (
  `mt_id` int(11) NOT NULL AUTO_INCREMENT,
  `mt_name` varchar(40) NOT NULL,
  `mt_number` varchar(40) NOT NULL,
  `mt_type` int(1) NOT NULL,
  `is_wired` int(1) NOT NULL,
  `is_keyboard` int(1) NOT NULL,
  `is_simed` int(1) NOT NULL,
  `remark` tinytext NOT NULL,
  `create_user` int(11) NOT NULL,
  `create_time` timestamp NULL DEFAULT NULL,
  `edit_user` int(11) NOT NULL,
  `edit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`mt_id`),
  UNIQUE KEY `mt_id` (`mt_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `machinetype`
--

LOCK TABLES `machinetype` WRITE;
/*!40000 ALTER TABLE `machinetype` DISABLE KEYS */;
/*!40000 ALTER TABLE `machinetype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mcc_big`
--

DROP TABLE IF EXISTS `mcc_big`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mcc_big` (
  `mb_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `remark` tinytext,
  `create_time` timestamp NULL DEFAULT NULL,
  `create_user` int(11) NOT NULL,
  `edit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `edit_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`mb_id`),
  KEY `edit_user` (`edit_user`),
  KEY `create_user` (`create_user`),
  CONSTRAINT `mcc_big_ibfk_1` FOREIGN KEY (`edit_user`) REFERENCES `user` (`u_id`),
  CONSTRAINT `mcc_big_ibfk_2` FOREIGN KEY (`create_user`) REFERENCES `user` (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mcc_big`
--

LOCK TABLES `mcc_big` WRITE;
/*!40000 ALTER TABLE `mcc_big` DISABLE KEYS */;
INSERT INTO `mcc_big` VALUES (39,'34563116','','0000-00-00 00:00:00',1,'2014-09-20 02:57:53',1),(40,'123124124','','2014-09-18 09:34:12',1,'2014-09-18 09:34:13',1),(41,'123124124','','2014-09-18 09:34:18',1,'2014-09-18 09:34:19',1),(42,'234','','2014-09-19 02:44:14',1,'2014-09-19 02:44:15',1),(43,'asdfsdw','','2014-09-19 02:44:37',1,'2014-09-19 02:44:38',1),(44,'哇哇哇','','2014-09-19 02:45:37',1,'2014-09-19 02:45:38',1),(45,'234555','','2014-09-19 02:47:05',1,'2014-09-19 02:47:06',1),(46,'234234234','','2014-09-19 02:48:38',1,'2014-09-19 02:48:39',1),(47,'2323254','','2014-09-19 02:48:56',1,'2014-09-19 02:48:57',1),(48,'水电费','','2014-09-19 02:54:55',1,'2014-09-19 02:54:56',1),(49,'定位','','2014-09-19 02:55:26',1,'2014-09-19 02:55:27',1),(50,'234','','2014-09-19 02:57:25',1,'2014-09-19 02:57:26',1),(51,'2222222','','2014-09-19 02:57:56',1,'2014-09-19 02:57:57',1),(52,'222222','','2014-09-19 02:59:19',1,'2014-09-19 02:59:20',1),(53,'2323','','2014-09-19 06:31:06',1,'2014-09-19 06:31:07',1);
/*!40000 ALTER TABLE `mcc_big` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mcc_item`
--

DROP TABLE IF EXISTS `mcc_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mcc_item` (
  `mi_id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `mb_id` int(11) NOT NULL,
  `ms_id` int(11) NOT NULL,
  `a_rate` float NOT NULL,
  `b_rate` float NOT NULL,
  `c_rate` float NOT NULL,
  `d_rate` float NOT NULL,
  `remark` int(11) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `create_user` int(11) NOT NULL,
  `edit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `edit_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`mi_id`),
  UNIQUE KEY `code` (`code`),
  KEY `create_user` (`create_user`),
  KEY `edit_user` (`edit_user`),
  KEY `mcc_item_ifbk_3` (`mb_id`),
  KEY `mcc_item_ifbk_4` (`ms_id`),
  CONSTRAINT `mcc_item_ibfk_1` FOREIGN KEY (`create_user`) REFERENCES `user` (`u_id`),
  CONSTRAINT `mcc_item_ibfk_2` FOREIGN KEY (`edit_user`) REFERENCES `user` (`u_id`),
  CONSTRAINT `mcc_item_ifbk_3` FOREIGN KEY (`mb_id`) REFERENCES `mcc_big` (`mb_id`),
  CONSTRAINT `mcc_item_ifbk_4` FOREIGN KEY (`ms_id`) REFERENCES `mcc_sub` (`ms_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mcc_item`
--

LOCK TABLES `mcc_item` WRITE;
/*!40000 ALTER TABLE `mcc_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `mcc_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mcc_sub`
--

DROP TABLE IF EXISTS `mcc_sub`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mcc_sub` (
  `ms_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `mb_id` int(11) NOT NULL,
  `remark` tinytext NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `create_user` int(11) NOT NULL,
  `edit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `edit_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`ms_id`),
  KEY `edit_user` (`edit_user`),
  KEY `create_user` (`create_user`),
  KEY `mcc_sub_ifbk_3` (`mb_id`),
  CONSTRAINT `mcc_sub_ibfk_1` FOREIGN KEY (`edit_user`) REFERENCES `user` (`u_id`),
  CONSTRAINT `mcc_sub_ibfk_2` FOREIGN KEY (`create_user`) REFERENCES `user` (`u_id`),
  CONSTRAINT `mcc_sub_ifbk_3` FOREIGN KEY (`mb_id`) REFERENCES `mcc_big` (`mb_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mcc_sub`
--

LOCK TABLES `mcc_sub` WRITE;
/*!40000 ALTER TABLE `mcc_sub` DISABLE KEYS */;
INSERT INTO `mcc_sub` VALUES (2,'222',39,'3333','2014-09-22 05:35:07',1,'2014-09-22 05:35:07',1);
/*!40000 ALTER TABLE `mcc_sub` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order` (
  `o_id` int(11) NOT NULL AUTO_INCREMENT,
  `o_user` int(11) NOT NULL,
  `o_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `m_list` mediumtext NOT NULL,
  `m_type` varchar(100) NOT NULL,
  `mp_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `pay_state` int(4) NOT NULL,
  `pay_remark` mediumtext,
  `c_id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `sum_price` int(11) NOT NULL,
  `create_user` int(11) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `edit_user` int(11) DEFAULT NULL,
  `edit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`o_id`),
  KEY `create_user` (`create_user`),
  KEY `edit_user` (`edit_user`),
  KEY `order_company_constraint` (`c_id`),
  KEY `order_ifbk_3` (`mp_id`),
  KEY `order_ifbk_4` (`o_user`),
  CONSTRAINT `order_company_constraint` FOREIGN KEY (`c_id`) REFERENCES `company` (`c_id`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`create_user`) REFERENCES `user` (`u_id`),
  CONSTRAINT `order_ibfk_2` FOREIGN KEY (`edit_user`) REFERENCES `user` (`u_id`),
  CONSTRAINT `order_ifbk_3` FOREIGN KEY (`mp_id`) REFERENCES `machineprovider` (`mp_id`),
  CONSTRAINT `order_ifbk_4` FOREIGN KEY (`o_user`) REFERENCES `user` (`u_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `task` (
  `t_id` int(11) NOT NULL AUTO_INCREMENT,
  `t_type` int(11) NOT NULL,
  `create_user` int(11) NOT NULL,
  `ac_user` int(11) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `vertification` text NOT NULL,
  `ac_time` timestamp NULL DEFAULT NULL,
  `finish_time` timestamp NULL DEFAULT NULL,
  `dispatch_time` timestamp NULL DEFAULT NULL,
  `c_id` int(11) NOT NULL,
  `m_id` int(11) NOT NULL,
  `edit_user` int(11) DEFAULT NULL,
  `edit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`t_id`),
  KEY `edit_user` (`edit_user`),
  KEY `create_user` (`create_user`),
  KEY `task_cu_constraint` (`ac_user`),
  KEY `task_tc_constraint` (`c_id`),
  KEY `task_tm_constraint` (`m_id`),
  CONSTRAINT `task_cu_constraint` FOREIGN KEY (`ac_user`) REFERENCES `user` (`u_id`),
  CONSTRAINT `task_ibfk_1` FOREIGN KEY (`edit_user`) REFERENCES `user` (`u_id`),
  CONSTRAINT `task_ibfk_2` FOREIGN KEY (`create_user`) REFERENCES `user` (`u_id`),
  CONSTRAINT `task_tc_constraint` FOREIGN KEY (`c_id`) REFERENCES `company` (`c_id`),
  CONSTRAINT `task_tm_constraint` FOREIGN KEY (`m_id`) REFERENCES `machine` (`m_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `u_id` int(11) NOT NULL AUTO_INCREMENT,
  `auth` varchar(500) NOT NULL,
  `name` varchar(100) NOT NULL,
  `pwd` varchar(100) NOT NULL,
  `account` varchar(100) NOT NULL,
  `c_id` int(11) NOT NULL,
  `create_user` int(11) NOT NULL,
  `create_time` timestamp NULL DEFAULT NULL,
  `edit_user` int(11) NOT NULL,
  `edit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`u_id`),
  KEY `c_id` (`c_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`c_id`) REFERENCES `company` (`c_id`),
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`c_id`) REFERENCES `company` (`c_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'manageStorage,manageSupplier,manageMachineType,addMachine,viewStorage,manageDeploy,operation,manageMccBig,manageMccSmall,manageMccItem,manageClientPlatform,mangeRate,manageClientAttr,areaManage,areaProvince,areaCity,areaDistrict,setupApply,setupRegister,checkRegister,returnRegister,applyApprove,taskDispatch,staffManage,companyManage,','开起我亲爱的小耗子','21232f297a57a5a743894a0e4a801fc3','21232f297a57a5a743894a0e4a801fc3',1,0,'0000-00-00 00:00:00',0,'2014-09-23 01:38:39'),(7,'manageStorage,manageSupplier,manageMachineType,addMachine,viewStorage,manageDeploy,','王大可','202cb962ac59075b964b07152d234b70','202cb962ac59075b964b07152d234b70',1,1,'2014-09-20 13:45:47',1,'2014-09-20 13:45:48'),(8,'manageStorage,manageSupplier,manageMachineType,addMachine,viewStorage,manageDeploy,','王大可','7c4f29407893c334a6cb7a87bf045c0d','7c4f29407893c334a6cb7a87bf045c0d',1,1,'2014-09-20 13:48:12',1,'2014-09-20 13:48:13'),(9,'manageStorage,manageSupplier,manageMachineType,addMachine,viewStorage,manageDeploy,','王大锤','40be4e59b9a2a2b5dffb918c0e86b3d7','40be4e59b9a2a2b5dffb918c0e86b3d7',1,1,'2014-09-20 13:48:45',1,'2014-09-20 13:48:46'),(11,'','asd','670da91be64127c92faac35c8300e814','d2f2297d6e829cd3493aa7de4416a18f',1,1,'2014-09-20 16:49:09',1,'2014-09-20 16:49:10'),(12,'manageStorage,manageSupplier,manageMachineType,addMachine,viewStorage,manageDeploy,operation,manageMccBig,manageMccSmall,manageMccItem,manageClientPlatform,mangeRate,manageClientAttr,','ewqq','4eae35f1b35977a00ebd8086c259d4c9','4eae35f1b35977a00ebd8086c259d4c9',1,1,'2014-09-20 16:49:55',1,'2014-09-20 16:49:56');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-09-23 20:53:26
