import React, { useEffect, useState } from "react";
import { Link  as ScrollLink} from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { useScrollPosition } from "../Hooks/scrollposition";
const NavBar = () => {
  const [navBarOpen, setNavBarOpen] = useState(false);
  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const detectDimension = () => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectDimension);
    windowDimension.width > 800 && setNavBarOpen(false);
    return () => {
      window.removeEventListener("resize", detectDimension);
    };
  }, [windowDimension]);

  const links = [
    {
      id: 1,
      link: "Inicio",
    },
    {
      id: 2,
      link: "Servicio",
    },
    {
      id: 3,
      link: "Funciones",
    },
    {
      id: 4,
      link: "Beneficios",
    },
    {
      id: 5,
      link: "Iniciar Sesión",
      type: "route",
      to: "/login"
    },
  ];
  

  const scrollPosition = useScrollPosition();

  return (
    <div
      className={
        navBarOpen
          ? styles.navOpen
          : scrollPosition > 0
          ? styles.navOnScroll
          : styles.navBar
      }
    >
      {!navBarOpen && <p className={styles.logo}>Baimax</p>}
      {!navBarOpen && windowDimension.width < 800 ? (
        <AiOutlineMenu
          color="#FFFFFF"
          onClick={() => setNavBarOpen(!navBarOpen)}
          size={25}
        />
      ) : (
        windowDimension.width < 800 && (
          <AiOutlineClose
            onClick={() => setNavBarOpen(!navBarOpen)}
            color="#FFFFFF"
            size={25}
          />
        )
      )}
      {navBarOpen && (
        <ul className={styles.linksContainer}>
          {links.map(({ link, id, type, to }) => (
            <div key={id}>
              {type === "route" ? (
                <RouterLink
                  to={to}
                  onClick={() => setNavBarOpen(false)}
                  className={styles.navLink}
                >
                  {link}
                </RouterLink>
              ) : (
                <ScrollLink
                  to={link}
                  smooth
                  duration={500}
                  onClick={() => setNavBarOpen(false)}
                  className={styles.navLink}
                >
                  {link === "Funciones" ? "Funciones" : link}
                </ScrollLink>
              )}
              <div className={styles.border}></div>
            </div>
          ))}
        </ul>
      )}
      {windowDimension.width > 800 && (
        <ul className={styles.linksContainer}>
          {links.map(({ link, id, type, to }) => (
            <div key={id}>
              {type === "route" ? (
                <RouterLink
                  to={to}
                  className={styles.navLink}
                >
                  {link}
                </RouterLink>
              ) : (
                <ScrollLink
                  to={link}
                  smooth
                  duration={500}
                  className={styles.navLink}
                >
                  {link === "Funciones" ? "Funciones" : link}
                </ScrollLink>
              )}
              <div className={styles.border}></div>
            </div>
          ))}
          <ScrollLink
            to="Contacto"
            smooth
            duration={500}
            className={styles.contactLink}
          >
            Contacto
          </ScrollLink>
        </ul>
      )}
    </div> 
  );
};

export default NavBar;