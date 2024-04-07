import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

import { CartWidget } from "./CartWidget";

export const NavBar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Nav.Link to="/" className="navbar-brand" as={NavLink}>
          Área 51 Shop
        </Nav.Link>
        <Nav className="me-auto">
          <Nav.Link to="/category/Torso" as={NavLink}>
            Torso
          </Nav.Link>
          <Nav.Link to="/category/Bermudas" as={NavLink}>
            Bermudas
          </Nav.Link>
          <Nav.Link to="/category/Accesorios" as={NavLink}>
            Accesorios{" "}
          </Nav.Link>
        </Nav>
        <CartWidget />
      </Container>
    </Navbar>
  );
};
