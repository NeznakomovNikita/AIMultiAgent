import React from 'react';
import { motion } from 'framer-motion';
import styles from './HomePage.module.css';
import heroImage from '../../assets/hero-image.jpg';
// import logo from '../../assets/logo.jpg'; // Логотип теперь в хедере, нахуй он тут
import Header from '../../components/Header/Header'; // Импортируем наш новый хедер, блядь
import MorphingShapes from '../../components/MorphingShapes/MorphingShapes'; // А вот и наши морфинг-хуевины

const HomePage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // const logoVariants = { // Это тоже теперь в хедере
  //   hidden: { opacity: 0, scale: 0.5 },
  //   visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  // };

  const text = "Step Flow: Автоматизируй рутину, освободи время для важного!";
  const words = text.split(" ");

  const titleVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };


  return (
    <div className={styles.homePageWrapper}> {/* Обёртка для хедера и hero */}
      <Header /> {/* Вот он, наш хедер! */}
      <motion.div
        className={styles.heroSection} // Раньше был container, теперь это heroSection
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Старый motion.header убираем нахуй, логотип теперь в компоненте Header
        <motion.header className={styles.header} variants={itemVariants}>
          <motion.img
            src={logo}
            className={styles.logo}
            alt="Step Flow Logo"
            variants={logoVariants}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.header>
        */}
        <motion.main className={styles.mainContent} variants={itemVariants}>
&lt;MorphingShapes /&gt; {/* Вставляем наши анимированные фигуры */}
          <motion.img
            src={heroImage}
            className={styles.heroImage}
            alt="Hero Image"
            variants={itemVariants} // Можно и свои варианты для картинки сделать, если надо
            initial={{ opacity: 0, scale: 0.8 }} // Убрал y: 50, пусть по центру будет
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "circOut" }}
          />
          <motion.h1 className={styles.heroTitle} variants={titleVariants}> {/* Добавил класс для заголовка */}
            {words.map((word, index) => (
              <motion.span
                key={index}
                variants={wordVariants}
                style={{ display: 'inline-block', marginRight: '0.25em' }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          {/* Тут будет еще больше ахуенного контента и призыв к действию, блядь */}
        </motion.main>
        {/* Футер пока уберем из hero-секции, он будет отдельно, если понадобится
        <motion.footer className={styles.footer} variants={itemVariants}>
          <p>&copy; {new Date().getFullYear()} Step Flow. Все права защищены, нахуй.</p>
        </motion.footer>
        */}
      </motion.div>
    </div>
  );
};

export default HomePage;