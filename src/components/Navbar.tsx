import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import logoImage from '/printer-icon.svg';
import './Navbar.css';

function NavbarTechnicalEquipment() {
    return (
        <Navbar className="color-navbar" expand="lg">
        <Container>
            <Link to="/equipment/feed">
                <Image src={logoImage} roundedCircle className="logo-img" alt="Логотип TechnicalEquipment" />
            </Link>
            <Navbar.Brand as={Link} to="/equipment/feed" className="brand-text">
                Техническое оборудование
            </Navbar.Brand>
            <Nav className="ms-auto">
                <Link to="" className="btns-log">Зарегистрироваться</Link>
                <Link to="" className="btns-log">Войти</Link>
            </Nav>
        </Container>
        </Navbar>
    );
}
  
export default NavbarTechnicalEquipment;
