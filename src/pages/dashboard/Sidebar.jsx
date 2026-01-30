import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();
  return (
    <Nav className="flex-column text-white p-3">
      <h4 className="text-center text-warning  mb-4">Dashboard</h4>

      <Nav.Link as={Link} to="/dashboard" className="text-white">
        📊 Summary
      </Nav.Link>

      <Nav.Link as={Link} to="/products" className="text-white">
        📦 Products
      </Nav.Link>

      <Nav.Link as={Link} to="/users" className="text-white">
        👤 Users
      </Nav.Link>

      <Nav.Link as={Link} to="/carts" className="text-white">
        🛒 Carts
      </Nav.Link>
{!user && (
      <Nav.Link as={Link} to="/login" className="text-warning mt-4">
        🔐 Authentication
      </Nav.Link>
)}
    </Nav>
  );
};

export default Sidebar;
