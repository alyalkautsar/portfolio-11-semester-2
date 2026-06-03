import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import logo from '../../assets/my-logo.svg';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logoLink}>
          <img src={logo} alt="Aly Al Kautsar" className={styles.logo} />
        </Link>

        <div className={styles.rightSection}>
          <ul className={styles.navLinks}>
            <li>
              <Link to="/" className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className={`${styles.navLink} ${isActive('/about') ? styles.active : ''}`}>
                About
              </Link>
            </li>
            <li>
              <Link to="/project" className={`${styles.navLink} ${isActive('/project') ? styles.active : ''}`}>
                Project
              </Link>
            </li>
            <li>
              <Link to="/contact" className={`${styles.navLink} ${isActive('/contact') ? styles.active : ''}`}>
                Contact
              </Link>
            </li>
          </ul>

          <button 
            className={styles.themeToggle} 
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            ) : (
              <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
