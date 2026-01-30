import { useEffect, useState } from "react";
import {
  sortProducts,
  getProducts,
  deleteProduct,
  addProduct,
  searchProducts,
  updateProduct,
} from "../../api/products";
import { Table, Button, Alert,Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../../api/axios";
import axios from "axios";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const [allProducts, setAllProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [search, setSearch] = useState("");


  const handleUpdate = async (id) => {
    const newTitle = prompt("Enter new title for the product:");
    if (!newTitle) return;

    try {
      const oldProduct = products.find((p) => p.id === id);
      const updatedProduct = await updateProduct(id, { title: newTitle });

      setProducts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...oldProduct, ...updatedProduct } : p,
        ),
      );
      setAllProducts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...oldProduct, ...updatedProduct } : p,
        ),
      );

      alert("Product updated successfully!");
    } catch (error) {
      alert("Failed to update product. See console for details.");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts();
      setAllProducts(res.data.products);
      setProducts(res.data.products);
    };
    fetchProducts();
  }, []);
  const applyFilters = (categoryValue, sortValue) => {
    let updated = [...allProducts];

    if (categoryValue) {
      updated = updated.filter((p) => p.category === categoryValue);
    }
    if (sortValue) {
      updated.sort((a, b) => {
        switch (sortValue) {
          case "az":
            return a.title.localeCompare(b.title);
          case "za":
            return b.title.localeCompare(a.title);
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "rating-asc":
            return a.rating - b.rating;
          case "rating-desc":
            return b.rating - a.rating;
          default:
            return 0;
        }
      });
    }

    setProducts(updated);
    setCurrentPage(1);
  };

  async function handleDelete(id) {
    await deleteProduct(id);
    setProducts(products.filter((product) => product.id !== id));
  }
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!search.trim()) {
      setProducts(allProducts);
      setCurrentPage(1);
      return;
    }

    try {
      const res = await searchProducts(search);
      setProducts(res.data.products || []);
      setCurrentPage(1);
    } catch (err) {
      console.error("Product search failed:", err);
      setProducts([]);
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <DashboardLayout>
      <>
        <div>
          <div className="form-group d-flex align-items-center mb-4">
            <label htmlFor="sortBy" className="form-label me-2 mb-0 p-4">
              Sort By:
            </label>
            <select
              className="form-select w-auto"
              value={sortBy}
              onChange={(e) => {
                const value = e.target.value;
                setSortBy(value);
                applyFilters(category, value);
              }}
            >
              <option value="">-- Select --</option>
              <option value="az">A–Z</option>
              <option value="za">Z–A</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating-asc">Rating: Low → High</option>
              <option value="rating-desc">Rating: High → Low</option>
            </select>
            <label
              htmlFor="filterByCategory"
              className="form-label me-2 mb-0 p-4 ms-auto"
              style={{ marginLeft: "auto" }}
            >
              Filter By Category:
            </label>

            <div className="form-label me-2 mb-0">
              <select
                className="form-select w-auto"
                value={category}
                onChange={(e) => {
                  const value = e.target.value;
                  setCategory(value);
                  applyFilters(value, sortBy);
                }}
              >
                <option value="">-- All Categories --</option>
                <option value="beauty">Beauty</option>
                <option value="fragrances">Fragrances</option>
                <option value="furniture">Furniture</option>
                <option value="groceries">Groceries</option>
                <option value="home-decoration">Home Decoration</option>
                <option value="kitchen-accessories">Kitchen Accessories</option>
                <option value="laptops">Laptops</option>
                <option value="mens-shirts">Mens Shirts</option>
                <option value="mens-shoes">Mens Shoes</option>
                <option value="mobile-accessories">Mobile Accessories</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="skin-care">Skin Care</option>
                <option value="smartphones">Smartphones</option>
                <option value="sports-accessories">Sports Accessories</option>
                <option value="sunglasses">Sunglasses</option>
                <option value="tablets">Tablets</option>
                <option value="tops">Tops</option>
                <option value="vehicle">Vehicle</option>
                <option value="womens-bags">Womens Bags</option>
                <option value="womens-dresses">Womens Dresses</option>
                <option value="womens-jewellery">Womens Jewelery</option>
                <option value="womens-shoes">Womens Shoes</option>
                <option value="womens-watches">Women Watches</option>
              </select>
            </div>
          </div>
          <Form className="d-flex mb-4 px-4" onSubmit={handleSearch}>
            <Form.Control
              type="text"
              placeholder="Search products by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button type="submit" className="ms-2">
              Search
            </Button>

            {search && (
              <Button
                variant="secondary"
                className="ms-2"
                onClick={() => {
                  setSearch("");
                  setProducts(allProducts);
                  setCurrentPage(1);
                }}
              >
                Reset
              </Button>
            )}
          </Form>

          <div className="mb-3 p-5 d-flex flex-wrap">
            {currentProducts.map((product) => (
              <div key={product.id} className=" card p-2 m-2 mb-2">
                <img src={product.thumbnail} alt={product.title} width="400" />
                <h3>{product.title}</h3>
                <p>Price: 💲{product.price}</p>
                <p>Rating:⭐ {product.rating}</p>
                <p>In stock:📦 {product.stock}</p>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(product.id)}
                  className="m-3 "
                >
                  Delete
                </Button>
                <Button
                  variant="warning"
                  onClick={() => handleUpdate(product.id)}
                  className="m-3"
                >
                  Update
                </Button>

                <Button
                  variant="success"
                  onClick={() => addProduct(product.id)}
                  disabled={product.stock === 0}
                  className="m-3"
                >
                  Add to Cart
                </Button>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/products/${product.id}`)}
                  className="m-3"
                >
                  Show More
                </Button>
              </div>
            ))}
          </div>
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center mb-4">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <li
                    key={page}
                    className={`page-item ${currentPage === page ? "active" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  </li>
                ),
              )}
            </ul>
          </nav>
        </div>
      </>
    </DashboardLayout>
  );
};
export default Products;
