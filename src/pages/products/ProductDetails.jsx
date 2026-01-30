import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProduct, deleteProduct } from "../../api/products";
import { Button } from "react-bootstrap";

const ProductDetails = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct(id).then((res) => setProduct(res.data));
  }, [id]);
const handleAddToCart = () => {
  setCart((prev) => {
    const existing = prev.find((item) => item.id === product.id);

    if (existing && existing.quantity >= product.stock) {
      alert("Stock limit reached!");
      return prev;
    }

    if (existing) {
      return prev.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    }

    return [...prev, { ...product, quantity: 1 }];
  });
};

  if (!product) return <p>Loading...</p>;

  return (
  <div className="container mt-4">
    <img src={product.thumbnail} alt={product.title} />
    <h2>{product.title}</h2>
    <p>{product.description}</p>
    <p><strong>Price:</strong> ${product.price}</p>
    <p><strong>Rating:</strong> {product.rating}</p>
    <p><strong>Stock:</strong> {product.stock}</p>

    <div className="d-flex gap-3 mt-3">
      <Button
        variant="success"
        onClick={handleAddToCart}
        disabled={product.stock === 0}
      >
        Add to Cart
      </Button>
      <Button
        variant="secondary"
        onClick={() => navigate(-1)}
      >
        Go Back
      </Button>
    </div>
  </div>
);
};

export default ProductDetails;
