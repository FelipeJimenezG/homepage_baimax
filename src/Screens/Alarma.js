import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import styles from './Alarma.module.css';

const Alarma = () => {
  const [dia, setDia] = useState('');
  const [hora, setHora] = useState('');
  const [minutos, setMinutos] = useState('');
  const [medicamento, setMedicamento] = useState('');
  const [alarmas, setAlarmas] = useState([]);
  const [alertaVisible, setAlertaVisible] = useState(false);
  const [alarmaActual, setAlarmaActual] = useState(null);
  const [alarmasSonadas, setAlarmasSonadas] = useState([]);
  const [userId, setUserId] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchAlarmas(userId);
    }
  }, [userId]);

  const fetchAlarmas = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/alarmas?userId=${id}`);
      // Sort alarmas by fecha_programada in descending order (newest first)
      const sortedAlarmas = response.data.sort((a, b) => 
        new Date(b.fecha_programada) - new Date(a.fecha_programada)
      );
      setAlarmas(sortedAlarmas);
    } catch (error) {
      console.error('Error al obtener las alarmas:', error);
    }
  };

  useEffect(() => {
    const intervalo = setInterval(() => {
      const ahora = new Date();
      alarmas.forEach((alarma) => {
        const fechaAlarma = new Date(alarma.fecha_programada);
        const alarmaKey = `${alarma.id}`;
        
        if (
          fechaAlarma.getTime() <= ahora.getTime() &&
          !alertaVisible &&
          !alarmasSonadas.includes(alarmaKey) &&
          alarma.estado === 'Pendiente'
        ) {
          activarAlarma(alarma);
          setAlarmasSonadas(prev => [...prev, alarmaKey]);
        }
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [alarmas, alertaVisible, alarmasSonadas]);

  const activarAlarma = (alarma) => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    setAlarmaActual(alarma);
    setAlertaVisible(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userId) {
      const nuevaAlarma = { usuario_id: userId, dia, hora, minutos, medicamento };
      try {
        const response = await axios.post('http://localhost:4000/api/alarmas', nuevaAlarma);
        if (response.status === 200) {
          // Add the new alarm to the beginning of the array
          setAlarmas(prevAlarmas => [response.data, ...prevAlarmas]);
          setDia('');
          setHora('');
          setMinutos('');
          setMedicamento('');
          alert('Alarma registrada exitosamente');
        }
      } catch (error) {
        console.error('Error al guardar la alarma:', error);
        alert('Error al guardar la alarma: ' + error.response?.data || error.message);
      }
    }
  };

  const cerrarAlerta = async () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    if (alarmaActual) {
      try {
        await axios.put(`http://localhost:4000/api/alarmas/${alarmaActual.id}`, {
          estado: 'Sonada'
        });
        
        setAlarmas(prevAlarmas => 
          prevAlarmas.map(alarma => 
            alarma.id === alarmaActual.id ? {...alarma, estado: 'Sonada'} : alarma
          )
        );
      } catch (error) {
        console.error('Error al actualizar el estado de la alarma:', error);
      }
    }
    
    setAlertaVisible(false);
    setAlarmaActual(null);
  };

  const formatearFechaHora = (fechaHora) => {
    const fecha = new Date(fechaHora);
    return format(fecha, 'yyyy-MM-dd HH:mm');
  };

  const getEstadoColor = (estado) => {
    switch(estado) {
      case 'Pendiente':
        return styles.estadoPendiente;
      case 'Sonada':
        return styles.estadoSonada;
      case 'Tomada':
        return styles.estadoTomada;
      default:
        return '';
    }
  };

  if (!userId) {
    return <div>Por favor, inicie sesión para configurar alarmas.</div>;
  }

  return (
    <div className={styles.body}>
      <audio ref={audioRef} src="https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3" loop />
      <div className={styles.alarmaContainer}>
        <h2>Configurar Alarma de Medicamento</h2>
        <form onSubmit={handleSubmit} className={styles.alarmaForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="dia">Día:</label>
            <input
              type="date"
              id="dia"
              value={dia}
              onChange={(e) => setDia(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="hora">Hora:</label>
            <input
              type="number"
              id="hora"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              min="0"
              max="23"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="minutos">Minutos:</label>
            <input
              type="number"
              id="minutos"
              value={minutos}
              onChange={(e) => setMinutos(e.target.value)}
              min="0"
              max="59"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="medicamento">Medicamento:</label>
            <input
              type="text"
              id="medicamento"
              value={medicamento}
              onChange={(e) => setMedicamento(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>Agregar Alarma</button>
        </form>
        <div className={styles.alarmasList}>
        <h3>Alarmas Configuradas:</h3>
        {alarmas.map((alarma) => (
          <div key={alarma.id} className={styles.alarmaItem}>
            <span>{formatearFechaHora(alarma.fecha_programada)} - {alarma.medicamento}</span>
            <span className={`${styles.estado} ${getEstadoColor(alarma.estado)}`}>
              {alarma.estado}
            </span>
          </div>
          ))}
        </div>
        {alertaVisible && (
          <div className={styles.alerta}>
            <h3>¡Hora de tomar el medicamento!</h3>
            <p>{`Alarma: ${formatearFechaHora(alarmaActual.fecha_programada)}`}</p>
            <p>{`Medicamento: ${alarmaActual.medicamento}`}</p>
            <button onClick={cerrarAlerta} className={styles.cerrarAlerta}>Aceptar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alarma;