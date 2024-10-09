import React, { useState, useEffect } from "react";
import axios from 'axios';
import styles from './Observaciones.module.css'

const Observaciones = () => {
  const [observacion, setObservacion] = useState('');
  const [observaciones, setObservaciones] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchObservaciones(userId);
    }
  }, [userId]);

  const fetchObservaciones = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/observaciones?userId=${id}`);
      setObservaciones(response.data);
    } catch (error) {
      console.error('Error al obtener las observaciones:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userId && observacion.trim()) {
      const nuevaObservacion = {
        usuario_id: userId,
        texto: observacion,
      };
      try {
        const response = await axios.post('http://localhost:4000/api/observaciones', nuevaObservacion);
        if (response.status === 200) {
          setObservaciones(prevObservaciones => [
            response.data,
            ...prevObservaciones
          ]);
          setObservacion('');
          alert('Observación registrada exitosamente');
        }
      } catch (error) {
        console.error('Error al guardar la observación:', error);
        alert('Error al guardar la observación: ' + error.response?.data || error.message);
      }
    }
  };

  const formatDate = (fecha, hora) => {
    if (!fecha || !hora) {
      return 'Fecha no disponible';
    }
    try {
      const [year, month, day] = fecha.split('-');
      const [hours, minutes] = hora.split(':');
      const date = new Date(year, month - 1, day, hours, minutes);
      return date.toLocaleString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error al formatear la fecha:', error);
      return 'Fecha no disponible';
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.observacionesContainer}>
        <h2>Observaciones</h2>
        <form onSubmit={handleSubmit} className={styles.observacionForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="observacion">Nueva Observación:</label>
            <textarea
              id="observacion"
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
              required
              className={styles.observacionInput}
            />
          </div>
          <button type="submit" className={styles.submitButton}>Agregar Observación</button>
        </form>
        <div className={styles.observacionesList}>
          <h3>Observaciones Guardadas:</h3>
          {observaciones.map((obs) => (
            <div key={obs.id} className={styles.observacionItem}>
              <p className={styles.observacionTexto}>{obs.texto}</p>
              <p className={styles.observacionFecha}>
                {formatDate(obs.fecha, obs.hora)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Observaciones;