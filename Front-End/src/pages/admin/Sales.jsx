import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importa Axios
import './Sales.css'; // Archivo CSS para estilos

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
    <div className="sales-container">
      <div className="header">
        <h1 id='ventas'>Ventas</h1>
        <button id='p-menu' onClick={() => navigate('/menu')}>Menu</button>
      </div>
      <div id="sales-container-wrapper">
        <table id="sales-container">
          <thead>
            <tr>
              <th>ID Artículo</th>
              <th>ID Producto Pedido</th>
              <th>Utilidad</th>
              <th>Porcentaje Utilidad</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta) => (
              <tr key={venta.idArticulo}>
                <td>{venta.idArticulo}</td>
                <td>{venta.idProductoPedido}</td>
                <td>{venta.utilidad}</td>
                <td>{venta.porcentajeUtilidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Sales;
