// ProductList.tsx
import React, { useState, useEffect } from "react";
import { getAllProducts, Product } from "../../hooks/ShopApi";
import ProductCard from "./ProductCard";
import AddProductCard from "./AddProductCard";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getAllProducts();
      setProducts(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p>Loading products…</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  // Clone and sort the products array by ID (lowest first)
  const sortedProducts = [...products].sort((a, b) => a.id - b.id);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Products</h1>
      <div className="row">
        {sortedProducts.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <ProductCard product={product} onProductUpdated={fetchProducts} />
          </div>
        ))}
        <div className="col-md-4 mb-4">
          <AddProductCard onProductAdded={fetchProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
