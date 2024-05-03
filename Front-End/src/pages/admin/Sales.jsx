import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sales.css'; // Archivo CSS para estilos

function Sales() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 id='ventas'>Ventas</h1>
      <p id='p-menu' onClick={() => navigate('/menu')}>Menu</p>
    </div>
  );
}

export default Sales;
