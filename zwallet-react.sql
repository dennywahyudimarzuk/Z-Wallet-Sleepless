-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 22, 2020 at 07:44 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zwallet-react`
--

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `roleType` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `roleType`) VALUES
(22, 'Admin'),
(100, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `topup_instruction`
--

CREATE TABLE `topup_instruction` (
  `id` int(11) NOT NULL,
  `stepNumber` int(11) NOT NULL,
  `instruction` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `topup_instruction`
--

INSERT INTO `topup_instruction` (`id`, `stepNumber`, `instruction`) VALUES
(1, 1, 'Go to the nearest ATM or you can use E-Banking.'),
(2, 2, 'Type your security number on the ATM or E-Banking.'),
(3, 3, 'Select \"Transfer\" in the menu.'),
(4, 4, 'Type the virtual account number that we provide you at the top.'),
(5, 5, 'Type the amount of the money you want to top up.'),
(6, 6, 'Read the Summary details.'),
(7, 7, 'Press transfer/top up.'),
(8, 8, 'You can see your monet in Zwallet within 3 hours.');

-- --------------------------------------------------------

--
-- Table structure for table `transfer`
--

CREATE TABLE `transfer` (
  `id` int(11) NOT NULL,
  `sendBy` int(11) NOT NULL,
  `amountTransfer` bigint(20) NOT NULL,
  `receiver` int(11) NOT NULL,
  `dateTransfer` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` varchar(255) NOT NULL,
  `note` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transfer`
--

INSERT INTO `transfer` (`id`, `sendBy`, `amountTransfer`, `receiver`, `dateTransfer`, `status`, `note`) VALUES
(1, 1, 50000, 2, '2020-09-29 03:58:36', 'transfered', ''),
(2, 2, 70000, 3, '2020-10-06 03:50:37', 'transfered', ''),
(3, 3, 60000, 2, '2020-09-30 06:16:46', 'transfered', ''),
(5, 3, 50000, 1, '2020-09-30 07:47:25', 'transfered', ''),
(6, 3, 50000, 1, '2020-09-30 07:50:20', 'transfered', '');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(255) NOT NULL,
  `pin` varchar(255) NOT NULL,
  `phoneNumber` bigint(20) NOT NULL,
  `balance` bigint(20) NOT NULL,
  `img` varchar(255) NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `roleId` int(11) NOT NULL,
  `isActive` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `fullName`, `email`, `password`, `pin`, `phoneNumber`, `balance`, `img`, `createdDate`, `roleId`, `isActive`) VALUES
(1, 'Samuel', 'samuelsuhi@gmail.com', '$2b$10$pwChTdgY4OsHIU8L/EsWTetSLuOpMTk.N4a1a4jqA8f21OM4XdDpO', '123456', 6281384929994, 120000, 'https://i.ibb.co/QHjvpBC/img2.png', '2020-09-28 22:43:31', 100, 1),
(2, 'Momo', 'momotaro@gmail.com', '$2b$10$M.8vGz85vVMb53MLb549.OkOAsPM8G2Ar6pLYH0PiDKifhEN8qh16', '123456', 6281243436731, 400000, 'https://i.ibb.co/vqH8Dbq/img3.png', '2020-09-28 22:43:31', 100, 1),
(3, 'Jessica', 'jessikakeen@gmail.com', '$2b$10$7JaPkXX5JAg0pnLsQjTXXedk1Tzu3MQ1MaQWWaxyDOyR3ZsDeUlTy', '123456', 6281134525252, 1000000, 'https://i.ibb.co/nC2JbML/img4.png', '2020-09-28 22:43:31', 100, 1),
(4, 'Michael', 'michaelle@gmail.com', '$2b$10$sksPL9nNKU08.Xoe4VyRN.zfhQByWkEM4RVVLDzyIyXtxdlvBltr.', '123456', 6281042244613, 5000000, 'https://i.ibb.co/Zm51bxF/img1.png', '2020-09-28 22:43:31', 100, 1),
(5, 'Arung', 'arch@gmail.com', '$2b$10$GP9.J/tbNvrHeRyVsBgsEONX3M7hE7Weg8QMLdONBX4fxkzy0fLhW', '123456', 628023764816, 3000000, 'https://i.ibb.co/vqH8Dbq/img3.png', '2020-09-29 01:24:40', 100, 1),
(6, 'ucup', 'uchups@gmail.com', '$2b$10$z0.XBCnPsqC5HHhEF8g8Kec6f6.0oLUEeZ1mCetXhju1e8MJQBiTi', '123456', 628023764818, 5000000, 'https://i.ibb.co/Zm51bxF/img1.png', '2020-09-29 04:00:24', 100, 1),
(7, 'hanif', 'anip@gmail.com', '$2b$10$bZsEJ43DtKHg7Ks14K5nJ.ebiQVmL80HCGobNsy0ouUrSezJgbGWS', '123456', 628023764817, 5000000, 'https://i.ibb.co/QHjvpBC/img2.png', '2020-09-30 05:27:01', 100, 1),
(8, 'Denny', 'denny@gmail.com', '$2b$10$P8QHUg/gauxR2ldvSbCxr.ZwDN9jjOsoXvrVtxAF5tiYGWgcXgLAy', '123456', 6281256740293, 14000000, 'https://i.ibb.co/Zm51bxF/img1.png', '2020-10-04 21:18:08', 100, 1),
(9, 'admin', 'admin@gmail.com', '$2b$10$v6wpqBVaqnWU9WGjrUC8nulE14HT.Hc54vaOhenRDghe/AXqylXka', '-', 0, 0, '-', '2020-10-14 10:42:41', 22, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `topup_instruction`
--
ALTER TABLE `topup_instruction`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transfer`
--
ALTER TABLE `transfer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transfer_ibfk_1` (`sendBy`),
  ADD KEY `transfer_ibfk_2` (`receiver`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phoneNumber` (`phoneNumber`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `roleId` (`roleId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `topup_instruction`
--
ALTER TABLE `topup_instruction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `transfer`
--
ALTER TABLE `transfer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `transfer`
--
ALTER TABLE `transfer`
  ADD CONSTRAINT `transfer_ibfk_1` FOREIGN KEY (`sendBy`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transfer_ibfk_2` FOREIGN KEY (`receiver`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
