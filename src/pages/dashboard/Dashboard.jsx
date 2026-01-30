import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";
import Summary from "./Summary";
import { useState } from "react";

const Dashboard = () => {
  const [section, setSection] = useState("summary");

  const renderSection = () => {
    switch (section) {
      case "products":
        return <Products />;
      case "users":
        return <Users />;
      case "carts":
        return <Carts />;
      default:
        return <Summary />;
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={2} className="bg-dark min-vh-100 p-0">
          <Sidebar setSection={setSection} />
        </Col>
        <Col md={10} className="p-4 bg-light">
          {renderSection()}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
