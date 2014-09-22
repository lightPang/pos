-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2014-09-22 03:31:27
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
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `create_user` int(11) NOT NULL,
  `edit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
  `remark` tinytext NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `create_user` int(11) NOT NULL,
  `edit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
  `remark` tinytext NOT NULL,
  `create_user` int(11) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `edit_user` int(11) DEFAULT NULL,
  `edit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
  `remark` tinytext NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `create_user` int(11) NOT NULL,
  `edit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
  `remark` tinytext NOT NULL,
  `edit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `edit_user` int(11) NOT NULL,
  `create_user` int(11) NOT NULL,
  `create_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`c_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- 转存表中的数据 `company`
--

INSERT INTO `company` (`c_id`, `name`, `type`, `remark`, `edit_time`, `edit_user`, `create_user`, `create_time`) VALUES
(1, '中国银行534分行', 1, '', '2014-09-20 08:09:14', 1, 0, NULL),
(2, '增城公司', 0, '', '2014-09-20 08:09:26', 1, 1, '2014-09-20 08:09:25'),
(3, '增城公司', 0, '', '2014-09-20 08:09:37', 1, 1, '2014-09-20 08:09:36'),
(4, '增城公司', 0, '', '2014-09-20 08:11:09', 1, 1, '2014-09-20 08:11:08'),
(5, '增城公司', 0, '', '2014-09-20 08:11:24', 1, 1, '2014-09-20 08:11:23'),
(6, '增城公司', 0, '', '2014-09-20 08:11:30', 1, 1, '2014-09-20 08:11:29'),
(7, '增城公司', 0, '', '2014-09-20 08:11:55', 1, 1, '2014-09-20 08:11:54'),
(8, '增城分公司', 0, '', '2014-09-20 08:12:28', 1, 1, '2014-09-20 08:12:27'),
(9, '湛江分公司', 0, '', '2014-09-20 08:13:25', 1, 1, '2014-09-20 08:13:24');

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
  KEY `deployorder_ifbk_5` (`target_c`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `machine`
--

CREATE TABLE IF NOT EXISTS `machine` (
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
  KEY `machine_ifbk_7` (`c_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `machineprovider`
--

