import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../actions/registrationActions';
import { useNavigate } from 'react-router-dom';

import NavbarTechnicalEquipment from './Navbar';
import Header from './Header';

import './AuthorizationPage.css';

// import backgroundImage from '/login-background.jpg';

const useCustomNavigate = () => {
  const navigate = useNavigate();

  const customNavigate = (url) => {
    navigate(url);
  };

  return customNavigate;
};

const RegistrationPage = () => {
  const backgroundStyle = {
    // backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useCustomNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/modelings');
    }
  }, [isAuthenticated, navigate]);

  const handleRegister = async () => {
    const userData = {
      email,
      username,
      password,
    };

    await dispatch(registerUser(userData));
  
    if (isAuthenticated) {
      navigate('/equipment/feed');
    };
  };

  return (
    <div>
      <NavbarTechnicalEquipment />
      <Header showCart={false} showApp={false}/>
      <div className="authorization-container" style={backgroundStyle}>
        <div>
          <div className="custom-form">
            <label htmlFor="username">Имя пользователя:</label>
            <input
              type="text"
              id="username"
              placeholder="Введите имя пользователя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="email">Почта:</label>
            <input
              type="email"
              id="email"
              placeholder="Введите почтовый адресс"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="button-container">
              <div className="custom-button" onClick={handleRegister}>
                Зарегистрироваться
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hrContainer"></div>
    </div>
  );
};

export default RegistrationPage;
