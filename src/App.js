import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from "./Screens/Inicio";
import Servicio from "./Screens/Servicio";
import Funciones from "./Screens/Funciones";
import Beneficios from "./Screens/Beneficios";
import Contacto from "./Screens/Contacto";
import LoginForm from "./Screens/LoginForm";
import MainLayout from './MainLayout';
import Registro from './Screens/Registro';
import Baimax from './Screens/Baimax';
import DatosPersonales from './Screens/DatosPersonales';
import EstadoHumor from './Screens/EstadoHumor';
import Observaciones from './Screens/Observaciones';
import Alarma from './Screens/Alarma';
import BaimaxInicio from './Screens/BaimaxInicio';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <MainLayout>
            <Inicio />     
            <Servicio />
            <Funciones />
            <Beneficios />
            <Contacto />
          </MainLayout>
        } />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/Baimax" element={<Baimax />}>
          <Route index element={<BaimaxInicio />} />
          <Route path="datos-personales" element={<DatosPersonales />} />
          <Route path="estado-humor" element={<EstadoHumor />} />
          <Route path="observaciones" element={<Observaciones />} />
          <Route path="alarma" element={<Alarma />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;