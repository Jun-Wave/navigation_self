/*
SQLyog Professional v12.09 (64 bit)
MySQL - 8.0.26 : Database - navigation_self
*********************************************************************
*/



CREATE DATABASE `navigation_test`;
USE `navigation_test`;

/*Table structure for table `catalogue` */

DROP TABLE IF EXISTS `catalogue`;

CREATE TABLE `catalogue` (
  `cid` int NOT NULL AUTO_INCREMENT,
  `title` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '目录名称',
  `introduce` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `pid` int DEFAULT NULL COMMENT '父目录',
  `layer` tinyint DEFAULT NULL COMMENT '层级',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

/*Table structure for table `nav` */
DROP TABLE IF EXISTS `nav`;
CREATE TABLE `nav` (
  `nid` int NOT NULL AUTO_INCREMENT,
  `cid` int NOT NULL COMMENT '所属目录',
  `title` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `imgurl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `introduce` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`nid`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
