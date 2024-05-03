import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterProduct.css';

function RegisterProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    precioVenta: '', // Cambiado de precio a precioVenta
    categoría: '', // Cambiado de categoria a categoria
    cantidadEnStock: '' // Cambiado de cantidad a cantidadEnStock
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/products', formData);
      alert("Producto agregado correctamente");
      navigate("/inventory");
    } catch (error) {
      console.error('Error al agregar el producto:', error);
      alert("Hubo un error al agregar el producto.");
    }
  };

  return (
    <div>
      <h1>Alta de productos</h1>
      <div id="botones">
        <p id='p-inventario' onClick={() => navigate("/inventory")}>Atrás</p>
        <p id='p-menu' onClick={() => navigate("/menu")}>Menú</p>
      </div>

      <form id="altaProductoForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre del Producto:</label>
          <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="precioVenta">Precio:</label>
          <input type="number" id="precioVenta" name="precioVenta" min="0" step="0.01" value={formData.precioVenta} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="categoria">Categoría:</label>
          <input type="text" id="categoría" name="categoría" value={formData.categoría} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="cantidadEnStock">Cantidad:</label>
          <input type="number" id="cantidadEnStock" name="cantidadEnStock" min="0" value={formData.cantidadEnStock} onChange={handleChange} required />
        </div>
        <div>
          <button type="submit" id="btnGuardar">Guardar</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterProduct;
