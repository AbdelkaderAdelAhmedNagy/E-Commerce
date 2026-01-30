import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { addCart, updateCart } from "../../api/carts";

const CartForm = ({ cart }) => {
  const [userId, setUserId] = useState(cart?.userId || "");
  const [products, setProducts] = useState(
    cart?.products || [{ id: "", quantity: "" }],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      userId,
      products: products.map((p) => ({
        id: Number(p.id),
        quantity: Number(p.quantity),
      })),
    };

    if (cart) {
      await updateCart(cart.id, data);
      alert("Cart updated (mock)");
    } else {
      await addCart(data);
      alert("Cart added (mock)");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Control
        className="mb-2"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      {products.map((p, i) => (
        <div key={i} className="d-flex mb-2">
          <Form.Control
            placeholder="Product ID"
            value={p.id}
            onChange={(e) => {
              const copy = [...products];
              copy[i].id = e.target.value;
              setProducts(copy);
            }}
          />
          <Form.Control
            className="ms-2"
            placeholder="Qty"
            value={p.quantity}
            onChange={(e) => {
              const copy = [...products];
              copy[i].quantity = e.target.value;
              setProducts(copy);
            }}
          />
        </div>
      ))}

      <Button type="submit">{cart ? "Update" : "Add"} Cart</Button>
    </Form>
  );
};

export default CartForm;
