import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';
import axios from 'axios';

const LoginForm = () => {
  const [body, setBody] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const inputChange = ({ target }) => {
    const { name, value } = target;
    setBody({
      ...body,
      [name]: value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setMessage(''); // Limpiar cualquier mensaje anterior
    axios.post('http://localhost:4000/api/login', body)
      .then(({ data }) => {
        setMessage('Ingresando...');
        localStorage.setItem('auth', '"yes"');
        localStorage.setItem('userId', data.id);
        localStorage.setItem('userFullName', data.user); 
        setTimeout(() => navigate('/Baimax'), 5000); 
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            alert('Nombre de usuario o contraseña incorrecta');
          } else if (error.response.status === 404) {
            alert('Usuario no registrado. Por favor, regístrese.');
          } else {
            alert('Error en el inicio de sesión. Por favor, intente de nuevo.');
          }
        } else {
          alert('Error de conexión. Por favor, intente de nuevo más tarde.');
        }
      });
  };

  return (
    <div className={styles.loginPage}>
      <section className={styles.loginSection}>
        <form className={styles.loginForm} onSubmit={onSubmit}>
          <h1>Inicio</h1>
          {message && <div className={styles.message}>{message}</div>}
          <div className={styles.inputbox}>
            <ion-icon name="mail-outline"></ion-icon>
            <input 
              type="text" 
              name="username"
              required 
              value={body.username}
              onChange={inputChange}
            />
            <label htmlFor="username">Usuario</label>
          </div>
          <div className={styles.inputbox}>
            <ion-icon name="lock-closed-outline"></ion-icon>
            <input 
              type="password" 
              name="password"
              required 
              value={body.password}
              onChange={inputChange}
            />
            <label htmlFor="password">Contraseña</label>
          </div>
          <div className={styles.forget}>
            <label>
              <input type="checkbox" /> Recordar
            </label>
            <a href="https://www.google.com/intl/es-419/gmail/about/">Olvidé la contraseña</a>
          </div>
          <button type="submit">Iniciar</button>
          <div className={styles.register}>
            <p>
              No tengo una cuenta <Link to="/Registro">Registrarse</Link>
            </p>
          </div>
        </form>
      </section>
    </div>
  );
};

export default LoginForm;