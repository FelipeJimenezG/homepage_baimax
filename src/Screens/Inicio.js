import React from "react";
import { Link } from "react-scroll";
import styles from "./Inicio.module.css";

const Inicio = () => {
  return (
    <div name="Inicio" className={styles.Inicio}>
      <div className={styles.titleContainer}>
        <p>
        Mejore el cuidado<br />
          <b>de adultos mayores</b>
        </p>
        <p>
        Con la mejor <br />
          <b>asistencia digital gratuita</b>
        </p>
      </div>
      <div className={styles.ctaContainer}>
        <Link
          to="Contacto"
          smooth
          duration={500}
          className={styles.callToAction}
        >
         Ponerse en contacto
        </Link>
      </div>
    </div>
  );
};

export default Inicio;
