import { useEffect, useState } from "react";
import { Container, Table, Form, Button } from "react-bootstrap";
import { getUsers, searchUsers,getUserById } from "../../api/users";
import DashboardLayout from "../layouts/DashboardLayout";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit] = useState(208);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");

  const loadUsers = async () => {
    try {
      const res = await getUsers(limit, skip);
      setUsers(res.data.users);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setUsers([]);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [skip]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!search.trim()) {
      loadUsers();
      return;
    }

    try {
      if (!isNaN(search)) {
        const res = await getUserById(search);
        setUsers([res.data]); 
        setTotal(1);
      }
      else {
        const res = await searchUsers(search);
        setUsers(res.data.users);
        setTotal(res.data.total);
      }
    } catch (err) {
      console.error("Search failed:", err);
      setUsers([]);
      setTotal(0);
    }
  };
  return (
    <DashboardLayout>
      <Container>
        <h2 className="my-3">Users</h2>

        <Form className="d-flex mb-3" onSubmit={handleSearch}>
          <Form.Control
            type="text"
            placeholder="Search users... (ID,Full Name,Email,and Username)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button type="submit" className="ms-2">
            Search
          </Button>
        </Form>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>
                  {u.firstName} {u.lastName}
                </td>
                <td>{u.email}</td>
                <td>{u.username}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </DashboardLayout>
  );
}
