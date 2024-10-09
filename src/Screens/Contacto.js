import React from "react";
import styles from "./Contacto.module.css";

const Contacto = () => {
  return (
    <div name="Contacto" className={styles.contacto}>
      <h2>Contacto</h2>
      <form
        className={styles.form}
        method="POST"
        action="https://getform.io/f/718583e8-f2fc-4e02-a970-9f8a6eaa2036"
      >
        <label for="Name">Nombre</label>
        <input id="Name" name="Name" className={styles.input}></input>
        <label for="Email">Email</label>
        <input
          id="Email"
          name="Email"
          type="Email"
          className={styles.input}
        ></input>
        <label for="Message">Mensaje</label>
        <textarea id="Message" className={styles.textArea}></textarea>
        <button type="submit">Subir</button>
      </form>
      <br></br><br></br><br></br><br></br>
      <footer class="site-footer">
    <div class="container">
        <p> &copy; 2024 Baimax. Todos los derechos reservados.</p>
    </div>
</footer>
    </div>
  );
};

export default Contacto;