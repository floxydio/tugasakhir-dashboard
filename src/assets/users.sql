-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: May 20, 2023 at 04:05 AM
-- Server version: 5.7.42
-- PHP Version: 8.1.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tugasakhir`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status_user` int(11) NOT NULL DEFAULT '0',
  `status_role` int(11) NOT NULL DEFAULT '0',
  `user_agent` varchar(255) DEFAULT NULL,
  `profile_pic` varchar(255) NOT NULL DEFAULT 'default.jpg',
  `notelp` int(11) NOT NULL DEFAULT '0',
  `kelas_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nama`, `username`, `password`, `status_user`, `status_role`, `user_agent`, `profile_pic`, `notelp`, `kelas_id`) VALUES
(1, 'Dio Dev', 'dev', '$2b$10$i3L/Avjn0Gk58y7sJqg4weps9FO./GdhchD.v73/iVV1FP82tjMC2', 0, 0, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36', 'default.jpg', 0, 1),
(3, 'Basthomi', 'basthomi', '$2b$10$iR6wyM5rCQnTpY4hurt6k.SRtu10qEPeA3PYpm7AEZgxY2Qex5FFu', 0, 0, 'TESTER', 'default.jpg', 0, NULL),
(5, 'Lino Dev', 'linodev', '$2b$10$i3L/Avjn0Gk58y7sJqg4weps9FO./GdhchD.v73/iVV1FP82tjMC2', 0, 0, 'ABC', 'default.jpg', 0, 1),
(7, 'Diyas Frans Adhira', 'diyas', '$2b$10$i3L/Avjn0Gk58y7sJqg4weps9FO./GdhchD.v73/iVV1FP82tjMC2', 0, 0, 'ABC', 'default.jpg', 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