CREATE TABLE IF NOT EXISTS `machineprovider` (
  `mp_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `remark` tinytext,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `create_user` int(11) NOT NULL,
  `edit_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `edit_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`mp_id`),
  KEY `create_user` (`create_user`),
  KEY `edit_user` (`edit_user`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=69 ;

--
-- 转存表中的数据 `machineprovider`
--

INSERT INTO `machineprovider` (`mp_id`, `name`, `remark`, `create_time`, `create_user`, `edit_time`, `edit_user`) VALUES
(1, '大耗子hh', '小耗子', '2014-09-16 09:42:07', 1, '2014-09-21 12:45:41', 1),
(66, '123', '321', '2014-09-21 12:30:52', 1, '2014-09-21 12:30:52', 1),
(67, '1111', '', '2014-09-21 12:42:00', 1, '2014-09-21 12:42:00', 1),
(68, '11111', '', '2014-09-21 12:42:50', 1, '2014-09-21 12:42:50', 1);

-- --------------------------------------------------------

--
-- 表的结构 `machinetype`
--

CREATE TABLE IF NOT EXISTS `machinetype` (
  `mt_id` int(11) NOT NULL,
  `mt_name` varchar(40) NOT NULL,
  `mt_number` varchar(40) NOT NULL,
  `mt_type` int(1) NOT NULL,
  `is_wired` int(1) NOT NULL,
  `is_keyboard` int(1) NOT NULL,
  `is_simed` int(1) NOT NULL,
  `remark` tinytext NOT NULL,
  `create_user` int(11) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `edit_user` int(11) NOT NULL,
  `edit_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  KEY `create_user` (`create_user`),
  KEY `edit_user` (`edit_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `mcc_big`
--

CREATE TABLE IF NOT EXISTS `mcc_big` (
  `mb_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `remark` tinytext,
  `create_time` timestamp NULL DEFAULT NULL,
  `create_user` int(11) NOT NULL,
  `edit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `edit_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`mb_id`),
  KEY `edit_user` (`edit_user`),
  KEY `create_user` (`create_user`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=54 ;

--
-- 转存表中的数据 `mcc_big`
--

INSERT INTO `mcc_big` (`mb_id`, `name`, `remark`, `create_time`, `create_user`, `edit_time`, `edit_user`) VALUES
(39, '34563116', '', '0000-00-00 00:00:00', 1, '2014-09-20 02:57:53', 1),
(40, '123124124', '', '2014-09-18 09:34:12', 1, '2014-09-18 09:34:13', 1),
(41, '123124124', '', '2014-09-18 09:34:18', 1, '2014-09-18 09:34:19', 1),
(42, '234', '', '2014-09-19 02:44:14', 1, '2014-09-19 02:44:15', 1),
(43, 'asdfsdw', '', '2014-09-19 02:44:37', 1, '2014-09-19 02:44:38', 1),
(44, '哇哇哇', '', '2014-09-19 02:45:37', 1, '2014-09-19 02:45:38', 1),
(45, '234555', '', '2014-09-19 02:47:05', 1, '2014-09-19 02:47:06', 1),
(46, '234234234', '', '2014-09-19 02:48:38', 1, '2014-09-19 02:48:39', 1),
(47, '2323254', '', '2014-09-19 02:48:56', 1, '2014-09-19 02:48:57', 1),
(48, '水电费', '', '2014-09-19 02:54:55', 1, '2014-09-19 02:54:56', 1),
(49, '定位', '', '2014-09-19 02:55:26', 1, '2014-09-19 02:55:27', 1),
(50, '234', '', '2014-09-19 02:57:25', 1, '2014-09-19 02:57:26', 1),
(51, '2222222', '', '2014-09-19 02:57:56', 1, '2014-09-19 02:57:57', 1),
(52, '222222', '', '2014-09-19 02:59:19', 1, '2014-09-19 02:59:20', 1),
(53, '2323', '', '2014-09-19 06:31:06', 1, '2014-09-19 06:31:07', 1);

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
  KEY `mcc_item_ifbk_4` (`ms_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `mcc_sub`
--

CREATE TABLE IF NOT EXISTS `mcc_sub` (
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
  KEY `mcc_sub_ifbk_3` (`mb_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `order`
--

CREATE TABLE IF NOT EXISTS `order` (
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
  KEY `order_ifbk_4` (`o_user`)
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
  KEY `task_tm_constraint` (`m_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
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
  KEY `c_id` (`c_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13 ;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`u_id`, `auth`, `name`, `pwd`, `account`, `c_id`, `create_user`, `create_time`, `edit_user`, `edit_time`) VALUES
(1, 'manageStorage,manageSupplier,manageMachineType,addMachine,viewStorage,manageDeploy,operation,manageMccBig,manageMccSmall,manageMccItem,manageClientPlatform,mangeRate,manageClientAttr,', '开起我亲爱的小耗子', '21232f297a57a5a743894a0e4a801fc3', '21232f297a57a5a743894a0e4a801fc3', 1, 0, '0000-00-00 00:00:00', 0, '2014-09-20 17:02:20'),
(7, 'manageStorage,manageSupplier,manageMachineType,addMachine,viewStorage,manageDeploy,', '王大可', '202cb962ac59075b964b07152d234b70', '202cb962ac59075b964b07152d234b70', 1, 1, '2014-09-20 13:45:47', 1, '2014-09-20 13:45:48'),
(8, 'manageStorage,manageSupplier,manageMachineType,addMachine,viewStorage,manageDeploy,', '王大可', '7c4f29407893c334a6cb7a87bf045c0d', '7c4f29407893c334a6cb7a87bf045c0d', 1, 1, '2014-09-20 13:48:12', 1, '2014-09-20 13:48:13'),
(9, 'manageStorage,manageSupplier,manageMachineType,addMachine,viewStorage,manageDeploy,', '王大锤', '40be4e59b9a2a2b5dffb918c0e86b3d7', '40be4e59b9a2a2b5dffb918c0e86b3d7', 1, 1, '2014-09-20 13:48:45', 1, '2014-09-20 13:48:46'),
(11, '', 'asd', '670da91be64127c92faac35c8300e814', 'd2f2297d6e829cd3493aa7de4416a18f', 1, 1, '2014-09-20 16:49:09', 1, '2014-09-20 16:49:10'),
(12, 'manageStorage,manageSupplier,manageMachineType,addMachine,viewStorage,manageDeploy,operation,manageMccBig,manageMccSmall,manageMccItem,manageClientPlatform,mangeRate,manageClientAttr,', 'ewqq', '4eae35f1b35977a00ebd8086c259d4c9', '4eae35f1b35977a00ebd8086c259d4c9', 1, 1, '2014-09-20 16:49:55', 1, '2014-09-20 16:49:56');

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
  ADD CONSTRAINT `deployorder_ibfk_1` FOREIGN KEY (`create_user`) REFERENCES `user` (`u_id`),
  ADD CONSTRAINT `deployorder_ibfk_2` FOREIGN KEY (`edit_user`) REFERENCES `user` (`u_id`),
  ADD CONSTRAINT `deployorder_ibfk_3` FOREIGN KEY (`m_id`) REFERENCES `machine` (`m_id`),
  ADD CONSTRAINT `deployorder_ifbk_4` FOREIGN KEY (`source_c`) REFERENCES `company` (`c_id`),
  ADD CONSTRAINT `deployorder_ifbk_5` FOREIGN KEY (`target_c`) REFERENCES `company` (`c_id`),
  ADD CONSTRAINT `do_dom_constraint` FOREIGN KEY (`m_id`) REFERENCES `machine` (`m_id`);

--
-- 限制表 `machine`
--
ALTER TABLE `machine`
  ADD CONSTRAINT `machine_ibfk_1` FOREIGN KEY (`create_user`) REFERENCES `user` (`u_id`),
  ADD CONSTRAINT `machine_ibfk_2` FOREIGN KEY (`edit_user`) REFERENCES `user` (`u_id`),
  ADD CONSTRAINT `machine_ifbk4` FOREIGN KEY (`task_apply_id`) REFERENCES `task` (`t_id`),
  ADD CONSTRAINT `machine_ifbk5` FOREIGN KEY (`task_return_id`) REFERENCES `task` (`t_id`),
  ADD CONSTRAINT `machine_ifbk_3` FOREIGN KEY (`b_id`) REFERENCES `bank` (`b_id`),
  ADD CONSTRAINT `machine_ifbk_6` FOREIGN KEY (`o_id`) REFERENCES `order` (`o_id`),
  ADD CONSTRAINT `machine_ifbk_7` FOREIGN KEY (`c_id`) REFERENCES `company` (`c_id`);

--
-- 限制表 `machineprovider`
--
ALTER TABLE `machineprovider`
  ADD CONSTRAINT `machineprovider_ibfk_1` FOREIGN KEY (`create_user`) REFERENCES `user` (`u_id`),
  ADD CONSTRAINT `machineprovider_ibfk_2` FOREIGN KEY (`edit_user`) REFERENCES `user` (`u_id`);

--
-- 限制表 `machinetype`
--
ALTER TABLE `machinetype`
  ADD CONSTRAINT `machinetype_ibfk_2` FOREIGN KEY (`edit_user`) REFERENCES `user` (`u_id`),
  ADD CONSTRAINT `machinetype_ibfk_1` FOREIGN KEY (`create_user`) REFERENCES `user` (`u_id`);

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
  ADD CONSTRAINT `mcc_item_ibfk_2` FOREIGN KEY (`edit_user`) REFERENCES `user` (`u_id`),
  ADD CONSTRAINT `mcc_item_ifbk_3` FOREIGN KEY (`mb_id`) REFERENCES `mcc_big` (`mb_id`),
  ADD CONSTRAINT `mcc_item_ifbk_4` FOREIGN KEY (`ms_id`) REFERENCES `mcc_sub` (`ms_id`);

--
-- 限制表 `mcc_sub`
--
ALTER TABLE `mcc_sub`
  ADD CONSTRAINT `mcc_sub_ibfk_1` FOREIGN KEY (`edit_user`) REFERENCES `user` (`u_id`),
  ADD CONSTRAINT `mcc_sub_ibfk_2` FOREIGN KEY (`create_user`) REFERENCES `user` (`u_id`),
  ADD CONSTRAINT `mcc_sub_ifbk_3` FOREIGN KEY (`mb_id`) REFERENCES `mcc_big` (`mb_id`);

--
-- 限制表 `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_company_constraint` FOREIGN KEY (`c_id`) REFERENCES `company` (`c_id`),
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`create_user`) REFERENCES `user` (`u_id`),
  ADD CONSTRAINT `order_ibfk_2` FOREIGN KEY (`edit_user`) REFERENCES `user` (`u_id`),
  ADD CONSTRAINT `order_ifbk_3` FOREIGN KEY (`mp_id`) REFERENCES `machineprovider` (`mp_id`),
  ADD CONSTRAINT `order_ifbk_4` FOREIGN KEY (`o_user`) REFERENCES `user` (`u_id`);

--
-- 限制表 `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `task_cu_constraint` FOREIGN KEY (`ac_user`) REFERENCES `user` (`u_id`),
  ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY (`edit_user`) REFERENCES `user` (`u_id`),
  ADD CONSTRAINT `task_ibfk_2` FOREIGN KEY (`create_user`) REFERENCES `user` (`u_id`),
  ADD CONSTRAINT `task_tc_constraint` FOREIGN KEY (`c_id`) REFERENCES `company` (`c_id`),
  ADD CONSTRAINT `task_tm_constraint` FOREIGN KEY (`m_id`) REFERENCES `machine` (`m_id`);

--
-- 限制表 `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`c_id`) REFERENCES `company` (`c_id`),
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`c_id`) REFERENCES `company` (`c_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
