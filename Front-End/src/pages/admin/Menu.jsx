import React from 'react';
import './Menu.css'; // Archivo CSS para estilos
import Informes from '/src/assets/img/informes.png';
import Inventario from '/src/assets/img/inventario.png';
import Ventas from '/src/assets/img/ventas.png';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

function Menu() {
  const navigate = useNavigate(); // Declara navigate

  return (
    <div>
      <h1>Bienvenido!</h1>
      <div id="lista">
      <div id="btnHome">
          <p id='p-login' onClick={() => navigate('/')}>Cerrar sesión</p>
        </div>
        <ul>
          <li id="li_inventario">
            <div id="enlace" onClick={() => navigate('/inventory')}>
              <img src={Inventario} alt="" id="imagenes" />
              Inventario
            </div>
          </li>
          <li id="li_ventas">
            <div id="enlace" onClick={() => navigate('/sales')}>
              <img src={Ventas} alt="" id="imagenes" />
              Ventas
            </div>
          </li>
          <li id="li_informes">
            <div id="enlace" onClick={() => navigate('/reports')}>
              <img src={Informes} alt="" id="imagenes" />
              Informes
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Menu;
