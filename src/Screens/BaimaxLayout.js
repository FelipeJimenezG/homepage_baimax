import React from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import styles from './BaimaxLayout.module.css';

const BaimaxLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('userId');
    localStorage.removeItem('userFullName');
    setTimeout(() => navigate('/login'), 5000);
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li><Link to="/datos-personales">Datos Personales</Link></li>
            <li><Link to="/estado-humor">Estado de Humor</Link></li>
            <li><Link to="/observaciones">Observaciones</Link></li>
            <li><Link to="/alarma">Alarma</Link></li>
          </ul>
          <button onClick={handleLogout} className={styles.logoutButton}>Cerrar Sesión</button>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default BaimaxLayout;