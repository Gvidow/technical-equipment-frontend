import React from 'react';
import ReactDOM from 'react-dom';
import './Navbar.css';

const UserProfileMenuPortal = ({ user, show, onClose }) => {
  const portalRoot = document.getElementById('user-profile-menu-root');

  if (!portalRoot) return null;

  const role = user?.role === 'user' ? 'Пользователь' : 'Модератор';

  return ReactDOM.createPortal(
    (
      <>
        <div className={`user-profile-menu ${show ? 'show' : ''}`}>
          <div className="user-profile-menu-header">
            <span>Профиль пользователя</span>
            <button onClick={onClose}>Закрыть</button>
          </div>
          <div className="user-profile-menu-content">
            <p>Имя: {user?.username}</p>
            {/* <p>Email: {user?.email}</p> */}
            <p>Роль: {role}</p>
          </div>
        </div>

        {show && <div className="overlay" onClick={onClose}></div>}
      </>
    ),
    portalRoot
  );
};

export default UserProfileMenuPortal;
