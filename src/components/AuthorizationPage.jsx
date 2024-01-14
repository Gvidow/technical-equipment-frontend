import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions/authActions';
import { Link } from 'react-router-dom';

import { useCustomNavigate } from '../modules/redirect'

import NavbarTechnicalEquipment from './Navbar';
import Header from './Header';

import './AuthorizationPage.css';



const AuthorizationPage = () => {
  const backgroundStyle = {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useCustomNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/modelings');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    await dispatch(loginUser(username, password));
    if (isAuthenticated) {
      navigate('/modelings');
    };
  };

  return (
    <div>
      <NavbarTechnicalEquipment />
      <Header showCart={false} showApp={false} />
      <div className="authorization-container" style={backgroundStyle}>
        <div>
          <div className="custom-form">
            <label htmlFor="username">Имя пользователя:</label>
            <input
              type="text"
              id="username"
              placeholder="Введите логин"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              <div className="custom-button" onClick={handleLogin}>
                Войти
              </div>
              <Link className="custom-button" to="/registration">
                Не зарегистрированы?
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="hrContainer"></div>
    </div>
  );
};

export default AuthorizationPage;
