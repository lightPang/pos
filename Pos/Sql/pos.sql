-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2014-09-15 11:39:23
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
  `edit_user` int(11) NOT NULL,
  `code` varchar(20) NOT NULL,
  PRIMARY KEY (`b_id`)
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
  `edit_user` int(11) NOT NULL,
  PRIMARY KEY (`ca_id`)
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
  `edit_user` int(11) NOT NULL,
  `edit_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`cp_id`),
  UNIQUE KEY `code` (`code`)
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
  `edit_user` int(11) NOT NULL,
  PRIMARY KEY (`cr_id`),
  UNIQUE KEY `code` (`code`)
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

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
  PRIMARY KEY (`do_id`)
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
  `edit_user` int(11) NOT NULL,
  `edit_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`m_id`),
  UNIQUE KEY `m_code` (`m_code`,`m_tcode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

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
  PRIMARY KEY (`mp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

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
  `edit_user` int(11) NOT NULL,
  PRIMARY KEY (`mb_id`)
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
  `edit_user` int(11) NOT NULL,
  PRIMARY KEY (`mi_id`),
  UNIQUE KEY `code` (`code`)
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
  `edit_user` int(11) NOT NULL,
  PRIMARY KEY (`ms_id`)
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
  `edit_user` int(11) NOT NULL,
  `edit_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`o_id`)
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
  `edit_user` int(11) NOT NULL,
  `edit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`t_id`)
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
  PRIMARY KEY (`u_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
