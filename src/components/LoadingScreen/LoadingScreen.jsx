import { useState, useEffect } from 'react';
import styles from './LoadingScreen.module.css';

const LoadingScreen = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem('hasLoadedBefore');

    if (hasLoadedBefore) {
      setIsVisible(false);
      if (onComplete) onComplete();
      return;
    }

    const interval = setInterval(() => {
      setCount(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    if (count >= 100) {
      sessionStorage.setItem('hasLoadedBefore', 'true');
      const timeout = setTimeout(() => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [count, onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`${styles.overlay} ${count >= 100 ? styles.fadeOut : ''}`}>
      <div className={styles.content}>
        <div className={styles.counterWrapper}>
          <span className={styles.counter}>{count}</span>
          <span className={styles.percent}>%</span>
        </div>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${count}%` }}
          ></div>
        </div>
        <p className={styles.loadingText}>Memuat...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
