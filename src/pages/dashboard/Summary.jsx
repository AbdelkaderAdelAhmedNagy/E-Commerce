import { Card, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getProducts } from "../../api/products";
import { getCarts } from "../../api/carts";
import { getUsers } from "../../api/users";

const Summary = () => {
  const [productsCount, setProductsCount] = useState(0);
  const [cartsCount, setCartsCount] = useState(0);
  const [usersCount, setUserCount] = useState(0);

  useEffect(() => {
    getProducts().then((res) => setProductsCount(res.data.products.length));
    getCarts().then((res) => setCartsCount(res.data.carts.length));
    getUsers().then((res) => setUserCount(res.data.total));
  }, []);

  return (
    <>
      <h2 className="mb-4">Dashboard Overview</h2>
      <Row>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>📦 Products</Card.Title>
              <h3>{productsCount}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>🛒 Carts</Card.Title>
              <h3>{cartsCount}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>👤 Users</Card.Title>
              <h3>{usersCount}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Summary;
