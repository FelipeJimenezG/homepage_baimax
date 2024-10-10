import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Registro.module.css';

const Registro = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    gender: '',
    cedula: '',
    fechaNacimiento: '',
    enfermedades: '',
    medicamentos: '',
    tratamiento: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  
    if (name === 'password') {
      if (value.length < 8) {
        setPasswordError('La contraseña debe contener 8 caracteres como mínimo');
      } else {
        setPasswordError('');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (formData.password.length < 8) {
      alert("La contraseña debe contener 8 caracteres como mínimo");
      return;
    }
    
    const { confirmPassword, ...dataToSend } = formData;

    axios.post('http://localhost:4000/api/register', dataToSend)
      .then(response => {
        console.log(response.data);
        alert('Registro exitoso');
        navigate('/login');
      })
      .catch(error => {
        console.error('Error en el registro:', error.response.data);
        alert('Error en el registro: ' + error.response.data);
      });
  };


  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.title}>Registro</div>
        <form onSubmit={handleSubmit}>
          <div className={styles.userDetails}>
            <div className={styles.inputBox}>
              <span className={styles.details}>Nombre Completo</span>
              <input 
                type="text" 
                name="fullName"
                placeholder="Ingrese su nombre" 
                required
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputBox}>
              <span className={styles.details}>Nombre Usuario</span>
              <input 
                type="text" 
                name="username"
                placeholder="Ingrese su nombre de usuario" 
                required
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputBox}>
              <span className={styles.details}>Fecha de nacimiento</span>
              <input 
                type="date" 
                name="fechaNacimiento"
                placeholder="Ingrese su fecha de nacimiento" 
                required
                value={formData.fechaNacimiento}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputBox}>
              <span className={styles.details}>Cedula</span>
              <input 
                type="text" 
                name="cedula"
                placeholder="Ingrese su cedula" 
                required
                value={formData.cedula}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputBox}>
              <span className={styles.details}>Email</span>
              <input 
                type="email" 
                name="email"
                placeholder="Ingrese su email" 
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputBox}>
              <span className={styles.details}>Número de teléfono</span>
              <input 
                type="tel" 
                name="phoneNumber"
                placeholder="Ingrese su número de teléfono" 
                required
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputBox}>
              <span className={styles.details}>Contraseña</span>
              <input 
                type="password" 
                name="password"
                placeholder="Ingrese su contraseña" 
                required
                value={formData.password}
                onChange={handleChange}
              />
              {passwordError && <span className={styles.error}>{passwordError}</span>}
            </div>
            <div className={styles.inputBox}>
              <span className={styles.details}>Confirmar Contraseña</span>
              <input 
                type="password" 
                name="confirmPassword"
                placeholder="Confirmar contraseña" 
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.fullWidthInput}>
            <span className={styles.details}>Enfermedades</span>
            <textarea 
              name="enfermedades"
              placeholder="Ingrese sus enfermedades" 
              value={formData.enfermedades}
              onChange={handleChange}
            />
          </div>
          <div className={styles.fullWidthInput}>
            <span className={styles.details}>Medicamentos</span>
            <textarea 
              name="medicamentos"
              placeholder="Ingrese sus medicamentos" 
              value={formData.medicamentos}
              onChange={handleChange}
            />
          </div>
          <div className={styles.fullWidthInput}>
            <span className={styles.details}>Tratamiento</span>
            <textarea 
              name="tratamiento"
              placeholder="Ingrese su tratamiento" 
              value={formData.tratamiento}
              onChange={handleChange}
            />
          </div>
          <div className={styles.genderDetails}>
            <span className={styles.genderTitle}>Género</span>
            <div className={styles.category}>
              <label htmlFor="dot-1">
                <input 
                  type="radio" 
                  name="gender" 
                  id="dot-1" 
                  value="Masculino"
                  onChange={handleChange}
                />
                <span className={`${styles.dot} ${styles.one}`}></span>
                <span className={styles.gender}>Masculino</span>
              </label>
              <label htmlFor="dot-2">
                <input 
                  type="radio" 
                  name="gender" 
                  id="dot-2" 
                  value="Femenino"
                  onChange={handleChange}
                />
                <span className={`${styles.dot} ${styles.two}`}></span>
                <span className={styles.gender}>Femenino</span>
              </label>
              <label htmlFor="dot-3">
                <input 
                  type="radio" 
                  name="gender" 
                  id="dot-3" 
                  value="Prefiero no decir"
                  onChange={handleChange}
                />
                <span className={`${styles.dot} ${styles.three}`}></span>
                <span className={styles.gender}>Prefiero no decir</span>
              </label>
            </div>
          </div>
          <div className={styles.button}>
            <input type="submit" value="Registrarse"/>
          </div>
        </form>
        <div className={styles.loginLink}>
          ¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default Registro;