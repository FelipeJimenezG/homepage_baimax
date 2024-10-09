import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './DatosPersonales.module.css';

const DatosPersonales = () => {
  const [datosEnfermero, setDatosEnfermero] = useState({
    nombreCompleto: '',
    cedula: '',
    fechaNacimiento: '',
    genero: '',
    telefono: ''
  });
  const [datosPaciente, setDatosPaciente] = useState({
    full_name: '',
    fecha_nacimiento: '',
    cedula: '',
    phone_number: '',
    enfermedades: '',
    medicamentos: '',
    tratamiento: ''
  });
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      fetchDatosEnfermero(storedUserId);
      fetchDatosPaciente(storedUserId);
    }
  }, []);

  const fetchDatosEnfermero = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/enfermeros/${id}`);
      if (response.data) {
        setDatosEnfermero(response.data);
      }
    } catch (error) {
      console.error('Error al obtener los datos del enfermero:', error);
    }
  };

  const fetchDatosPaciente = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/paciente/${id}`);
      if (response.data) {
        setDatosPaciente(response.data);
      }
    } catch (error) {
      console.error('Error al obtener los datos del paciente:', error);
    }
  };

  const handleEnfermeroChange = (e) => {
    const { name, value } = e.target;
    setDatosEnfermero(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert('Por favor, inicie sesión para guardar los datos.');
      return;
    }
    try {
      const dataToSend = { ...datosEnfermero, usuario_id: userId };
      if (datosEnfermero.id) {
        await axios.put(`http://localhost:4000/api/enfermeros/${userId}`, dataToSend);
      } else {
        await axios.post(`http://localhost:4000/api/enfermeros`, dataToSend);
      }
      alert('Datos guardados exitosamente');
      fetchDatosEnfermero(userId);
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      alert('Error al guardar los datos: ' + (error.response?.data || error.message));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No disponible';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };


  return (
    <div className={styles.body}>
      <div className={styles.datosPersonalesContainer}>
        <h2>Datos Personales</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formSection}>
            <h3>Datos del Enfermero</h3>
            <input
              type="text"
              name="nombreCompleto"
              value={datosEnfermero.nombreCompleto}
              onChange={handleEnfermeroChange}
              placeholder="Nombre Completo"
              required
            />
            <input
              type="text"
              name="cedula"
              value={datosEnfermero.cedula}
              onChange={handleEnfermeroChange}
              placeholder="Cédula"
              required
            />
            <input
              type="date"
              name="fechaNacimiento"
              value={datosEnfermero.fechaNacimiento}
              onChange={handleEnfermeroChange}
              required
            />
            <select
              name="genero"
              value={datosEnfermero.genero}
              onChange={handleEnfermeroChange}
              required
            >
              <option value="">Seleccione Género</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
            <input
              type="tel"
              name="telefono"
              value={datosEnfermero.telefono}
              onChange={handleEnfermeroChange}
              placeholder="Teléfono"
            />
         </div>
          <button type="submit" className={styles.submitButton}>Guardar</button>
        </form>
        <div className={styles.datosGuardados}>
          <h3>Datos Guardados del Enfermero:</h3>
          <p><strong>Nombre Completo:</strong> {datosEnfermero.nombreCompleto || 'No disponible'}</p>
          <p><strong>Cédula:</strong> {datosEnfermero.cedula || 'No disponible'}</p>
          <p><strong>Fecha de Nacimiento:</strong> {formatDate(datosEnfermero.fechaNacimiento)}</p>
          <p><strong>Género:</strong> {datosEnfermero.genero || 'No disponible'}</p>
          <p><strong>Teléfono:</strong> {datosEnfermero.telefono || 'No disponible'}</p>
        </div>
        <div className={styles.datosGuardados}>
          <h3>Datos del Paciente:</h3>
          <p><strong>Nombre Completo:</strong> {datosPaciente.full_name || 'No disponible'}</p>
          <p><strong>Fecha de Nacimiento:</strong> {formatDate(datosPaciente.fecha_nacimiento)}</p>
          <p><strong>Cédula:</strong> {datosPaciente.cedula || 'No disponible'}</p>
          <p><strong>Teléfono:</strong> {datosPaciente.phone_number || 'No disponible'}</p>
          <p><strong>Enfermedades:</strong> {datosPaciente.enfermedades || 'No disponible'}</p>
          <p><strong>Medicamentos:</strong> {datosPaciente.medicamentos || 'No disponible'}</p>
          <p><strong>Tratamiento:</strong> {datosPaciente.tratamiento || 'No disponible'}</p>
        </div>
      </div>
    </div>
  );
};

export default DatosPersonales;