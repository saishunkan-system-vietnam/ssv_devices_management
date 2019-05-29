-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 29, 2019 at 03:44 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.1.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ssv_em`
--

-- --------------------------------------------------------

--
-- Table structure for table `borrow_devices`
--

CREATE TABLE `borrow_devices` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `borrower_id` int(11) NOT NULL,
  `approved_id` int(11) DEFAULT NULL COMMENT 'phê duyệt',
  `handover_id` int(11) DEFAULT NULL COMMENT 'bàn giao',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `borrow_devices`
--

INSERT INTO `borrow_devices` (`id`, `borrower_id`, `approved_id`, `handover_id`, `is_deleted`) VALUES
(66, 55, NULL, NULL, 0),
(70, 55, 55, 55, 1),
(72, 55, NULL, NULL, 0),
(73, 55, 55, 55, 0),
(74, 61, NULL, NULL, 0),
(75, 61, 61, 61, 0);

-- --------------------------------------------------------

--
-- Table structure for table `borrow_devices_detail`
--

CREATE TABLE `borrow_devices_detail` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `borrow_device_id` bigint(20) NOT NULL,
  `device_id` bigint(20) NOT NULL,
  `borrow_reason` text,
  `return_reason` text,
  `status` int(11) DEFAULT NULL COMMENT 'status: 0- borrow; 1- confirm borrow; 2- no confirm borrow; 3- return device; 4- confirm return device',
  `borrow_date` datetime NOT NULL,
  `approved_date` datetime DEFAULT NULL,
  `delivery_date` datetime DEFAULT NULL,
  `return_date` datetime NOT NULL,
  `created_user` varchar(100) DEFAULT '',
  `update_user` varchar(100) DEFAULT '',
  `created_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `note_admin` text,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `borrow_devices_detail`
--

