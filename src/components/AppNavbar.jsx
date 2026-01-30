import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AppNavbar = () => {
  const { user, logout } = useAuth();

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand> E-Commerce Project</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Dashboard
          </Nav.Link>
          <Nav.Link as={Link} to="/products">
            Products
          </Nav.Link>
          <Nav.Link as={Link} to="/carts">
            Carts
          </Nav.Link>
          <Nav.Link as={Link} to="/users">
            Users
          </Nav.Link>
        </Nav>
        <div className="d-flex gap-4">
          {!user && (
            <>
              <Button as={Link} to="/login">
                Login
              </Button>
              <Button as={Link} to="/register">
                Register
              </Button>
            </>
          )}
          {user && <Button onClick={logout}>Logout</Button>}
        </div>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
