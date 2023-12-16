-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 17, 2023 at 04:11 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_mentorify`
--

-- --------------------------------------------------------

--
-- Table structure for table `date`
--

CREATE TABLE `date` (
  `id` bigint(10) UNSIGNED NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `date_time`
--

CREATE TABLE `date_time` (
  `id` bigint(10) UNSIGNED NOT NULL,
  `date_id` bigint(10) UNSIGNED NOT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(10) UNSIGNED NOT NULL,
  `service_id` bigint(10) UNSIGNED NOT NULL,
  `user_id` bigint(10) UNSIGNED NOT NULL,
  `amount` int(100) NOT NULL,
  `paid_at` datetime NOT NULL,
  `canceled_at` datetime NOT NULL,
  `expired_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` bigint(10) UNSIGNED NOT NULL,
  `user_id` bigint(10) UNSIGNED NOT NULL,
  `review` longtext DEFAULT NULL,
  `full_name` varchar(225) DEFAULT NULL,
  `rating` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(10) UNSIGNED NOT NULL,
  `name` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'mentee'),
(2, 'mentor'),
(3, 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `save_mentor`
--

CREATE TABLE `save_mentor` (
  `id` bigint(10) UNSIGNED NOT NULL,
  `user_id` bigint(10) UNSIGNED NOT NULL,
  `useridrolementor` bigint(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `id` bigint(10) UNSIGNED NOT NULL,
  `topic_id` bigint(10) UNSIGNED NOT NULL,
  `date_id` bigint(10) UNSIGNED NOT NULL,
  `user_id` bigint(10) UNSIGNED NOT NULL,
  `question` longtext DEFAULT NULL,
  `price` int(100) NOT NULL,
  `linkmeet` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `service_user`
--

CREATE TABLE `service_user` (
  `id` bigint(10) UNSIGNED NOT NULL,
  `service_id` bigint(10) UNSIGNED NOT NULL,
  `user_id` bigint(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `topic`
--

CREATE TABLE `topic` (
  `id` bigint(10) UNSIGNED NOT NULL,
  `name` varchar(225) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(10) UNSIGNED NOT NULL,
  `role_id` bigint(10) UNSIGNED NOT NULL,
  `full_name` varchar(225) NOT NULL,
  `password` varchar(225) NOT NULL,
  `email` varchar(225) NOT NULL,
  `institution` varchar(225) DEFAULT NULL,
  `phone` varchar(225) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `gender` varchar(225) DEFAULT NULL,
  `topic` varchar(225) DEFAULT NULL,
  `skill` varchar(225) DEFAULT NULL,
  `bio` longtext DEFAULT NULL,
  `rating` int(10) DEFAULT NULL,
  `review` longtext DEFAULT NULL,
  `certification` varchar(225) DEFAULT NULL,
  `experience` varchar(225) DEFAULT NULL,
  `city` varchar(225) DEFAULT NULL,
  `time_zone` varchar(225) DEFAULT NULL,
  `balance` varchar(225) DEFAULT NULL,
  `image` varchar(225) DEFAULT NULL,
  `price` int(10) DEFAULT NULL,
  `experience_institution` varchar(225) DEFAULT NULL,
  `experience_location` varchar(225) DEFAULT NULL,
  `experience_date_from` datetime DEFAULT NULL,
  `experience_date_to` datetime DEFAULT NULL,
  `experience_status` varchar(225) DEFAULT NULL,
  `institution_location` varchar(225) DEFAULT NULL,
  `institution_year_from` int(10) DEFAULT NULL,
  `institution_year_to` int(10) DEFAULT NULL,
  `certification_from` varchar(225) DEFAULT NULL,
  `certification_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role_id`, `full_name`, `password`, `email`, `institution`, `phone`, `birth_date`, `gender`, `topic`, `skill`, `bio`, `rating`, `review`, `certification`, `experience`, `city`, `time_zone`, `balance`, `image`, `price`, `experience_institution`, `experience_location`, `experience_date_from`, `experience_date_to`, `experience_status`, `institution_location`, `institution_year_from`, `institution_year_to`, `certification_from`, `certification_date`) VALUES
(2, 1, 'Ari', '$2a$10$ZZ5LMQYUqtkuoYi2uSMun.4/Jx8ExxXSjFokBhlnR5zjA5aR40Gq6', 'ari@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 1, 'Ari', '$2a$10$PUjRgNkT1sYDvqhmJlMh1ebiVWCIzeW3c8TxLMUxKEiy5RjWUZhzq', 'ari123@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 1, 'Ari Kurniawan', '$2a$10$lWNcpUAn4hS0V7jLk4GKh.GQW9debJUyuYHD10vr7XjjWNTx4ndDe', 'ari957752@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 1, 'Ari', '$2a$10$FU6cs5QT8Nz/fouqhUtzvOqq24w4JwYyMWAdFUyHbz6N0I8rvVaw.', 'ari1234@gmail.com', 'Universitas Negeri Surabaya', '08123456789', '2002-06-09', 'Laki-laki', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Surabaya', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 1, 'Salim', '$2a$10$56ovXCYjtAqdJdx1HvaqnuUKsUe8zKGY/G1ZC5pPe/zKbAQB3F7n6', 'salim@gmail.com', 'universita xyz', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 1, 'tes', '$2a$10$1z2u65vsQ6UTJ80tveIiL.dM7i9zdoCr6MJRoShOSKZP4SujyoTHW', 'tes@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, 1, 'John Doe', '$2a$10$o8Lrk1uHte3cm9cqCuo/4ev8IeVY.vu6D.G9VnxxT8MdMJ5uTvJbK', 'cit@gmail.com', 'Updated University', '987654321', '1990-01-01', 'Male', 'Updated Topic', 'Updated Skill', 'Updated Bio', NULL, NULL, 'Updated Certification', 'Updated Experience', 'Updated City', 'Updated Time Zone', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(10, 2, 'mentor baru', '$2a$10$nTC8uUR00wNvxa1cpO66DuxX8QEqQXE71Udnc.H7oBwYqHsdvVnv.', 'mentor@gmail.com', 'harvard', '987654321', '2023-12-03', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'woi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(11, 1, 'ucup', '$2a$10$Xpyv3QAD.KtEfJlZZY7ZFezLErB/mF.WRXTMQTa8Ow0V5pqySXj0G', 'ucup@gmail.com', 'Universitas XYZ', '08123456789', '2002-01-17', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Surabaya', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `date`
--
ALTER TABLE `date`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `date_time`
--
ALTER TABLE `date_time`
  ADD PRIMARY KEY (`id`),
  ADD KEY `date_time_date_foreign` (`date_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_service_foreign` (`service_id`),
  ADD KEY `orders_users_foreign` (`user_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD KEY `reviews_users_foreign` (`user_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `save_mentor`
--
ALTER TABLE `save_mentor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `save_mentor_users_foreign` (`user_id`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_topic_foreign` (`topic_id`),
  ADD KEY `service_date_foreign` (`date_id`),
  ADD KEY `service_users_foreign` (`user_id`);

--
-- Indexes for table `service_user`
--
ALTER TABLE `service_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_users_services_foreign` (`service_id`),
  ADD KEY `service_users_users_foreign` (`user_id`);

--
-- Indexes for table `topic`
--
ALTER TABLE `topic`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_roles_foreign` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `date`
--
ALTER TABLE `date`
  MODIFY `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `date_time`
--
ALTER TABLE `date_time`
  MODIFY `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `save_mentor`
--
ALTER TABLE `save_mentor`
  MODIFY `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `service_user`
--
ALTER TABLE `service_user`
  MODIFY `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `topic`
--
ALTER TABLE `topic`
  MODIFY `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `date_time`
--
ALTER TABLE `date_time`
  ADD CONSTRAINT `date_time_date_foreign` FOREIGN KEY (`date_id`) REFERENCES `date` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_service_foreign` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`),
  ADD CONSTRAINT `orders_users_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_users_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `save_mentor`
--
ALTER TABLE `save_mentor`
  ADD CONSTRAINT `save_mentor_users_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `service`
--
ALTER TABLE `service`
  ADD CONSTRAINT `service_date_foreign` FOREIGN KEY (`date_id`) REFERENCES `date` (`id`),
  ADD CONSTRAINT `service_topic_foreign` FOREIGN KEY (`topic_id`) REFERENCES `topic` (`id`),
  ADD CONSTRAINT `service_users_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `service_user`
--
ALTER TABLE `service_user`
  ADD CONSTRAINT `service_users_services_foreign` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`),
  ADD CONSTRAINT `service_users_users_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_roles_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
