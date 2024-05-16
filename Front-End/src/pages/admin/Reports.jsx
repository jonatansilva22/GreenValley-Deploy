import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importa Axios
import './Reports.css'; // Archivo CSS para estilos

function Reports() {
  const navigate = useNavigate();
  const [movimientos, setMovimientos] = useState([]);

  useEffect(() => {
    fetchMovimientos();
  }, []);

  const fetchMovimientos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/reports');
      setMovimientos(response.data);
    } catch (error) {
      console.error('Error al obtener movimientos:', error);
    }
  };

  return (
    <div>
      <h1 id='informes'>Informes</h1>
      <p id='p-menu' onClick={() => navigate('/menu')}>Menu</p>
      <div id="reports-container-wrapper">
        <table id="reports-container">
          <thead>
            <tr>
              <th>ID Movimiento</th>
              <th>ID Producto</th>
              <th>Tipo</th>
              <th>Cantidad</th>
              <th>Venta</th>
              <th>Fecha y Hora</th>
            </tr>
          </thead>
          <tbody>
            {movimientos.map((movimiento) => (
              <tr key={movimiento.idMovimiento}>
                <td>{movimiento.idMovimiento}</td>
                <td>{movimiento.idProducto}</td>
                <td>{movimiento.tipo}</td>
                <td>{movimiento.cantidad}</td>
                <td>{movimiento.venta ? 'Venta' : 'No Venta'}</td>
                <td>{movimiento.movFechaHora}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;
