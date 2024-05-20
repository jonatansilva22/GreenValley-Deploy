import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './EditProduct.css';

function EditProduct() {
  const navigate = useNavigate();
  const { idProducto } = useParams();
  const [formData, setFormData] = useState({
    nombre: '',
    precioVenta: '',
    categoría: '',
    cantidadEnStock: ''
  });

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/products/${idProducto}`);
      const productDetails = response.data;
      setFormData(productDetails);
    } catch (error) {
      console.error('Error al obtener los detalles del producto:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/edit/${idProducto}`, formData);
      alert("Producto actualizado correctamente");
      navigate("/inventory");
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      alert("Hubo un error al actualizar el producto.");
    }
  };

  return (
    <div>
      <h1>Editar Producto</h1>
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
          <label htmlFor="categoría">Categoría:</label>
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

export default EditProduct;
