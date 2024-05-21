import { useState } from 'react';
import PropTypes from 'prop-types';
import UserContext from './UserContext';
import { useNavigate } from 'react-router-dom';

export function UserProvider({ children }) {
  const nav = useNavigate();
  const [userInfo, setUserInfo] = useState(() => {
    const info = JSON.parse(sessionStorage.getItem('userInfo'));
    return info || false;
  });

  const handleLogout = () => {
    sessionStorage.removeItem("userInfo");
    nav("/");
  };

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;