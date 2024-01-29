import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import logoImage from '/printer-icon.svg';
import './Navbar.css';
import personIcon from '/logo-user.png';

import UserProfileMenuPortal from './UserProfileMenuPortal';


function NavbarTechnicalEquipment({ showConstructor = false }) {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const [showUserProfileMenu, setShowUserProfileMenu] = React.useState(false);

  const isModerator = (user && user.role === 'moderator') ? true : false;

  // const dispatch = useDispatch();
  const handleUserProfileClick = () => {
    setShowUserProfileMenu(!showUserProfileMenu);
  };

  const handleCloseUserProfileMenu = () => {
    setShowUserProfileMenu(false);
  };

  return (
    <Navbar className="color-navbar" expand="lg">
      <Container>
      {/* <Container> */}
        <Link to="/equipment/feed">
          <Image src={logoImage} roundedCircle className="logo-img" alt="Логотип TechnicalEquipment" />
        </Link>
        <Navbar.Brand as={Link} to="/equipment/feed" className="brand-text">
          Техническое оборудование
        </Navbar.Brand>
        {/* </Container> */}
        <Nav className="ms-auto">

          {isModerator && showConstructor && (
            <Link to="/equipment/edit" className="btns-log">
              Редактирование оборудования
            </Link>
          )}
          {/* {isAuthenticated && (
            <Link to="/equipment/requests" className="btns-log">
              {isModerator ? "Управление заявками" : "Заявки"}
            </Link>
          )} */}
          <Link to="/equipment/feed" className="btns-log">
            Оборудование
          </Link>

          {isAuthenticated ? (
            <>
              <div className='user-name'>
               {user?.username}
              </div>
              <div className="user-icon" onClick={handleUserProfileClick}>
                <Image src={personIcon} className="logo-img" alt="Иконка пользователя" />
              </div>
              <Link to="/logout" className="btns-log">
                Выйти
              </Link>
              <UserProfileMenuPortal user={user} show={showUserProfileMenu} onClose={handleCloseUserProfileMenu} />
            </>
          ) : (
            <>
              
              <Link to="/signup" className="btns-log">
                Зарегистрироваться
              </Link>
              <Link to="/login" className="btns-log">
                Войти
              </Link>
              
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarTechnicalEquipment;
