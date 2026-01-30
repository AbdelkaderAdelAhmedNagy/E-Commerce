import { useEffect, useState } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import {
  getCarts,
  getUserCarts,
  addCart,
  updateCart,
  deleteCart,
} from "../../api/carts";
import DashboardLayout from "../layouts/DashboardLayout";

export default function Carts() {
  const [carts, setCarts] = useState([]);
  const [userIdSearch, setUserIdSearch] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [newCartData, setNewCartData] = useState({ userId: "", products: [] });

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCart, setSelectedCart] = useState(null);
  const [updatedCartData, setUpdatedCartData] = useState({});

 
  const fetchCarts = async () => {
    const res = await getCarts();
    setCarts(res.data.carts);
  };

  useEffect(() => {
    fetchCarts();
  }, []);

 
  const handleUserSearch = async (e) => {
    e.preventDefault();
    if (!userIdSearch.trim()) {
      fetchCarts();
      return;
    }
    try {
      const res = await getUserCarts(userIdSearch);
      const userCarts = res.data.carts || [];
      setCarts(userCarts);
    } catch (err) {
      console.error(err);
      setCarts([]);
    }
  };

  const handleDelete = async (id) => {
    await deleteCart(id);
    setCarts(carts.filter((c) => c.id !== id));
  };


  const openUpdateModal = (cart) => {
    setSelectedCart(cart);
    setUpdatedCartData({ ...cart });
    setShowUpdateModal(true);
  };


  const handleAddChange = (e) => {
    setNewCartData({ ...newCartData, [e.target.name]: e.target.value });
  };
  const handleUpdateChange = (e) => {
    setUpdatedCartData({ ...updatedCartData, [e.target.name]: e.target.value });
  };


const handleAddSubmit = async () => {
  try {
    const productsArray = JSON.parse(newCartData.products);
    const createdCart = await addCart({
      userId: Number(newCartData.userId),
      products: productsArray,
    });
    setCarts([...carts, createdCart]);
    setShowAddModal(false);
    setNewCartData({ userId: "", products: "[]" });
  } catch (err) {
    console.error(err);
    alert("Invalid products JSON or failed to add cart");
  }
};
const handleUpdateSubmit = async () => {
  try {
    const productsArray = JSON.parse(updatedCartData.products);
    const updatedCart = await updateCart(selectedCart.id, {
      products: productsArray,
    });
    setCarts(carts.map((c) => (c.id === selectedCart.id ? updatedCart : c)));
    setShowUpdateModal(false);
  } catch (err) {
    console.error(err);
    alert("Invalid products JSON or failed to update cart");
  }
};

  return (
    <DashboardLayout>
      <div className="m-4">
        <h2 className="mb-3">Carts</h2>

        <Form className="d-flex mb-3" onSubmit={handleUserSearch}>
          <Form.Control
            type="number"
            placeholder="Search by User ID..."
            value={userIdSearch}
            onChange={(e) => setUserIdSearch(e.target.value)}
          />
          <Button type="submit" className="ms-2">
            Search
          </Button>
          <Button
            variant="secondary"
            className="ms-2"
            onClick={() => {
              setUserIdSearch("");
              fetchCarts();
            }}
          >
            Reset
          </Button>
          <Button
            variant="success"
            className="ms-2"
            onClick={() => setShowAddModal(true)}
          >
            Add Cart
          </Button>
        </Form>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Cart ID</th>
              <th>User ID</th>
              <th>Total Products</th>
              <th>Total Quantity</th>
              <th>Total Price ($)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {carts.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.userId}</td>
                <td>{c.totalProducts}</td>
                <td>{c.totalQuantity}</td>
                <td>{c.total}</td>
                <td>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => openUpdateModal(c)}
                  >
                    Update
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(c.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

 
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>User ID</Form.Label>
                <Form.Control
                  type="number"
                  name="userId"
                  value={newCartData.userId}
                  onChange={handleAddChange}
                />
              </Form.Group>
 
              <Form.Group className="mb-3">
                <Form.Label>Products (JSON)</Form.Label>
                <Form.Control
                  type="text"
                  name="products"
                  value={newCartData.products}
                  onChange={handleAddChange}
                  placeholder='e.g. [{"id":1,"quantity":2}]'
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddSubmit}>
              Add Cart
            </Button>
          </Modal.Footer>
        </Modal>

 
        <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>User ID</Form.Label>
                <Form.Control
                  type="number"
                  name="userId"
                  value={updatedCartData.userId || ""}
                  onChange={handleUpdateChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Products (JSON)</Form.Label>
                <Form.Control
                  type="text"
                  name="products"
                  value={JSON.stringify(updatedCartData.products || [])}
                  onChange={handleUpdateChange}
                  placeholder='e.g. [{"id":1,"quantity":2}]'
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowUpdateModal(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleUpdateSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </DashboardLayout>
  );
}