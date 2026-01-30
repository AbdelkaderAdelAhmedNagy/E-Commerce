import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { addProduct } from "../../api/products";

export default function ProductForm({ onAdded }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    await addProduct({ title, price });
    onAdded();
    setTitle("");
    setPrice("");
  };
  return (
    <Form className="m-3" onSubmit={submit}>
      <Form.Control
        className="mb-2"
        placeholder="Product Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Form.Control
        className="mb-2"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <Button type="submit">Add Product</Button>
    </Form>
  );
}