INSERT INTO `borrow_devices_detail` (`id`, `borrow_device_id`, `device_id`, `borrow_reason`, `return_reason`, `status`, `borrow_date`, `approved_date`, `delivery_date`, `return_date`, `created_user`, `update_user`, `created_time`, `update_time`, `note_admin`, `is_deleted`) VALUES
(42, 66, 4, 'Test project A update', NULL, 0, '2019-05-18 19:56:32', '2019-05-21 19:56:32', '2019-05-21 19:56:32', '2019-05-25 19:56:32', 'Test', 'Test', '2019-05-20 07:44:44', '2019-05-21 07:47:14', NULL, 0),
(46, 70, 3, 'Test project A update new', 'kh&ocirc;ng l&ecirc;n nguồn edit', 4, '2019-05-18 19:56:32', '2019-05-21 19:56:32', '2019-05-21 19:56:32', '2019-05-25 19:56:32', 'Test', 'HoangND', '2019-05-20 07:59:10', '2019-05-24 04:31:22', 'Vui lòng đợi đến ngày 25/05/2019', 0),
(47, 72, 1, 'Test project A update', NULL, 0, '2019-05-18 19:56:32', '2019-05-21 19:56:32', '2019-05-21 19:56:32', '2019-05-25 19:56:32', 'Test', '', '2019-05-21 08:38:21', '2019-05-21 08:38:21', NULL, 0),
(48, 73, 4, 'Test new project', 'kh&ocirc;ng l&ecirc;n nguồn edit', 4, '2019-05-15 19:56:32', '2019-05-16 19:56:32', '2019-05-16 19:56:32', '2019-05-20 19:56:32', 'Test', 'HoangND', '2019-05-22 07:07:15', '2019-05-24 06:21:52', '', 0),
(49, 74, 1, 'Test project A', NULL, 0, '2019-05-15 19:56:32', '2019-05-16 19:56:32', '2019-05-16 19:56:32', '2019-05-20 19:56:32', 'Test', '', '2019-05-24 07:59:41', '2019-05-24 07:59:41', NULL, 0),
(50, 75, 1, 'kiểm tra dự &aacute;n', NULL, 4, '2019-05-15 19:56:32', '2019-05-16 19:56:32', '2019-05-16 19:56:32', '2019-05-20 19:56:32', 'Test', 'Test', '2019-05-24 08:02:27', '2019-05-24 08:05:37', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id` int(10) UNSIGNED NOT NULL,
  `brand_name` varchar(100) NOT NULL,
  `created_user` varchar(100) DEFAULT '',
  `update_user` varchar(100) DEFAULT '',
  `created_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id`, `brand_name`, `created_user`, `update_user`, `created_time`, `update_time`, `is_deleted`) VALUES
(1, 'HP', 'bgarfath0', 'hdyke0', '2019-02-22 21:01:10', '2018-09-09 18:07:04', 0),
(2, 'Dell', 'efiddymont1', 'dcorringham1', '2018-06-30 23:50:27', '2018-08-31 04:00:50', 0),
(3, 'Samsung', 'qrenforth2', 'cdimberline2', '2019-03-02 17:53:34', '2018-09-01 10:55:26', 0),
(4, 'Apple', 'crough3', 'lleblanc3', '2018-10-03 12:52:52', '2018-12-19 00:56:01', 0),
(5, 'Xiaomi', 'cwitch4', 'rskeath4', '2018-07-10 17:41:32', '2018-04-18 23:30:44', 0),
(6, 'Lenovo', 'dcreamen5', 'rlovekin5', '2018-09-28 01:21:17', '2018-11-13 17:45:07', 0),
(7, 'HTC', 'cpuller6', 'jcrees6', '2018-11-10 21:10:20', '2018-09-20 14:13:11', 0),
(8, 'Sony', 'ealves7', 'epetraitis7', '2018-05-08 05:00:33', '2018-05-08 18:01:19', 0),
(9, 'Alphabet', 'hthurlbourne8', 'mmillmoe8', '2018-08-09 06:01:40', '2018-04-12 07:37:54', 0),
(10, 'Google', 'bbullerwell9', 'ncampe9', '2018-09-22 05:39:33', '2019-01-18 00:45:04', 0),
(12, 'updat new  name brand 2', 'Test', 'Test', '2019-05-17 08:45:25', '2019-05-22 08:25:46', 1),
(13, 'Test new name brand', NULL, '', '2019-05-20 03:14:01', '2019-05-20 03:14:01', 0),
(14, 'Test brand name new update', 'Test', 'Test', '2019-05-22 07:58:09', '2019-05-22 08:07:20', 0);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_parent` int(11) DEFAULT NULL,
  `category_name` varchar(100) NOT NULL,
  `created_user` varchar(100) DEFAULT '',
  `update_user` varchar(100) DEFAULT '',
  `created_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `brands_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `id_parent`, `category_name`, `created_user`, `update_user`, `created_time`, `update_time`, `is_deleted`, `brands_id`) VALUES
