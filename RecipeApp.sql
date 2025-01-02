-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: dev-mysql
-- Generation Time: Jan 02, 2025 at 06:03 PM
-- Server version: 9.1.0
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `RecipeApp`
--

CREATE DATABASE IF NOT EXISTS RecipeApp;
USE RecipeApp;

-- --------------------------------------------------------

--
-- Table structure for table `Categories`
--

CREATE TABLE `Categories` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_lithuanian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_lithuanian_ci;

--
-- Dumping data for table `Categories`
--

INSERT INTO `Categories` (`id`, `name`) VALUES
(22, 'Apkepas'),
(3, 'Desertai'),
(7, 'Mėsa'),
(1, 'Pietūs'),
(32, 'Pyragai'),
(2, 'Pusryčiai'),
(31, 'Sausainiai'),
(21, 'Tortai'),
(30, 'Vakarienė'),
(8, 'Žuvis');

-- --------------------------------------------------------

--
-- Table structure for table `Image`
--

CREATE TABLE `Image` (
  `id` int NOT NULL,
  `source` varchar(255) COLLATE utf8mb4_lithuanian_ci DEFAULT NULL,
  `recipe_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_lithuanian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Ingredients`
--

CREATE TABLE `Ingredients` (
  `id` int NOT NULL,
  `recipe_id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_lithuanian_ci NOT NULL,
  `amount` int DEFAULT NULL,
  `amount_type` varchar(50) COLLATE utf8mb4_lithuanian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_lithuanian_ci;

--
-- Dumping data for table `Ingredients`
--

INSERT INTO `Ingredients` (`id`, `recipe_id`, `name`, `amount`, `amount_type`) VALUES
(29, 33, 'Varškės (pyragu, ar dalis maskarpones)', 500, 'g'),
(30, 33, 'kondensuoto pieno, saldinto (mažinti – vieną indel', 300, 'g'),
(31, 33, 'Kiaušinių', 2, 'g'),
(32, 33, 'Miltų (jei be viršutinio sluoksnio – galima mažiau', 300, 'g'),
(33, 33, 'sviesto (šalto)', 200, 'g'),
(34, 33, 'Cukraus ', 120, 'g'),
(35, 33, 'riešutų (smulkinti graikiniai, lazdyno ar migdolai', 1, 'stiklinės'),
(36, 33, 'kakavos', 50, 'g'),
(37, 33, 'Grietinės', 1, 'šaukštas'),
(38, 33, 'kepimo miltelių', 1, 'šaukštelis'),
(39, 33, 'vanilinio cukraus', 1, 'šaukštelis');

-- --------------------------------------------------------

--
-- Table structure for table `Post`
--

CREATE TABLE `Post` (
  `id` int NOT NULL,
  `fk_user` varchar(50) COLLATE utf8mb4_lithuanian_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_lithuanian_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_lithuanian_ci,
  `update_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_lithuanian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Recipes`
--

CREATE TABLE `Recipes` (
  `id` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_lithuanian_ci NOT NULL,
  `description` text COLLATE utf8mb4_lithuanian_ci,
  `fk_user` varchar(50) COLLATE utf8mb4_lithuanian_ci DEFAULT NULL,
  `cook_time` varchar(100) COLLATE utf8mb4_lithuanian_ci DEFAULT NULL,
  `servings` varchar(50) COLLATE utf8mb4_lithuanian_ci DEFAULT NULL,
  `steps` text COLLATE utf8mb4_lithuanian_ci NOT NULL,
  `update_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `notes` text COLLATE utf8mb4_lithuanian_ci,
  `imagePath` varchar(255) COLLATE utf8mb4_lithuanian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_lithuanian_ci;

--
-- Dumping data for table `Recipes`
--

INSERT INTO `Recipes` (`id`, `title`, `description`, `fk_user`, `cook_time`, `servings`, `steps`, `update_date`, `notes`, `imagePath`) VALUES
(33, 'Skaniausias varškės pyragas', 'Pats skaniausias varškės pyragas, kokį man yra tekę ragauti. Visi kas paragauja, prašo recepto. O variacijų su juo irgi daug galima prisigalvoti - kartais gaminu su graikiniais riešutais, kartais su migdolais, kartais visai be riešutų, kartais riešutus dedu ne į tešlą, o į varškės masę, kartais į varkšės masę pagardinimui įpilu šaukštelį brendžio arba įdedu rome pamirkytų razinų. Cukraus kiekį irgi galite varijuoti savo nuožiūra - man pyragai patinka saldūs, bet jeigu mėgstate mažiau saldžiai, p', 'dop', 'apie 1 val.', '8', '[\"Orkaitę įkaitinkite iki 180ºC (gal mažiau?) (įjungti pasiruošus produktus varškės sluoksniui ir pasiruošus tešlą). Pasiruoškite 30 x 22 cm keturkampę arba 26 cm (tinka ir 24 cm) apvalią formą, išklokite ją kepimo popieriumi. (tinka stačiakampė skardinė, didesniam kiekiui keramikinė raudona)\",\"Kombaine išmaišyti miltus, cukrų, kakavą, kepimo miltelius, šaltą kubeliais supjaustytą sviestą (gal sutarkuot iš kameros su sumaišytais sausais produktais), grietinę ir vanilinį cukrų. Maišyti pulso režimu, kol pasidarys trupiniai. Arba, jei neturite kombaino, galima ingredientus kapoti peiliu irgi kol gausis trupiniai, tik kad ilgiau užtrunka. (sumaišyti sausus produktus ir į juos įtarkuoti šaldytą sviestą tiesiai iš kameros)Jei tešla per sausa, įdėkite dar truputį grietinės (gali ir nesulipti\",\"Likusius suberkite į kepimo formą ir paspausti ranką, kad gautųsi vientisas sluoksnis. Kepkite įkaitintoje orkaitėje 12-15 min (5 min.). Išėmę orkaitės temperatūrą sumažinkite iki 150 ºC (gal mažiau)\",\"Tuo metu pasiruošti įdarą: išplakite varškę, kondensuotą pieną ir kiaušinius (išplakti atskirai). Dar kartais įpilu porą šaukštų brendžio ar romo, labai gardų prieskonį suteikia. (dėti aguonas ar dar mirkytas brendyje razinas –tuomet mažiau cukrau ar kondensuoto pieno). Jei be viršaus – bananai ant tešlos, ant viršršaus varškė su mažiau cukraus ir ant viršaus migdolų drožlės.\",\"Gautą masę užpilkite ant apkepto pagrindo ir kepkite 5 – 7 minutes (jei norisi gražiai atskirto – ilgiau gal 7 min. pakepti). Kremas šiek tiek sutirštės ir tuomet bus galima užberti likusius trupinius, sumaišytus su riešutais. (be kakavos – dar ant viršaus migdolų drožles, ar tik migdolų drožles.)\",\"Tada vėl dėti į orkaitę ir kepti dar 25 – 30 (20) minučių, iki viršutinis trupinių sluoksnis atrodys sausas. Šio pyrago svarbu neperkepti, kad varškės įdaras neišsausėtų, jau geriau kepti truputį trumpiau negu per ilgai (vėsdamas pyragas puikiai sustingsta, net jeigu išėmus iš orkaitės ir atrodo, kad dar galėtų truputį pakepti).\",\"Visiškai ataušinkite ir bent 2 - 3 valandas (o geriausiai - per naktį) palaikykite šaldytuve, nes šis pyragas skaniausias šaltas. O skanaukite atsargiai - nenusikąskite liežuvio, nes tai tikrai pats skaniausias varškės pyragas, kokį yra tekę ragauti!\"]', '2025-01-01 23:47:57', 'Nuoroda į receptą https://www.lamaistas.lt/receptas/skaniausias-varskes-pyragas-10574', 'uploads/b6569a7185c4fcab537aa79b61d91b74.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `Recipe_Category`
--

CREATE TABLE `Recipe_Category` (
  `recipe_id` int NOT NULL,
  `category_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_lithuanian_ci;

--
-- Dumping data for table `Recipe_Category`
--

INSERT INTO `Recipe_Category` (`recipe_id`, `category_id`) VALUES
(33, 3),
(33, 32);

-- --------------------------------------------------------

--
-- Table structure for table `Steps`
--

CREATE TABLE `Steps` (
  `id` int NOT NULL,
  `recipe_id` int DEFAULT NULL,
  `step_nr` varchar(50) COLLATE utf8mb4_lithuanian_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_lithuanian_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_lithuanian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `username` varchar(50) COLLATE utf8mb4_lithuanian_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_lithuanian_ci NOT NULL,
  `password` varchar(60) COLLATE utf8mb4_lithuanian_ci NOT NULL,
  `creation_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_lithuanian_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`username`, `email`, `password`, `creation_date`) VALUES
('dop', 'ultidumper@gmail.com', '$2b$10$SPfKYPJRxBkBbk7lBVfFV.YZIRbV91P2Ex1eQv.Fd03J.e0GUNfRS', '2024-12-27 00:26:31'),
('fop', 'fop', '$2b$10$c.EV6UZYcellCcvMtQzcY.eWJL2Xt5kMtOBPDuB2w8H4b8OWe7nau', '2024-12-29 10:59:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Categories`
--
ALTER TABLE `Categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `Image`
--
ALTER TABLE `Image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recipe_id` (`recipe_id`);

--
-- Indexes for table `Ingredients`
--
ALTER TABLE `Ingredients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recipe_ingredient` (`recipe_id`);

--
-- Indexes for table `Post`
--
ALTER TABLE `Post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user` (`fk_user`);

--
-- Indexes for table `Recipes`
--
ALTER TABLE `Recipes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user` (`fk_user`);
ALTER TABLE `Recipes` ADD FULLTEXT KEY `title` (`title`,`description`);

--
-- Indexes for table `Recipe_Category`
--
ALTER TABLE `Recipe_Category`
  ADD PRIMARY KEY (`recipe_id`,`category_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `Steps`
--
ALTER TABLE `Steps`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recipe_id` (`recipe_id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Categories`
--
ALTER TABLE `Categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `Image`
--
ALTER TABLE `Image`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Ingredients`
--
ALTER TABLE `Ingredients`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `Post`
--
ALTER TABLE `Post`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Recipes`
--
ALTER TABLE `Recipes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `Steps`
--
ALTER TABLE `Steps`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Image`
--
ALTER TABLE `Image`
  ADD CONSTRAINT `Image_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `Recipes` (`id`);

--
-- Constraints for table `Ingredients`
--
ALTER TABLE `Ingredients`
  ADD CONSTRAINT `recipe_ingredient` FOREIGN KEY (`recipe_id`) REFERENCES `Recipes` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Constraints for table `Post`
--
ALTER TABLE `Post`
  ADD CONSTRAINT `Post_ibfk_1` FOREIGN KEY (`fk_user`) REFERENCES `Users` (`username`);

--
-- Constraints for table `Recipes`
--
ALTER TABLE `Recipes`
  ADD CONSTRAINT `Recipes_ibfk_1` FOREIGN KEY (`fk_user`) REFERENCES `Users` (`username`);

--
-- Constraints for table `Recipe_Category`
--
ALTER TABLE `Recipe_Category`
  ADD CONSTRAINT `Recipe_Category_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `Recipes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Recipe_Category_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `Categories` (`id`);

--
-- Constraints for table `Steps`
--
ALTER TABLE `Steps`
  ADD CONSTRAINT `Steps_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `Recipes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
