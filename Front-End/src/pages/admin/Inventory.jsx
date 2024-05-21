import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Inventory.css';

function Inventory() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/inventory');
      setProducts(response.data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  const handleClickDelete = async () => {
    const selectedProductIds = Array.from(document.querySelectorAll('#inventory-container input[type="checkbox"]:checked')).map(checkbox => checkbox.value);

    if (selectedProductIds.length === 0) {
      alert("Favor de seleccionar un producto");
    } else {
      const confirmation = window.confirm("¿Seguro que quiere dar de baja este producto?");
      if (confirmation) {
        try {
          await Promise.all(selectedProductIds.map(idProducto => axios.delete(`http://localhost:3000/inventory/${idProducto}`)));
          alert("Producto(s) dado(s) de baja exitosamente.");
          fetchProducts(); // Actualiza la lista de productos después de eliminar
        } catch (error) {
          console.error('Error al dar de baja el producto:', error);
          alert("Hubo un error al dar de baja el producto.");
        }
      } else {
        alert("Operación cancelada.");
      }
    }
  };

  const handleEditProduct = (idProducto) => {
    navigate(`/edit/${idProducto}`);
  };

  return (
    <div>
      <h1>Inventario</h1>
      <div>
        <div id="btnHome">
          <p id='p-menu' onClick={() => navigate('/menu')}>Menu</p>
        </div>
        <div id="inventory-container-wrapper">
          <table id="inventory-container">
            <thead>
              <tr>
                <th></th>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio Venta</th>
                <th>Categoría</th>
                <th>Cantidad en Stock</th>
                <th  className="edit-column">Modificar</th> {/* Nueva columna para el botón de editar */}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.idProducto}>
                  <td><input type="checkbox" value={product.idProducto} /></td>
                  <td>{product.idProducto}</td>
                  <td>{product.nombre}</td>
                  <td>{product.precioVenta}</td>
                  <td>{product.categoría}</td>
                  <td>{product.cantidadEnStock}</td>
                  <td className="edit-cell">
                    <button onClick={() => handleEditProduct(product.idProducto)}>Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <div id='btn-container'>
            <button id="btnBaja" onClick={handleClickDelete}>Dar de baja</button>
            <button id="btnAlta" onClick={() => navigate('/register')}>Alta de productos</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
