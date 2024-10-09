import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaRegAngry, FaRegFrown, FaRegMeh, FaRegSmile, FaRegLaugh } from 'react-icons/fa';
import styles from './EstadoHumor.module.css';

const EstadoHumor = () => {
  const [estadoHumor, setEstadoHumor] = useState(null);
  const [observacion, setObservacion] = useState('');
  const [registros, setRegistros] = useState([]);
  const [userId, setUserId] = useState(null);

  const estadosHumor = [
    { icono: <FaRegAngry />, descripcion: 'Muy Enojado' },
    { icono: <FaRegFrown />, descripcion: 'Triste' },
    { icono: <FaRegMeh />, descripcion: 'Neutral' },
    { icono: <FaRegSmile />, descripcion: 'Contento' },
    { icono: <FaRegLaugh />, descripcion: 'Muy Feliz' },
  ];

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      fetchRegistros(storedUserId);
    }
  }, []);

  const fetchRegistros = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/estados-humor?userId=${id}`);
      setRegistros(response.data);
    } catch (error) {
      console.error('Error al obtener los registros:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (estadoHumor !== null && userId) {
      const nuevoRegistro = {
        usuario_id: userId,
        estado: estadosHumor[estadoHumor].descripcion,
        observacion,
      };
      try {
        await axios.post('http://localhost:4000/api/estados-humor', nuevoRegistro);
        alert('Estado de ánimo registrado exitosamente');
        setObservacion('');
        setEstadoHumor(null);
        fetchRegistros(userId);
      } catch (error) {
        console.error('Error al guardar el estado de ánimo:', error);
        alert('Error al guardar el estado de ánimo: ' + error.response?.data || error.message);
      }
    }
  };
  if (!userId) {
    return <div>Por favor, inicie sesión para registrar su estado de ánimo.</div>;
  }

  return (
    <div className={styles.body}>
      <div className={styles.estadoHumorContainer}>
        <h2>Estado de Ánimo</h2>
        <div className={styles.humorBarra}>
          {estadosHumor.map((estado, index) => (
            <button
              key={index}
              className={`${styles.humorBoton} ${estadoHumor === index ? styles.seleccionado : ''}`}
              onClick={() => setEstadoHumor(index)}
            >
              {estado.icono}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit} className={styles.humorForm}>
          <textarea
            value={observacion}
            onChange={(e) => setObservacion(e.target.value)}
            placeholder="Observaciones sobre el estado de ánimo..."
            className={styles.observacionInput}
          />
          <button type="submit" className={styles.submitButton}>Guardar Registro</button>
        </form>
        <div className={styles.registrosList}>
          <h3>Registros de Estado de Ánimo:</h3>
          {registros.map((registro, index) => (
            <div key={index} className={styles.registroItem}>
              <p><strong>Fecha:</strong> {new Date(registro.fecha_registro).toLocaleString()}</p>
              <p><strong>Estado:</strong> {registro.estado}</p>
              <p><strong>Observación:</strong> {registro.observacion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EstadoHumor;