import { useState } from "react";
import { getCartsByUser } from "../../api/carts";
import { Form, Button, Table } from "react-bootstrap";

const UserCarts = () => {
  const [userId, setUserId] = useState("");
  const [carts, setCarts] = useState([]);

  const fetchCarts = async () => {
    const res = await getCartsByUser(userId);
    setCarts(res.data.carts);
  };

  return (
    <div className="p-4">
      <h2>Carts by User</h2>

      <Form className="d-flex mb-3">
        <Form.Control
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <Button className="ms-2" onClick={fetchCarts}>
          Fetch
        </Button>
      </Form>

      <Table striped bordered>
        <thead>
          <tr>
            <th>Cart ID</th>
            <th>Total</th>
            <th>Total Items</th>
          </tr>
        </thead>
        <tbody>
          {carts.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>${c.total}</td>
              <td>{c.totalQuantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserCarts;
