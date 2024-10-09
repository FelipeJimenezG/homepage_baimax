import React from "react";
import styles from "./Beneficios.module.css";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { FaPeopleCarry } from "react-icons/fa";
import { FaMoneyBillAlt } from "react-icons/fa";
import { AiOutlineSchedule } from "react-icons/ai";
import { AiOutlineRise } from "react-icons/ai";
import { FiRepeat } from "react-icons/fi";

const Beneficios = () => {
  return (
    <div name="Beneficios" className={styles.Beneficios}>
      <h2 className={styles.BenefitTitle}>
        Beneficios de utilizar Baimax
      </h2>
      <p>
      Accesibilidad y facilidad de uso <BsFillDoorOpenFill />
      </p>
      <p>
      Seguimiento detallado y preciso
        <FaPeopleCarry />
      </p>
      <p>
        {" "}
        Pagina web gratis <FaMoneyBillAlt />
      </p>
      <p>
      Monitoreo del estado de ánimo
        <AiOutlineSchedule />
      </p>
      <p>
      Mejora en la atención personalizada
        <AiOutlineRise />
      </p>
      <p>
      Centralización de la información 
        <FiRepeat />
      </p>
    </div>
  );
};

export default Beneficios;
