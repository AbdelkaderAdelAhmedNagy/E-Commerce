import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCart } from "../../api/carts";
import { Card, Table } from "react-bootstrap";

const CartDetails = () => {
  const { id } = useParams();
  const [cart, setCart] = useState(null);

  useEffect(() => {
    getCart(id).then((res) => setCart(res.data));
  }, [id]);

  if (!cart) return <p>Loading...</p>;

  return (
    <Card className="m-4">
      <Card.Body>
        <Card.Title>Cart #{cart.id}</Card.Title>

        <p>
          <strong>User ID:</strong> {cart.userId}
        </p>
        <p>
          <strong>Total:</strong> ${cart.total}
        </p>
        <p>
          <strong>Total Items:</strong> {cart.totalQuantity}
        </p>

        <Table striped bordered>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cart.products.map((p) => (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>${p.price}</td>
                <td>{p.quantity}</td>
                <td>${p.total}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => decreaseQty(product.id)}
          >
            −
          </Button>

          <span>{quantities[product.id] || 1}</span>

          <Button
            size="sm"
            variant="secondary"
            onClick={() => increaseQty(product.id)}
          >
            +
          </Button>
        </div>

        <Button
          variant="success"
          size="sm"
          className="w-100"
          onClick={() => handleAddToCart(product.id)}
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CartDetails;
