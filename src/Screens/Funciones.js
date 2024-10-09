import React from "react";
import styles from "./Funciones.module.css";
import Step from "../Components/Step";

const Funciones = () => {
  const steps = [
    
    {
      text: "Formulario básico de salud",
      id: 1,
    },
    {
      text: "Medicamentos del paciente",
      id: 2,
    },
    {
      text: "Registro de estado de ánimo",
      id: 3,
    },
    {
      text: "Notas o observaciones diarias ",
      id: 4,
    },
    {
      text: "Recordatorio de medicamentos",
      id: 5,
    },
  ];

  return (
    <div name="Funciones" className={styles.Funciones}>
      <h2 className={styles.title}>Funciones</h2>
      {steps.map((x) => (
        <Step text={x.text} step={x.id} />
      ))}
    </div>
  );
};

export default Funciones;
