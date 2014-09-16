-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2014-09-16 13:42:44
-- 服务器版本： 5.6.16
-- PHP Version: 5.5.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `pos`
--

-- --------------------------------------------------------

--
-- 表的结构 `bank`
--

CREATE TABLE IF NOT EXISTS `bank` (
  `b_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_user` int(11) NOT NULL,
  `edit_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `edit_user` int(11) DEFAULT NULL,
  `code` varchar(20) NOT NULL,
  PRIMARY KEY (`b_id`),
  KEY `create_user` (`create_user`),
  KEY `edit_user` (`edit_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `client_attr`
--

CREATE TABLE IF NOT EXISTS `client_attr` (
  `ca_id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `info` tinytext NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_user` int(11) NOT NULL,
  `edit_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `edit_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`ca_id`),
  KEY `edit_user` (`edit_user`),
  KEY `create_user` (`create_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `client_platform`
--

CREATE TABLE IF NOT EXISTS `client_platform` (
  `cp_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `code` varchar(20) NOT NULL,
  `info` tinytext NOT NULL,
  `create_user` int(11) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `edit_user` int(11) DEFAULT NULL,
  `edit_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`cp_id`),
  UNIQUE KEY `code` (`code`),
  KEY `create_user` (`create_user`),
  KEY `edit_user` (`edit_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `client_rate`
--

CREATE TABLE IF NOT EXISTS `client_rate` (
  `cr_id` int(11) NOT NULL AUTO_INCREMENT,
  `rate` int(11) NOT NULL,
  `code` varchar(20) NOT NULL,
  `info` tinytext NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_user` int(11) NOT NULL,
  `edit_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `edit_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`cr_id`),
  UNIQUE KEY `code` (`code`),
  KEY `edit_user` (`edit_user`),
  KEY `create_user` (`create_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `company`
--

CREATE TABLE IF NOT EXISTS `company` (
  `c_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `type` int(11) NOT NULL,
  PRIMARY KEY (`c_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `company`
--

INSERT INTO `company` (`c_id`, `name`, `type`) VALUES
(1, '中国银行534分行', 1);

-- --------------------------------------------------------

--
-- 表的结构 `deployorder`
--

CREATE TABLE IF NOT EXISTS `deployorder` (
  `do_id` int(11) NOT NULL AUTO_INCREMENT,
  `source_c` int(11) NOT NULL,
  `target_c` int(11) NOT NULL,
  `m_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_user` int(11) NOT NULL,
  `edit_time` timestamp NULL DEFAULT NULL,
  `edit_user` int(11) DEFAULT NULL,
  `state` int(11) DEFAULT NULL,
  `remark` tinytext,
  PRIMARY KEY (`do_id`),
  KEY `create_user` (`create_user`),
  KEY `edit_user` (`edit_user`),
  KEY `m_id` (`m_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `machine`
--

CREATE TABLE IF NOT EXISTS `machine` (
  `m_id` int(11) NOT NULL AUTO_INCREMENT,
  `m_code` varchar(40) NOT NULL,
  `m_bank` int(11) DEFAULT NULL,
  `m_type` int(4) DEFAULT NULL,
  `m_tcode` varchar(40) DEFAULT NULL,
  `m_bcode` varchar(40) DEFAULT NULL,
  `check_list` longtext,
  `check_time` timestamp NULL DEFAULT NULL,
  `state` int(4) DEFAULT NULL,
  `a_id` int(11) DEFAULT NULL,
  `o_id` int(4) NOT NULL,
  `r_id` int(4) DEFAULT NULL,
  `c_id` int(11) NOT NULL,
  `create_user` int(11) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `edit_user` int(11) DEFAULT NULL,
  `edit_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`m_id`),
  UNIQUE KEY `m_code` (`m_code`,`m_tcode`),
  KEY `create_user` (`create_user`),
  KEY `edit_user` (`edit_user`),
  KEY `m_bank` (`m_bank`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `machine`
--

INSERT INTO `machine` (`m_id`, `m_code`, `m_bank`, `m_type`, `m_tcode`, `m_bcode`, `check_list`, `check_time`, `state`, `a_id`, `o_id`, `r_id`, `c_id`, `create_user`, `create_time`, `edit_user`, `edit_time`) VALUES
(3, '52', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 0, 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00'),
(4, '52', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 0, 1, '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00'),
(6, '52', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 0, 1, '0000-00-00 00:00:00', NULL, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- 表的结构 `machineprovider`
--

CREATE TABLE IF NOT EXISTS `machineprovider` (
  `mp_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `remark` tinytext,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_user` int(11) NOT NULL,
  `edit_time` timestamp NULL DEFAULT NULL,
  `edit_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`mp_id`),
  KEY `create_user` (`create_user`),
  KEY `edit_user` (`edit_user`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=66 ;

--
-- 转存表中的数据 `machineprovider`
--

INSERT INTO `machineprovider` (`mp_id`, `name`, `remark`, `create_time`, `create_user`, `edit_time`, `edit_user`) VALUES
(1, '大耗子', '小耗子', '2014-09-16 09:42:07', 1, NULL, NULL),
(8, '大耗子大', '小耗子', '0000-00-00 00:00:00', 1, NULL, NULL),
(9, '设备商1', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(10, '设备商2', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(11, '设备商3', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(12, '设备商4', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(13, '设备商5', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(14, '设备商6', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(15, '设备商7', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(16, '设备商8', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(17, '设备商9', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(18, '设备商10', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(19, '设备商11', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(20, '设备商12', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(21, '设备商13', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(22, '设备商14', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(23, '设备商15', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(24, '设备商16', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(25, '设备商17', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(26, '设备商18', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(27, '设备商19', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(28, '设备商20', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(29, '设备商21', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(30, '设备商22', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(31, '设备商23', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(32, '设备商24', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(33, '设备商25', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(34, '设备商26', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(35, '设备商27', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(36, '设备商28', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(37, '设备商29', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(38, '设备商30', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(39, '设备商31', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(40, '设备商32', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(41, '设备商33', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(42, '设备商34', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(43, '设备商35', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(44, '设备商36', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(45, '设备商37', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(46, '设备商38', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(47, '设备商39', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(48, '设备商40', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(49, '设备商41', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(50, '设备商42', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(51, '设备商43', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(52, '设备商44', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(53, '设备商45', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(54, '设备商46', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(55, '设备商47', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(56, '设备商48', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(57, '设备商49', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(58, '设备商50', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(59, '设备商51', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(60, '设备商52', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(61, '设备商53', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(62, '设备商54', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(63, '设备商55', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(64, '设备商56', '', '0000-00-00 00:00:00', 1, NULL, NULL),
(65, '设备商57', '', '2014-09-16 03:21:27', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `mcc_big`
--

CREATE TABLE IF NOT EXISTS `mcc_big` (
  `mb_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `info` tinytext NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_user` int(11) NOT NULL,
  `edit_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `edit_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`mb_id`),
  KEY `edit_user` (`edit_user`),
  KEY `create_user` (`create_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `mcc_item`
--

CREATE TABLE IF NOT EXISTS `mcc_item` (
  `mi_id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `mb_id` int(11) NOT NULL,
  `ms_id` int(11) NOT NULL,
  `a_rate` float NOT NULL,
  `b_rate` float NOT NULL,
  `c_rate` float NOT NULL,
  `d_rate` float NOT NULL,
  `info` int(11) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_user` int(11) NOT NULL,
  `edit_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `edit_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`mi_id`),
  UNIQUE KEY `code` (`code`),
  KEY `create_user` (`create_user`),
  KEY `edit_user` (`edit_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `mcc_sub`
--

CREATE TABLE IF NOT EXISTS `mcc_sub` (
  `ms_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `mb_id` int(11) NOT NULL,
  `info` tinytext NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_user` int(11) NOT NULL,
  `edit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `edit_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`ms_id`),
  KEY `edit_user` (`edit_user`),
  KEY `create_user` (`create_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `order`
--

CREATE TABLE IF NOT EXISTS `order` (
  `o_id` int(11) NOT NULL AUTO_INCREMENT,
  `o_user` int(11) NOT NULL,
  `o_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `edit_user` int(11) DEFAULT NULL,
  `edit_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`o_id`),
  KEY `create_user` (`create_user`),
  KEY `edit_user` (`edit_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `task`
--

CREATE TABLE IF NOT EXISTS `task` (
  `t_id` int(11) NOT NULL AUTO_INCREMENT,
  `t_type` int(11) NOT NULL,
  `create_user` int(11) NOT NULL,
  `ac_user` int(11) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
  KEY `create_user` (`create_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `u_id` int(11) NOT NULL AUTO_INCREMENT,
  `auth` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `pwd` varchar(100) NOT NULL,
  `account` varchar(100) NOT NULL,
  `c_id` int(11) NOT NULL,
  PRIMARY KEY (`u_id`),
  KEY `c_id` (`c_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`u_id`, `auth`, `name`, `pwd`, `account`, `c_id`) VALUES
(1, 0, '开起我亲爱的小耗子', '21232f297a57a5a743894a0e4a801fc3', '21232f297a57a5a743894a0e4a801fc3', 1);

--
-- 限制导出的表
--

--
-- 限制表 `bank`
--
ALTER TABLE `bank`
  ADD CONSTRAINT `bank_ibfk_1` FOREIGN KEY (`create_user`) REFERENCES `user` (`u_id`),
  ADD CONSTRAINT `bank_ibfk_2` FOREIGN KEY (`edit_user`) REFERENCES `user` (`u_id`);

--
-- 限制表 `client_attr`
--
ALTER TABLE `client_attr`
  ADD CONSTRAINT `client_attr_ibfk_1` FOREIGN KEY (`edit_user`) REFERENCES `user` (`u_id`),
  ADD CONSTRAINT `client_attr_ibfk_2` FOREIGN KEY (`create_user`) REFERENCES `user` (`u_id`);

--
-- 限制表 `client_platform`
--
ALTER TABLE `client_platform`
  ADD CONSTRAINT `client_platform_ibfk_1` FOREIGN KEY (`create_user`) REFERENCES `user` (`u_id`),
  ADD CONSTRAINT `client_platform_ibfk_2` FOREIGN KEY (`edit_user`) REFERENCES `user` (`u_id`);

--
-- 限制表 `client_rate`
--
ALTER TABLE `client_rate`
  ADD CONSTRAINT `client_rate_ibfk_1` FOREIGN KEY (`edit_user`) REFERENCES `user` (`u_id`),
  ADD CONSTRAINT `client_rate_ibfk_2` FOREIGN KEY (`create_user`) REFERENCES `user` (`u_id`);

--
-- 限制表 `deployorder`
--
ALTER TABLE `deployorder`
  ADD CONSTRAINT `deployorder_ibfk_3` FOREIGN KEY (`m_id`) REFERENCES `machine` (`m_id`),
  ADD CONSTRAINT `deployorder_ibfk_1` FOREIGN KEY (`create_user`) REFERENCES `user` (`u_id`),
  ADD CONSTRAINT `deployorder_ibfk_2` FOREIGN KEY (`edit_user`) REFERENCES `user` (`u_id`);

--
-- 限制表 `machine`
--
ALTER TABLE `machine`
  ADD CONSTRAINT `machine_ibfk_1` FOREIGN KEY (`create_user`) REFERENCES `user` (`u_id`),
  ADD CONSTRAINT `machine_ibfk_2` FOREIGN KEY (`edit_user`) REFERENCES `user` (`u_id`),
  ADD CONSTRAINT `machine_ibfk_3` FOREIGN KEY (`m_bank`) REFERENCES `bank` (`b_id`);

--
-- 限制表 `machineprovider`
--
ALTER TABLE `machineprovider`
  ADD CONSTRAINT `machineprovider_ibfk_2` FOREIGN KEY (`edit_user`) REFERENCES `user` (`u_id`),
  ADD CONSTRAINT `machineprovider_ibfk_1` FOREIGN KEY (`create_user`) REFERENCES `user` (`u_id`);

--
-- 限制表 `mcc_big`
--
ALTER TABLE `mcc_big`
  ADD CONSTRAINT `mcc_big_ibfk_1` FOREIGN KEY (`edit_user`) REFERENCES `user` (`u_id`),
  ADD CONSTRAINT `mcc_big_ibfk_2` FOREIGN KEY (`create_user`) REFERENCES `user` (`u_id`);

--
-- 限制表 `mcc_item`
--
ALTER TABLE `mcc_item`
  ADD CONSTRAINT `mcc_item_ibfk_1` FOREIGN KEY (`create_user`) REFERENCES `user` (`u_id`),
  ADD CONSTRAINT `mcc_item_ibfk_2` FOREIGN KEY (`edit_user`) REFERENCES `user` (`u_id`);

--
-- 限制表 `mcc_sub`
--
ALTER TABLE `mcc_sub`
  ADD CONSTRAINT `mcc_sub_ibfk_1` FOREIGN KEY (`edit_user`) REFERENCES `user` (`u_id`),
  ADD CONSTRAINT `mcc_sub_ibfk_2` FOREIGN KEY (`create_user`) REFERENCES `user` (`u_id`);

--
-- 限制表 `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`create_user`) REFERENCES `user` (`u_id`),
  ADD CONSTRAINT `order_ibfk_2` FOREIGN KEY (`edit_user`) REFERENCES `user` (`u_id`);

--
-- 限制表 `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY (`edit_user`) REFERENCES `user` (`u_id`),
  ADD CONSTRAINT `task_ibfk_2` FOREIGN KEY (`create_user`) REFERENCES `user` (`u_id`);

--
-- 限制表 `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`c_id`) REFERENCES `company` (`c_id`),
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`c_id`) REFERENCES `company` (`c_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