(1, 0, 'Mobile', 'fdomoni0', 'rhanne0', '2018-04-17 16:24:11', '2018-11-19 17:30:14', 0, 1),
(2, 1, 'Android', 'pgoney1', 'frisbrough1', '2018-12-25 16:06:47', '2018-05-18 08:58:03', 0, 1),
(3, 1, 'Iphone', 'cserfati2', 'cgodard2', '2018-06-28 16:27:51', '2019-01-12 07:29:29', 0, 1),
(4, 1, 'Windows Phone', 'rdorrington3', 'kbrimmicombe3', '2019-01-21 02:25:04', '2018-04-18 07:22:37', 0, 1),
(5, 0, 'Computer', 'dheadon4', 'stirone4', '2018-07-23 08:15:21', '2018-05-22 12:29:52', 0, 1),
(6, 5, 'PC Desktop', 'ebould5', 'bschaffler5', '2019-01-27 18:17:52', '2018-08-03 23:06:19', 0, 1),
(7, 5, 'PC Laptop', 'dmcgarrity6', 'alaise6', '2018-10-31 04:58:06', '2018-12-02 15:21:40', 0, 1),
(8, 0, 'Tablet', 'lmacquire7', 'fslavin7', '2018-12-30 09:06:40', '2018-06-14 07:43:20', 0, 1),
(9, 8, 'Android', 'mdebrett8', 'dlehrian8', '2018-03-31 16:23:03', '2019-02-21 11:36:41', 0, 1),
(10, 8, 'IPad', 'oemeline9', 'abroodes9', '2019-01-11 11:18:02', '2018-12-20 15:12:48', 0, 1),
(11, 8, 'Windows Surface', 'llebarra', 'tblasiusa', '2019-02-08 00:23:04', '2018-10-30 18:49:40', 0, 1),
(12, 0, 'Printer', 'rofeenyb', 'ldungateb', '2019-02-24 21:06:50', '2018-06-14 05:49:52', 0, 1),
(13, 0, 'Mouse', 'rbombc', 'hjarlmannc', '2019-03-07 02:20:41', '2018-11-30 02:32:26', 0, 1),
(14, 0, 'Keyboard', 'ibotwoodd', 'jharrowelld', '2018-10-31 15:59:10', '2018-04-01 03:03:57', 0, 1),
(15, 0, 'Ram', 'ascampione', 'nabbadoe', '2019-03-14 11:22:59', '2018-04-28 15:47:44', 0, 1),
(16, 15, 'Ram laptop', 'oraouxf', 'mthompsonf', '2018-04-30 16:49:57', '2018-12-22 22:17:27', 0, 1),
(17, 15, 'Ram desktop', 'rrutledgeg', 'htoteng', '2018-11-27 00:09:24', '2019-01-27 09:29:09', 0, 1),
(18, 0, 'Monitor', 'wbendellh', 'igirardoth', '2018-11-04 14:09:43', '2018-08-05 17:41:46', 0, 1),
(19, 0, 'Other', 'tsandsallani', 'scummingsi', '2019-01-23 05:42:51', '2018-11-18 17:56:46', 0, 1),
(20, 0, 'Hard Disk', 'mthompsonf', 'wbendellh', '2018-08-05 17:41:46', '2019-01-23 05:42:51', 0, 1),
(21, 20, 'Hard Disk Drive', 'igirardoth', 'tsandsallani', '2018-04-30 16:49:57', '2018-11-30 02:32:26', 0, 1),
(22, 20, 'Solid State Drive', 'ibotwoodd', 'nabbadoe', '2018-04-30 16:49:57', '2018-04-30 16:49:57', 0, 1),
(28, 0, 'new category 2', 'Test', 'Test', '2019-05-17 04:20:56', '2019-05-22 07:46:10', 1, 3),
(29, 0, 'new category', NULL, '', '2019-05-20 10:15:19', '2019-05-20 10:15:19', 0, 1),
(30, 0, 'new category 2', NULL, '', '2019-05-21 01:55:05', '2019-05-21 01:55:05', 0, 0),
(31, 0, 'new category 2', NULL, '', '2019-05-21 01:57:11', '2019-05-21 01:57:11', 0, 3),
(32, 3, 'new category 2', NULL, 'Test', '2019-05-21 10:03:14', '2019-05-21 10:06:38', 1, 1),
(33, 0, 'Test new category edit', 'Test', 'Test', '2019-05-22 07:37:45', '2019-05-22 07:40:45', 0, 3),
(34, 1, 'Test Api', NULL, '', '2019-05-28 04:14:08', '2019-05-28 04:14:08', 0, 1),
(35, 1, 'test 2', NULL, '', '2019-05-28 07:00:28', '2019-05-28 07:00:28', 0, 1),
(36, 0, 'Dien thoai', NULL, '', '2019-05-28 08:21:19', '2019-05-28 08:21:19', 0, 2),
(37, 0, 'Dien thoai', NULL, '', '2019-05-28 09:16:36', '2019-05-28 09:16:36', 0, 2),
(38, 1, 'Dien thoai 2', NULL, '', '2019-05-28 09:22:34', '2019-05-28 09:22:34', 0, 1),
(39, 0, 'Dien thoai', NULL, '', '2019-05-28 09:23:17', '2019-05-28 09:23:17', 0, 2);

