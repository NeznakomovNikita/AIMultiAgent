import React from 'react';
import { motion } from 'framer-motion';
import styles from './MorphingShapes.module.css';

const MorphingShapes: React.FC = () => {
  const variants = {
    start: {
      borderRadius: ['20%', '50%', '20%'],
      scale: [1, 1.5, 1],
      rotate: [0, 90, 0],
    },
    end: {
      borderRadius: ['20%', '50%', '20%'],
      scale: [1, 1.5, 1],
      rotate: [0, -90, 0],
    },
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.shape}
        variants={variants}
        initial="start"
        animate={['start', 'end']}
        transition={{
          duration: 5,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'mirror',
        }}
      />
    </div>
  );
};

export default MorphingShapes;