import { Button } from "react-bootstrap";

const Pagination = ({ skip, limit, setSkip }) => {
  return (
    <div className="d-flex justify-content-between mt-3">
      <Button disabled={skip === 0} onClick={() => setSkip(skip - limit)}>
        Prev
      </Button>

      <Button onClick={() => setSkip(skip + limit)}>Next</Button>
    </div>
  );
};

export default Pagination;