-- --------------------------------------------------------

--
-- Table structure for table `devices`
--

CREATE TABLE `devices` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `categories_id` int(11) NOT NULL,
  `serial_number` varchar(50) NOT NULL,
  `product_number` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `brand_id` int(11) NOT NULL,
  `specifications` text,
  `status` tinyint(4) DEFAULT '0' COMMENT '0- đang rảnh, 1- đang bận, 2- đang bảo trì',
  `purchase_date` datetime DEFAULT NULL COMMENT 'ngày mua',
  `warranty_period` datetime DEFAULT NULL COMMENT 'thời hạn bảo hành',
  `created_user` varchar(100) DEFAULT '',
  `update_user` varchar(100) DEFAULT '',
  `created_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `devices`
--

INSERT INTO `devices` (`id`, `categories_id`, `serial_number`, `product_number`, `name`, `brand_id`, `specifications`, `status`, `purchase_date`, `warranty_period`, `created_user`, `update_user`, `created_time`, `update_time`, `is_deleted`, `image`) VALUES
(1, 7, 'IPD320S000000001', 'Lenovo ideapad 320s', 'Lenovo ideapad 320s', 6, 'Chip: Intel Core i5-8250U\r RAM: 8GB DDR4 2400MHz\r Ổ cứng: 256GB SSD M.2 PCIe\r Chipset đồ họa: Intel UHD Graphics 620\r Màn hình: 13.3 inch Full HD (1920 x 1080) LED, IPS, Anti-Glare\r Hệ điều hành: Windows 10 Home\r Pin: 3 Cell 36 Whrs', 0, '2018-09-12 00:00:00', '2019-09-12 00:00:00', 'bgarfath0', 'hdyke0', '2019-02-22 21:01:10', '2019-02-22 21:01:10', 0, NULL),
(2, 7, 'IPD320S000000002', 'Lenovo ideapad 320s', 'Lenovo ideapad 320s', 6, 'Chip: Intel Core i5-8250U\r RAM: 8GB DDR4 2400MHz\r Ổ cứng: 256GB SSD M.2 PCIe\r Chipset đồ họa: Intel UHD Graphics 620\r Màn hình: 13.3 inch Full HD (1920 x 1080) LED, IPS, Anti-Glare\r Hệ điều hành: Windows 10 Home\r Pin: 3 Cell 36 Whrs', 0, '2018-09-12 00:00:00', '2019-09-12 00:00:00', 'bgarfath0', 'hdyke0', '2019-02-22 21:01:10', '2019-02-22 21:01:10', 0, NULL),
(3, 7, 'IPD320S000000003', 'Lenovo ideapad 320s', 'Lenovo ideapad 320s', 6, 'Chip: Intel Core i5-8250U\r RAM: 8GB DDR4 2400MHz\r Ổ cứng: 256GB SSD M.2 PCIe\r Chipset đồ họa: Intel UHD Graphics 620\r Màn hình: 13.3 inch Full HD (1920 x 1080) LED, IPS, Anti-Glare\r Hệ điều hành: Windows 10 Home\r Pin: 3 Cell 36 Whrs', 0, '2018-09-12 00:00:00', '2019-09-12 00:00:00', 'bgarfath0', 'hdyke0', '2019-02-22 21:01:10', '2019-02-22 21:01:10', 0, NULL),
(4, 7, 'IPD320S000000004', 'Lenovo ideapad 320s', 'Lenovo ideapad 320s', 6, 'Chip: Intel Core i5-8250U\r RAM: 8GB DDR4 2400MHz\r Ổ cứng: 256GB SSD M.2 PCIe\r Chipset đồ họa: Intel UHD Graphics 620\r Màn hình: 13.3 inch Full HD (1920 x 1080) LED, IPS, Anti-Glare\r Hệ điều hành: Windows 10 Home\r Pin: 3 Cell 36 Whrs', 2, '2018-09-12 00:00:00', '2019-09-12 00:00:00', 'bgarfath0', 'HoangND', '2019-02-22 21:01:10', '2019-05-24 06:21:52', 0, NULL),
(5, 7, 'IPD320S000000005', 'Lenovo ideapad 320s', 'Lenovo ideapad 320s', 6, 'Chip: Intel Core i5-8250U\r RAM: 8GB DDR4 2400MHz\r Ổ cứng: 256GB SSD M.2 PCIe\r Chipset đồ họa: Intel UHD Graphics 620\r Màn hình: 13.3 inch Full HD (1920 x 1080) LED, IPS, Anti-Glare\r Hệ điều hành: Windows 10 Home\r Pin: 3 Cell 36 Whrs', 0, '2018-09-12 00:00:00', '2019-09-12 00:00:00', 'bgarfath0', 'hdyke0', '2019-02-22 21:01:10', '2019-02-22 21:01:10', 0, NULL),
(6, 7, 'HPDK660000001', 'HP Prodesk 660', 'HP Prodesk 660', 1, 'Chip: Intel Core i5-3250U\r RAM: 16GB DDR3 2400MHz\r Ổ cứng: 256GB SSD M.2 PCIe\r Chipset đồ họa: Intel UHD Graphics 4000', 0, '2018-09-12 00:00:00', '2019-09-12 00:00:00', 'bgarfath0', 'hdyke0', '2019-02-22 21:01:10', '2019-02-22 21:01:10', 0, NULL),
(7, 17, 'SSR3000000001', 'Ram DDR3', 'Ram DDR3 4GB', 3, 'Ram DDR3 4GB Bus 12800', 0, '2018-09-12 00:00:00', '2019-09-12 00:00:00', 'bgarfath0', 'hdyke0', '2019-02-22 21:01:10', '2019-02-22 21:01:10', 0, NULL),
(8, 17, 'SSR3000000002', 'Ram DDR3', 'Ram DDR3 4GB', 3, 'Ram DDR3 4GB Bus 12800', 0, '2018-09-12 00:00:00', '2019-09-12 00:00:00', 'bgarfath0', 'hdyke0', '2019-02-22 21:01:10', '2019-02-22 21:01:10', 0, NULL),
(9, 17, 'SSR3000000003', 'Ram DDR3', 'Ram DDR3 4GB', 3, 'Ram DDR3 4GB Bus 12800', 0, '2018-09-12 00:00:00', '2019-09-12 00:00:00', 'bgarfath0', 'hdyke0', '2019-02-22 21:01:10', '2019-02-22 21:01:10', 0, NULL),
(10, 17, 'SSR3000000004', 'Ram DDR3', 'Ram DDR3 4GB', 3, 'Ram DDR3 4GB Bus 12800', 0, '2018-09-12 00:00:00', '2019-09-12 00:00:00', 'bgarfath0', 'hdyke0', '2019-02-22 21:01:10', '2019-02-22 21:01:10', 0, NULL),
(11, 7, 'HPDK660000002', 'HP Prodesk 660', 'HP Prodesk 660', 1, 'Chip: Intel Core i5-3250U\r RAM: 16GB DDR3 2400MHz\r Ổ cứng: 256GB SSD M.2 PCIe\r Chipset đồ họa: Intel UHD Graphics 4000', 0, '2018-09-12 00:00:00', '2019-09-12 00:00:00', 'bgarfath0', 'hdyke0', '2019-02-22 21:01:10', '2019-02-22 21:01:10', 0, NULL),
(12, 17, 'SSR3000000005', 'Ram DDR3', 'Ram DDR3 4GB', 3, 'Ram DDR3 4GB Bus 12800', 0, '2018-09-12 00:00:00', '2019-09-12 00:00:00', 'bgarfath0', 'hdyke0', '2019-02-22 21:01:10', '2019-02-22 21:01:10', 0, NULL),
(13, 17, 'SSR3000000006', 'Ram DDR3', 'Ram DDR3 4GB', 3, 'Ram DDR3 4GB Bus 12800', 0, '2018-09-12 00:00:00', '2019-09-12 00:00:00', 'bgarfath0', 'hdyke0', '2019-02-22 21:01:10', '2019-02-22 21:01:10', 0, NULL),
(14, 17, 'SSR3000000007', 'Ram DDR3', 'Ram DDR3 4GB', 3, 'Ram DDR3 4GB Bus 12800', 0, '2018-09-12 00:00:00', '2019-09-12 00:00:00', 'bgarfath0', 'hdyke0', '2019-02-22 21:01:10', '2019-02-22 21:01:10', 0, NULL),
(15, 17, 'SSR3000000008', 'Ram DDR3', 'Ram DDR3 4GB', 3, 'Ram DDR3 4GB Bus 12800', 0, '2018-09-12 00:00:00', '2019-09-12 00:00:00', 'bgarfath0', 'hdyke0', '2019-02-22 21:01:10', '2019-02-22 21:01:10', 0, NULL),
(16, 22, 'SSDM000000001', 'SSD Evo680', 'SSD Evo680-6 256GB', 3, 'Loại SSD: Giao tiếp Sata III', 0, '2018-09-12 00:00:00', '2019-09-12 00:00:00', 'bgarfath0', 'hdyke0', '2019-02-22 21:01:10', '2019-02-22 21:01:10', 0, NULL),
(17, 22, 'SSDM000000002', 'SSD Evo680', 'SSD Evo680-6 256GB', 3, 'Loại SSD: Giao tiếp Sata III', 0, '2018-09-12 00:00:00', '2019-09-12 00:00:00', 'bgarfath0', 'hdyke0', '2019-02-22 21:01:10', '2019-02-22 21:01:10', 0, NULL),
(18, 22, 'SSDM000000003', 'SSD Evo680', 'SSD Evo680-6 256GB', 3, 'Loại SSD: Giao tiếp Sata III', 0, '2018-09-12 00:00:00', '2019-09-12 00:00:00', 'bgarfath0', 'hdyke0', '2019-02-22 21:01:10', '2019-02-22 21:01:10', 0, NULL),
(19, 22, 'SSDM000000004', 'SSD Evo680', 'SSD Evo680-6 256GB', 3, 'Loại SSD: Giao tiếp Sata III', 0, '2018-09-12 00:00:00', '2019-09-12 00:00:00', 'bgarfath0', 'hdyke0', '2019-02-22 21:01:10', '2019-02-22 21:01:10', 0, NULL),
(20, 22, 'SSDM000000005', 'SSD Evo680', 'SSD Evo680-6 256GB', 3, 'Loại SSD: Giao tiếp Sata III', 0, '2018-09-12 00:00:00', '2019-09-12 00:00:00', 'bgarfath0', 'hdyke0', '2019-02-22 21:01:10', '2019-02-22 21:01:10', 0, NULL),
(21, 0, 'SSDM000000005f', 'product_number 1111', 'name test', 1, 'specifications test update', 0, NULL, '2019-05-17 06:19:45', 'Test', 'Test', '2019-05-17 10:16:10', '2019-05-22 10:09:19', 1, NULL),
(22, 0, 'SSDM000000005f', 'product_number 1111', 'name test', 1, 'specifications test', 0, NULL, '2019-05-17 06:19:45', NULL, '', '2019-05-20 01:29:24', '2019-05-20 01:29:24', 0, NULL),
(23, 0, '123456789', 'product number new', 'devices name new', 1, NULL, 0, NULL, NULL, 'Test', '', '2019-05-22 09:10:16', '2019-05-22 09:10:16', 0, 'B3JTO6n8EJ41ztke1Gd3Utx75xowVtl3RFyFk2qVng9WNtT6nI.jpg'),
(24, 0, '0123456789', 'product number new update', 'devices name new update', 3, 'Th&ocirc;ng số kĩ thuật th&ecirc;m mới update', 1, '2019-05-17 06:19:45', '2019-05-17 06:19:45', 'Test', 'Test', '2019-05-22 09:46:50', '2019-05-24 08:31:35', 0, 'NqcUrH5BlGyLQmLllSDBHYyr9s7QTjmjHd39KQ89nBuxiU9Ptw.jpg'),
(26, 0, 'SSDM0000000055', 'product_number 1111', 'name test', 1, 'specifications test', 0, '2019-05-17 06:19:45', '2019-05-17 06:19:45', NULL, NULL, '2019-05-27 09:26:19', '2019-05-27 09:30:28', 0, 'IyGXCqxGNStt4AvxQz7lUcd88kRpua3mc8tk9qy5e9lpJVjY9C.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `relate_id` bigint(20) NOT NULL,
  `relate_name` varchar(50) NOT NULL,
  `path` text NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `created_user` varchar(100) DEFAULT '',
  `update_user` varchar(100) DEFAULT '',
  `created_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `maintenances`
