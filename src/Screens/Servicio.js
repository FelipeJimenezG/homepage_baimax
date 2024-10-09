import React from "react";
import styles from "./Servicio.module.css";
import WebImage2 from "../assets/WebImage2.jpg";

const Servicio = () => {
  return (
    <div name="Servicio" className={styles.servicio}>
      <p>Baimax es una página web básica para ayudar a los<br></br> cuidadores de personas de la tercera edad</p>

      <img className={styles.webImage} src={WebImage2} alt="Ilustración de servicios para cuidadores de ancianos" />
    
    </div>
  );
};

export default Servicio;