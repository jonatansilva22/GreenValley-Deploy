import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importa Axios
import './Sales.css'; // Archivo CSS para estilos

//Este es un comentario
function Sales() {
  const navigate = useNavigate();
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    fetchVentas();
  }, []);

  const fetchVentas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/sales');
      setVentas(response.data);
    } catch (error) {
      console.error('Error al obtener ventas:', error);
    }
  };

  return (
    <div>
      <h1 id='ventas'>Ventas</h1>
      <p id='p-menu' onClick={() => navigate('/menu')}>Menu</p>
      <div id="sales-container-wrapper">
        <table id="sales-container">
          <thead>
            <tr>
              <th>ID Movimiento</th>
              <th>ID Producto</th>
              <th>Tipo</th>
              <th>Cantidad</th>
              <th>Fecha y Hora</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta) => (
              <tr key={venta.idMovimiento}>
                <td>{venta.idMovimiento}</td>
                <td>{venta.idProducto}</td>
                <td>{venta.tipo}</td>
                <td>{venta.cantidad}</td>
                <td>{venta.movFechaHora}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Sales;
