import React from 'react';
import styles from './Baimax.module.css'

const BaimaxInicio = () => {
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.manual}>
          <h1 className={styles.title}>Bienvenido a Baimax</h1>
          <p className={styles.description}>
            Baimax es una plataforma digital innovadora diseñada para mejorar la calidad de vida de las personas de la tercera edad. 
            Proporcionamos herramientas eficientes y fáciles de usar que permiten a los enfermeros ofrecer un seguimiento detallado y preciso, 
            promoviendo así un envejecimiento digno y saludable.
          </p>
          
          <h2>Manual de Usuario</h2>
          
          <section className={styles.section}>
            <h3>Datos Personales</h3>
            <p>
              En este apartado, podrá ingresar y gestionar la información personal tanto del paciente como del enfermero. 
              Se requiere llenar un formato donde se especifican enfermedades, tratamientos, cuidados específicos y medicamentos del paciente. 
              Esta información es fundamental para proporcionar un cuidado personalizado y eficiente.
            </p>
          </section>
          
          <section className={styles.section}>
            <h3>Estado de Humor</h3>
            <p>
              Aquí encontrará una barra con diferentes caras que representan el estado de ánimo del paciente. 
              Puede seleccionar la cara que mejor refleje el humor del paciente en ese día. 
              Esta herramienta ayuda a llevar un registro del bienestar emocional del paciente a lo largo del tiempo.
            </p>
          </section>
          
          <section className={styles.section}>
            <h3>Observaciones</h3>
            <p>
              Este apartado permite ingresar notas y observaciones de los comportamientos específicos del paciente. 
              Es un espacio para registrar cualquier información relevante que pueda ser útil para el seguimiento y cuidado del adulto mayor.
            </p>
          </section>
          
          <section className={styles.section}>
            <h3>Alarma</h3>
            <p>
              En esta sección, el encargado del paciente puede configurar y gestionar los horarios de medicación. 
              Puede ingresar los tiempos específicos para la administración de medicamentos, lo que ayuda a asegurar que se suministren en los momentos correctos, 
              minimizando cualquier margen de error.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BaimaxInicio;