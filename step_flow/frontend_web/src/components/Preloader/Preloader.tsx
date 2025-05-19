import React from 'react';
import styles from './Preloader.module.css';

const Preloader: React.FC = () => {
  return (
    <div className={styles.preloaderContainer}>
      <div className={styles.spinner}></div>
      <p>Загрузка...</p>
    </div>
  );
};

export default Preloader;