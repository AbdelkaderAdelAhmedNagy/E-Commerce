import { Routes, Route } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import Dashboard from "./pages/dashboard/Dashboard";
import Products from "./pages/products/Products";
import ProductDetails from "./pages/products/ProductDetails";
import Carts from "./pages/carts/Carts";
import Users from "./pages/users/Users";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";


const App = () => (
  <>
    <AppNavbar />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/carts" element={<Carts />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  </>
);

export default App;
