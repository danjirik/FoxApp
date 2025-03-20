import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../../assets/logo.svg";

const Header: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={NavLink} to="/">
          <img
            alt="Logo"
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Lišákův obchod
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/domu">
              Domů
            </Nav.Link>
            <Nav.Link as={NavLink} to="/produkty">
              Produkty
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
