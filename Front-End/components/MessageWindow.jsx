import React from 'react';
import PropTypes from "prop-types";
import './MessageWindow.css';

const Popup = ({ message, onClose }) => {
  return (
    <div className="modal-container" id="modal">
      <div className="modal-content">
        <h2>Error!</h2>
        <p>"Credenciales incorrectas"</p>
        <button onClick={onClose} className="close-button">Cerrar</button>
      </div>
    </div>
  );
};

Popup.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Popup;
