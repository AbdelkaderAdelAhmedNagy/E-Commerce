import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getUser } from "../../api/users";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser(id).then((res) => setUser(res.data));
  }, [id]);

  return (
    <Container className="mt-4">
      <h4>
        {user.firstName} {user.lastName}
      </h4>
      <p>Email: {user.email}</p>
    </Container>
  );
};

export default UserDetails;
