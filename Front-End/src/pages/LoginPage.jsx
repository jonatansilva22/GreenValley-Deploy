import React, { useState } from 'react';
import './LoginPage.css'; 
import Logo from '/src/assets/img/Logo.png';
import UserIcon from '/src/assets/img/user-solid.svg';
import KeyIcon from '/src/assets/img/key-solid.svg';
import LoginIcon from '/src/assets/img/right-to-bracket-solid.svg';
import axios from 'axios'; // Importa Axios
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = () => {
    axios.post('http://localhost:3000/login', { // Envia una solicitud POST a la ruta '/login' en tu servidor
      correo: email,
      contraseña: password
    })
    .then(response => {
      if (response.data.success) {
        navigate('/menu'); // Si la respuesta del servidor indica éxito, redirige al usuario al menú
      } else {
        setErrorMessage(response.data.message); // Si hay un error, muestra el mensaje de error del servidor
      }
    })
    .catch(error => {
      console.error('Error al iniciar sesión:', error);
      setErrorMessage('Credenciales incorrectas. Por favor, inténtalo de nuevo.'); // Muestra un mensaje de error genérico
    });
  };

  return (
    <div className="login-page">
      {/* Contenido del login */}
      <div className="square-left">
        <img src={Logo} alt="Slowpitch Green Valley Logo" /> 
        <p className="image-text">Venta de artículos para Slowpitch: <br />
        Guantes, guanteletas, bats, <br />
        mochilas, cleats.</p> 
        <div className="vertical-line1"></div>
        <div className="vertical-line2"></div>
        <div className="vertical-line3"></div>
        <div className="vertical-line4"></div>
      </div>
      <img className="login-icon" src={LoginIcon} alt="Login Icon"  />
      <img className="user-icon" src={UserIcon} alt="User Icon"  />
      <img className="key-icon" src={KeyIcon} alt="Key Icon"  />
      <div className="square-right">
        <p className="login-text">Inicio de sesión</p>
        <p className="email-text">Correo electrónico:</p>
        <input 
          className='email-input' 
          type="text" 
          placeholder='Ingrese correo electrónico' 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        /> 
        <p className="password-text">Contraseña:</p>
        <input 
          className='password-input' 
          type="password" 
          placeholder='Ingrese contraseña' 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        /> 
        <button className='login-button' onClick={handleLogin}>Ingresar</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="vertical-line5"></div>
        <div className="vertical-line6"></div>
        <div className="vertical-line7"></div>
      </div>
    </div>
  );
}

export default LoginPage;
