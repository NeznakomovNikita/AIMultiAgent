import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <a href="/" className={styles.navLink}>Главная</a>
        <a href="/about" className={styles.navLink}>О нас</a>
        <a href="/contact" className={styles.navLink}>Контакты</a>
      </nav>
      <button className={styles.authButton}>Авторизация</button>
    </header>
  );
};

export default Header;
