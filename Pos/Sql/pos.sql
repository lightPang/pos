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
-- Table structure for table `bank`
--

DROP TABLE IF EXISTS `bank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bank` (
  `b_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `create_time` datetime NOT NULL,
  `create_user` int(11) NOT NULL,
  `edit_time` datetime NOT NULL,
  `edit_user` int(11) NOT NULL,
  `code` varchar(20) NOT NULL,
  PRIMARY KEY (`b_id`)
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
  `info` tinytext NOT NULL,
  `create_time` datetime NOT NULL,
  `create_user` int(11) NOT NULL,
  `edit_time` datetime NOT NULL,
  `edit_user` int(11) NOT NULL,
  PRIMARY KEY (`ca_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_attr`
--

LOCK TABLES `client_attr` WRITE;
/*!40000 ALTER TABLE `client_attr` DISABLE KEYS */;
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
  `info` tinytext NOT NULL,
  `create_user` int(11) NOT NULL,
  `create_time` int(11) NOT NULL,
  `edit_user` int(11) NOT NULL,
  `edit_time` int(11) NOT NULL,
  PRIMARY KEY (`cp_id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_platform`
--

LOCK TABLES `client_platform` WRITE;
/*!40000 ALTER TABLE `client_platform` DISABLE KEYS */;
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
  `info` tinytext NOT NULL,
  `create_time` datetime NOT NULL,
  `create_user` int(11) NOT NULL,
  `edit_time` datetime NOT NULL,
  `edit_user` int(11) NOT NULL,
  PRIMARY KEY (`cr_id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_rate`
--

LOCK TABLES `client_rate` WRITE;
/*!40000 ALTER TABLE `client_rate` DISABLE KEYS */;
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
  PRIMARY KEY (`c_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
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
  `create_time` datetime NOT NULL,
  `create_user` int(11) NOT NULL,
  `edit_time` datetime DEFAULT NULL,
  `edit_user` int(11) DEFAULT NULL,
  `state` int(11) DEFAULT NULL,
  `remark` tinytext,
  PRIMARY KEY (`do_id`)
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
  `create_time` datetime NOT NULL,
  `create_user` int(11) NOT NULL,
  `edit_time` datetime DEFAULT NULL,
  `edit_user` int(11) DEFAULT NULL,
  `state` int(11) DEFAULT NULL,
  `remark` tinytext,
  PRIMARY KEY (`do_id`)
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
  `m_bank` int(11) DEFAULT NULL,
  `m_type` int(4) DEFAULT NULL,
  `m_tcode` varchar(40) DEFAULT NULL,
  `m_bcode` varchar(40) DEFAULT NULL,
  `check_list` longtext,
  `check_time` date DEFAULT NULL,
  `state` int(4) DEFAULT NULL,
  `a_id` int(11) DEFAULT NULL,
  `o_id` int(4) NOT NULL,
  `r_id` int(4) DEFAULT NULL,
  `c_id` int(11) NOT NULL,
  `create_user` int(11) NOT NULL,
  `create_time` datetime NOT NULL,
  `edit_user` int(11) NOT NULL,
  `edit_time` datetime NOT NULL,
  PRIMARY KEY (`m_id`),
  UNIQUE KEY `m_code` (`m_code`,`m_tcode`)
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
  `remark` tinyint(4) DEFAULT NULL,
  `create_time` datetime NOT NULL,
  `create_user` int(11) NOT NULL,
  `edit_time` datetime DEFAULT NULL,
  `edit_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`mp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `machineprovider`
--

LOCK TABLES `machineprovider` WRITE;
/*!40000 ALTER TABLE `machineprovider` DISABLE KEYS */;
/*!40000 ALTER TABLE `machineprovider` ENABLE KEYS */;
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
  `info` tinytext NOT NULL,
  `create_time` datetime NOT NULL,
  `create_user` int(11) NOT NULL,
  `edit_time` datetime NOT NULL,
  `edit_user` int(11) NOT NULL,
  PRIMARY KEY (`mb_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mcc_big`
--

LOCK TABLES `mcc_big` WRITE;
/*!40000 ALTER TABLE `mcc_big` DISABLE KEYS */;
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
  `info` int(11) NOT NULL,
  `create_time` datetime NOT NULL,
  `create_user` int(11) NOT NULL,
  `edit_time` datetime NOT NULL,
  `edit_user` int(11) NOT NULL,
  PRIMARY KEY (`mi_id`),
  UNIQUE KEY `code` (`code`)
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
  `info` tinytext NOT NULL,
  `create_time` datetime NOT NULL,
  `create_user` int(11) NOT NULL,
  `edit_time` int(11) NOT NULL,
  `edit_user` int(11) NOT NULL,
  PRIMARY KEY (`ms_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mcc_sub`
--

LOCK TABLES `mcc_sub` WRITE;
/*!40000 ALTER TABLE `mcc_sub` DISABLE KEYS */;
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
  `o_time` date NOT NULL,
  `m_list` mediumtext NOT NULL,
  `m_type` varchar(100) NOT NULL,
  `m_fact` varchar(30) NOT NULL,
  `quantity` int(11) NOT NULL,
  `pay_state` int(4) NOT NULL,
  `pay_remark` mediumtext,
  `c_id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `sum_price` int(11) NOT NULL,
  `create_user` int(11) NOT NULL,
  `create_time` datetime NOT NULL,
  `edit_user` int(11) NOT NULL,
  `edit_time` datetime NOT NULL,
  PRIMARY KEY (`o_id`)
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
  `create_time` date NOT NULL,
  `vertification` text NOT NULL,
  `ac_time` date DEFAULT NULL,
  `finish_time` date DEFAULT NULL,
  `dispatch_time` date DEFAULT NULL,
  `c_id` int(11) NOT NULL,
  `m_id` int(11) NOT NULL,
  `edit_user` int(11) NOT NULL,
  `edit_time` datetime NOT NULL,
  PRIMARY KEY (`t_id`)
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
  `auth` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `pwd` varchar(100) NOT NULL,
  `account` varchar(100) NOT NULL,
  `c_id` int(11) NOT NULL,
  PRIMARY KEY (`u_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
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


-- Dump completed on 2014-09-15 16:26:34
>>>>>>> master
