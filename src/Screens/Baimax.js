import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import styles from './Baimax.module.css';

const Baimax = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [userFullName, setUserFullName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('userFullName');
    if (storedName) {
      setUserFullName(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('userId');
    localStorage.removeItem('userFullName');
    setTimeout(() => navigate('/login'), 5000);
  };

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  const navItems = [
    { path: '/Baimax', label: 'Manual' },
    { path: '/Baimax/datos-personales', label: 'Datos Personales' },
    { path: '/Baimax/estado-humor', label: 'Estado de Humor' },
    { path: '/Baimax/observaciones', label: 'Observaciones' },
    { path: '/Baimax/alarma', label: 'Alarma' },
  ];

  return (
    <div className={styles.baimax}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`${styles.navLink} ${activeLink === item.path ? styles.active : ''}`}
                  onClick={() => handleLinkClick(item.path)}
                >
                  {item.label}
                  {activeLink === item.path && <span className={styles.activeIndicator} />}
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.userInfo}>
            {userFullName && (
              <span className={styles.welcome}>
                ¡Bienvenido! {userFullName}
              </span>
            )}
            <button onClick={handleLogout} className={styles.logoutButton}>Cerrar Sesión</button>
          </div>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Baimax;