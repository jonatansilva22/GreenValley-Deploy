import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Reports.css'; // Archivo CSS para estilos

function Reports() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 id='informes'>Informes</h1>
      <p id='p-menu' onClick={() => navigate('/menu')}>Menu</p>
    </div>
  );
}

export default Reports;
