-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 16, 2024 at 08:41 PM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.6.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `erp-bimotion`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `nin` varchar(255) NOT NULL,
  `phone_no` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `fc_no` varchar(255) NOT NULL,
  `mth_pay(000s)` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `user_name` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `user_role` enum('user','admin') DEFAULT 'user',
  `is_active` tinyint(1) DEFAULT '1',
  `photo` varchar(255) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `user_name`, `email`, `phone`, `user_role`, `is_active`, `photo`, `timestamp`, `password`) VALUES
(2, 'Md. Tanvir Ahmed', 'Siddiqee', 'Tanvir', 'tanvirahmedsiddiqee@gmail.com', '01716532401', 'user', 1, NULL, '2024-11-10 19:37:07', '$2a$10$5qKoVgKWUH.kXB.gzUrv8eHDnkJXrdQalUbuhKErJYE6YJr1EAuoa'),
(3, 'Farhan Tahmid', 'Sabit', NULL, 'sabit@gmail.com', NULL, NULL, NULL, NULL, '2024-11-14 17:27:12', '$2a$10$DcjAwDEXhqEUikMIV.qoteuRUy6D8YePxoAfxu.z6UATuf/y2zTpC'),
(4, 'asd', 'gff', NULL, 'asdsads@sd', NULL, NULL, NULL, NULL, '2024-11-16 18:42:45', '$2a$10$VSuc0nGNbTzlyGsI8L8wtOiO/hHZh.FAuzYjTcTzPgvBA4LjuyUFO');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
