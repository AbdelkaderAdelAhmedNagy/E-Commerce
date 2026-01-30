import { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import api from "../../api/axios";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.username || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }
    setSuccess("Registration successful! You can now login.");
    setForm({ username: "", email: "", password: "" });
  };
  return (
    <Container className="mt-5 text-center" style={{ maxWidth: 400 }}>
      <h2>Register</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit} className="">
        <Form.Control
          className="mb-3"
          placeholder="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
        <Form.Control
          className="mb-3"
          placeholder="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
        <Form.Control
          className="mb-3"
          placeholder="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <Button type="submit" className="w-100">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
