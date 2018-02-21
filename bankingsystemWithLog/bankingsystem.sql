-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 05, 2017 at 10:40 PM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bankingsystem`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `ID` bigint(100) NOT NULL,
  `Type` varchar(100) NOT NULL,
  `AadharNumber` bigint(100) NOT NULL,
  `Balance` bigint(100) NOT NULL,
  `OpeningDate` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `accountreq`
--

CREATE TABLE `accountreq` (
  `ID` bigint(100) NOT NULL,
  `Type` varchar(100) NOT NULL,
  `AadharNumber` bigint(100) NOT NULL,
  `Balance` bigint(100) NOT NULL,
  `OpeningDate` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `autherizereq`
--

CREATE TABLE `autherizereq` (
  `fromuser` int(100) DEFAULT NULL,
  `touser` int(100) DEFAULT NULL,
  `status` int(10) DEFAULT NULL,
  `id` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `authtransaction`
--

CREATE TABLE `authtransaction` (
  `ID` bigint(100) NOT NULL,
  `UserAadhar` bigint(100) NOT NULL,
  `TransactionID` bigint(100) NOT NULL,
  `OfUserAadhar` bigint(100) NOT NULL,
  `Verified` int(100) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `individualuser`
--

CREATE TABLE `individualuser` (
  `ID` bigint(100) NOT NULL,
  `AadharNumber` bigint(100) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `PhoneNumber` bigint(100) NOT NULL,
  `Address` varchar(100) DEFAULT NULL,
  `DOB` date NOT NULL,
  `Gender` varchar(100) NOT NULL,
  `PANNumber` varchar(100) NOT NULL,
  `Nationality` varchar(100) NOT NULL,
  `Verified` int(100) NOT NULL DEFAULT '0',
  `DelReq` int(100) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `merchant`
--

CREATE TABLE `merchant` (
  `ID` int(100) NOT NULL,
  `AadharNumber` bigint(100) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `PhoneNumber` bigint(100) NOT NULL,
  `Address` varchar(100) DEFAULT NULL,
  `DOB` date NOT NULL,
  `Gender` varchar(100) NOT NULL,
  `PANNumber` varchar(100) NOT NULL,
  `Nationality` varchar(100) NOT NULL,
  `Verified` int(100) NOT NULL DEFAULT '0',
  `DelReq` int(100) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `merchantemployees`
--

CREATE TABLE `merchantemployees` (
  `ID` bigint(100) NOT NULL,
  `MerchantAccountNo` bigint(100) NOT NULL,
  `MerchantAadharNo` bigint(100) NOT NULL,
  `EmployeeAccountNo` bigint(100) NOT NULL,
  `EmployeeAadhar` bigint(100) NOT NULL,
  `Amount` bigint(100) NOT NULL,
  `Verified` int(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `msg`
--

CREATE TABLE `msg` (
  `ID` bigint(100) NOT NULL,
  `FromUser` bigint(100) NOT NULL,
  `ToUser` bigint(100) NOT NULL,
  `Description` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `regrequests`
--

CREATE TABLE `regrequests` (
  `ID` int(100) NOT NULL,
  `UserID` int(100) NOT NULL,
  `AadharNumber` bigint(100) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `DOB` date NOT NULL,
  `PhoneNumber` bigint(100) NOT NULL,
  `Gender` varchar(100) NOT NULL,
  `Nationality` varchar(100) NOT NULL,
  `PANNumber` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Status` int(11) NOT NULL DEFAULT '0',
  `type` int(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `regularemployee`
--

CREATE TABLE `regularemployee` (
  `ID` bigint(100) NOT NULL,
  `AadharNumber` bigint(100) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `DOB` date NOT NULL,
  `PhoneNumber` bigint(100) NOT NULL,
  `Gender` varchar(100) NOT NULL,
  `Nationality` varchar(100) NOT NULL,
  `PANNumber` varchar(100) NOT NULL,
  `Status` int(100) NOT NULL DEFAULT '0',
  `DelReq` int(100) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `requestaccess`
--

CREATE TABLE `requestaccess` (
  `AadharNumber` int(100) NOT NULL,
  `UserAadhar` int(100) NOT NULL,
  `reason` varchar(100) NOT NULL,
  `verified` int(11) DEFAULT '0',
  `transactionID` varchar(45) DEFAULT NULL,
  `requestID` varchar(45) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `rollbacktransactionreqsa`
--

CREATE TABLE `rollbacktransactionreqsa` (
  `ID` int(100) NOT NULL,
  `TransactionID` int(100) NOT NULL,
  `Statussa` int(11) NOT NULL DEFAULT '0',
  `Statusextuser` int(100) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `syslog`
--

CREATE TABLE `syslog` (
  `ID` bigint(100) NOT NULL,
  `Description` varchar(100) NOT NULL,
  `IpAddress` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `systemadmin`
--

CREATE TABLE `systemadmin` (
  `ID` bigint(100) NOT NULL,
  `AadharNumber` bigint(100) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `DOB` date NOT NULL,
  `PhoneNumber` bigint(100) NOT NULL,
  `Gender` varchar(100) NOT NULL,
  `Nationality` varchar(100) NOT NULL,
  `PANNumber` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `systemadmin`
--

INSERT INTO `systemadmin` (`ID`, `AadharNumber`, `Name`, `Email`, `Password`, `DOB`, `PhoneNumber`, `Gender`, `Nationality`, `PANNumber`) VALUES
(1, 9999999999999999, 'admin', 'sarthika15170@iiitd.ac.in', '07b5d1f6a7085d4a2c8838d24e82dd0b', '2017-11-11', 9999999999, 'female', 'indian', 'aaaaaaaaaa');

-- --------------------------------------------------------

--
-- Table structure for table `systemmanager`
--

CREATE TABLE `systemmanager` (
  `ID` bigint(100) NOT NULL,
  `AadharNumber` bigint(100) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `DOB` date NOT NULL,
  `PhoneNumber` bigint(100) NOT NULL,
  `Gender` varchar(100) NOT NULL,
  `Nationality` varchar(100) NOT NULL,
  `PANNumber` varchar(100) NOT NULL,
  `Status` int(100) NOT NULL DEFAULT '0',
  `DelReq` int(100) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tokenforforgotpswd`
--

CREATE TABLE `tokenforforgotpswd` (
  `ID` bigint(100) NOT NULL,
  `token` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `ID` bigint(100) NOT NULL,
  `DebitAccount` bigint(100) NOT NULL,
  `CreditAccount` bigint(100) NOT NULL,
  `DebitAadharNo` bigint(100) NOT NULL,
  `CreditAadharNo` bigint(100) NOT NULL,
  `Amount` bigint(100) NOT NULL,
  `Timestamp` datetime DEFAULT NULL,
  `Status` int(100) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `transactionreqre`
--

CREATE TABLE `transactionreqre` (
  `ID` bigint(100) NOT NULL,
  `TransactionID` bigint(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `transactionreqsa`
--

CREATE TABLE `transactionreqsa` (
  `ID` bigint(100) NOT NULL,
  `TransactionID` bigint(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `transactionreqsm`
--

CREATE TABLE `transactionreqsm` (
  `ID` bigint(100) NOT NULL,
  `TransactionID` bigint(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `accountreq`
--
ALTER TABLE `accountreq`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `autherizereq`
--
ALTER TABLE `autherizereq`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `authtransaction`
--
ALTER TABLE `authtransaction`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `individualuser`
--
ALTER TABLE `individualuser`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Aadhar Number` (`AadharNumber`);

--
-- Indexes for table `merchant`
--
ALTER TABLE `merchant`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Aadhar Number` (`AadharNumber`);

--
-- Indexes for table `merchantemployees`
--
ALTER TABLE `merchantemployees`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `msg`
--
ALTER TABLE `msg`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `regrequests`
--
ALTER TABLE `regrequests`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `AadharNumber` (`AadharNumber`),
  ADD UNIQUE KEY `PANNumber` (`PANNumber`);

--
-- Indexes for table `regularemployee`
--
ALTER TABLE `regularemployee`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Aadhar Number` (`AadharNumber`);

--
-- Indexes for table `requestaccess`
--
ALTER TABLE `requestaccess`
  ADD UNIQUE KEY `requestID_UNIQUE` (`requestID`);

--
-- Indexes for table `rollbacktransactionreqsa`
--
ALTER TABLE `rollbacktransactionreqsa`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `syslog`
--
ALTER TABLE `syslog`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `systemadmin`
--
ALTER TABLE `systemadmin`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Aadhar Number` (`AadharNumber`);

--
-- Indexes for table `systemmanager`
--
ALTER TABLE `systemmanager`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Aadhar Number` (`AadharNumber`);

--
-- Indexes for table `tokenforforgotpswd`
--
ALTER TABLE `tokenforforgotpswd`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `transactionreqre`
--
ALTER TABLE `transactionreqre`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `TransactionID` (`TransactionID`);

--
-- Indexes for table `transactionreqsa`
--
ALTER TABLE `transactionreqsa`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `TransactionID` (`TransactionID`);

--
-- Indexes for table `transactionreqsm`
--
ALTER TABLE `transactionreqsm`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `TransactionID` (`TransactionID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `ID` bigint(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `accountreq`
--
ALTER TABLE `accountreq`
  MODIFY `ID` bigint(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `autherizereq`
--
ALTER TABLE `autherizereq`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `authtransaction`
--
ALTER TABLE `authtransaction`
  MODIFY `ID` bigint(100) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `individualuser`
--
ALTER TABLE `individualuser`
  MODIFY `ID` bigint(100) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `merchant`
--
ALTER TABLE `merchant`
  MODIFY `ID` int(100) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `merchantemployees`
--
ALTER TABLE `merchantemployees`
  MODIFY `ID` bigint(100) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `msg`
--
ALTER TABLE `msg`
  MODIFY `ID` bigint(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `regrequests`
--
ALTER TABLE `regrequests`
  MODIFY `ID` int(100) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `regularemployee`
--
ALTER TABLE `regularemployee`
  MODIFY `ID` bigint(100) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `rollbacktransactionreqsa`
--
ALTER TABLE `rollbacktransactionreqsa`
  MODIFY `ID` int(100) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `syslog`
--
ALTER TABLE `syslog`
  MODIFY `ID` bigint(100) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `systemadmin`
--
ALTER TABLE `systemadmin`
  MODIFY `ID` bigint(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `systemmanager`
--
ALTER TABLE `systemmanager`
  MODIFY `ID` bigint(100) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tokenforforgotpswd`
--
ALTER TABLE `tokenforforgotpswd`
  MODIFY `ID` bigint(100) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `ID` bigint(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `transactionreqre`
--
ALTER TABLE `transactionreqre`
  MODIFY `ID` bigint(100) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `transactionreqsa`
--
ALTER TABLE `transactionreqsa`
  MODIFY `ID` bigint(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `transactionreqsm`
--
ALTER TABLE `transactionreqsm`
  MODIFY `ID` bigint(100) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