--

CREATE TABLE `maintenances` (
  `id` int(11) NOT NULL,
  `devices_id` int(11) NOT NULL COMMENT 'thiết bị bảo trì',
  `status` int(11) DEFAULT '0' COMMENT '0-báo hỏng, 1- đợi bảo trì, 2-đang bảo trì, 3-đã bảo trì, 4-đã bảo trì nhưng vẫn hỏng, 5 bình thường',
  `broken_date` datetime NOT NULL COMMENT 'ngày bị hỏng',
  `maintenance_start_date` datetime DEFAULT NULL COMMENT 'ngày bắt đầu bảo trì',
  `maintenances_end_date` datetime DEFAULT NULL COMMENT 'ngày bảo trì xong',
  `notificationer_broken` int(11) NOT NULL COMMENT 'người báo hỏng',
  `create_user` varchar(100) NOT NULL,
  `update_user` varchar(100) DEFAULT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0- bình thường, 1- đã xóa',
  `note` text COMMENT 'ghi chú tình trạng hỏng',
  `maintenances_address` text COMMENT 'địa chỉ nơi bảo trì',
  `total_payment` bigint(20) DEFAULT NULL COMMENT 'tổng tiền sửa chữa'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='bảo trì';

--
-- Dumping data for table `maintenances`
--

INSERT INTO `maintenances` (`id`, `devices_id`, `status`, `broken_date`, `maintenance_start_date`, `maintenances_end_date`, `notificationer_broken`, `create_user`, `update_user`, `create_time`, `update_time`, `is_deleted`, `note`, `maintenances_address`, `total_payment`) VALUES
(43, 4, 5, '2019-05-20 06:19:45', NULL, NULL, 55, 'HoangND', 'HoangND', '2019-05-24 06:10:55', '2019-05-24 06:24:52', 0, 'kh&ocirc;ng l&ecirc;n nguồn edit', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `position` varchar(100) NOT NULL,
  `level` int(11) DEFAULT NULL,
  `created_user` varchar(100) DEFAULT '',
  `update_user` varchar(100) DEFAULT '',
  `created_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `email` varchar(100) NOT NULL,
  `team` varchar(100) DEFAULT NULL,
  `address` varchar(250) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `join_date` date DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0',
  `img` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_name`, `full_name`, `position`, `level`, `created_user`, `update_user`, `created_time`, `update_time`, `is_deleted`, `email`, `team`, `address`, `birthdate`, `join_date`, `status`, `img`) VALUES
(1, 'tienpv', 'Phạm Văn Tiến', 'Programmer', 1, 'egeraldo0', 'egeraldo0', '2018-03-20 19:56:32', '2019-03-06 10:16:59', 0, '', NULL, NULL, NULL, NULL, 1, NULL),
(2, 'hanhtv', 'Hoàng', 'Programmer', 1, 'mmongain1', 'HungHT', '2019-01-17 16:12:37', '2019-05-24 08:35:38', 0, 'admin@admin.com', NULL, 'Hanoi, Hanoi', '1970-01-01', '1970-01-01', 0, 'g3qmBLybxCA3ohVWE13gA29LDMsGefVfCt1Xkf5l3DCP1euxWY.png'),
(3, 'thinhbt', 'Bùi Trung Thịnh', 'Programmer', 1, 'scorneck2', 'scorneck2', '2018-09-25 07:37:06', '2018-11-01 00:00:08', 0, '', NULL, NULL, NULL, NULL, 0, NULL),
(4, 'giangdv', 'Hoàng', 'Programmer', 1, 'rinder3', 'HungHT', '2018-07-15 14:42:57', '2019-05-24 08:38:39', 0, 'hunght1188@gmail.com', NULL, 'Hanoi, Hanoi', '1970-01-01', '1970-01-01', 0, '0uFaSX718bfrXpjxN09eeLkP70tFwqTYxL7qvljtVoaxjIMdZI.jpg'),
(5, 'trungnq', 'Nguyễn Quang Trung', 'Programmer', 1, 'norring4', 'HungHT', '2018-09-30 20:54:48', '2019-05-24 08:36:10', 0, 'trungnq@saisystem.vn', '', 'Phú Thọ', '1970-01-01', '1970-01-01', 0, 'u2PXNrOk1mADXsL4h7EmvnJXquUudJugOOoFZRFmnflWIIWwTV.jpg'),
(6, 'trungdq', 'Đặng Quang Trung', 'Programmer', 1, 'cchurm5', 'cchurm5', '2018-10-16 20:28:33', '2019-01-20 19:21:19', 0, '', NULL, NULL, NULL, NULL, 0, NULL),
(7, 'thaipd', 'Phạm Duy Thái', 'Leader Project', 2, 'bdunk6', 'bdunk6', '2018-10-20 02:19:42', '2018-10-05 03:47:51', 0, '', NULL, NULL, NULL, NULL, 0, NULL),
(8, 'hungdh', 'Đỗ Huy Hùng', 'Project Manager', 5, 'tmarchington7', 'tmarchington7', '2018-04-05 07:08:39', '2018-05-02 03:12:39', 0, 'hoangnguyen03091998@gmail.com', NULL, NULL, NULL, NULL, 0, NULL),
(9, 'nhaitt', 'Trịnh Thị Nhài', 'Accounting', 3, 'kteaz8', 'kteaz8', '2018-06-22 15:03:04', '2019-03-02 09:49:34', 0, '', NULL, NULL, NULL, NULL, 0, NULL),
(10, 'haitt', 'Trịnh Thị Hải', 'Administrator', 4, 'cface9', 'cface9', '2018-04-16 11:29:38', '2018-09-15 07:53:34', 0, '', NULL, NULL, NULL, NULL, 0, NULL),
(54, 'HungHT', 'Hoàng Tiến Hưng', 'Programmer', 1, '', 'Test', '2019-05-17 06:19:45', '2019-05-24 07:24:16', 0, 'hunght@saisystem.vn', NULL, 'Hà nội', '1988-11-08', '2017-01-06', 0, 'LrTViHv2sZQM7L4wE713VflVUaKNUGwHIuUIfcj6BoUpoOSL0m.jpg'),
(61, 'Test', 'Nguyễn Thị Test', 'Programmer', 1, 'HoangND', 'HungHT', '2019-05-17 06:19:45', '2019-05-24 08:39:14', 0, 'hoangnguyenit98@gmail.com', 'Team Test', 'Hà Nội', '1970-01-01', '1970-01-01', 0, '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `borrow_devices`
--
ALTER TABLE `borrow_devices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `borrow_devices_detail`
--
ALTER TABLE `borrow_devices_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `devices`
--
ALTER TABLE `devices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `maintenances`
--
ALTER TABLE `maintenances`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `borrow_devices`
--
ALTER TABLE `borrow_devices`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `borrow_devices_detail`
--
ALTER TABLE `borrow_devices_detail`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `devices`
--
ALTER TABLE `devices`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `maintenances`
--
ALTER TABLE `maintenances`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
