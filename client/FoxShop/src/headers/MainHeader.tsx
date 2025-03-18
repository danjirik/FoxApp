// Header.tsx
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../assets/logo.svg';

const Header: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {/* Logo */}
        <Navbar.Brand href="#home">
          <img
            alt="Logo"
            src={Logo} // Nahraďte URL vlastním logem
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Lišákův obchod
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Navigační odkazy */}
          <Nav className="ms-auto">
            <Nav.Link href="#domu">Domů</Nav.Link>
            <Nav.Link href="#produkty">Produkty</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
