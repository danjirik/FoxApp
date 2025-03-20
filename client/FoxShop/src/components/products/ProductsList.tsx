import React, { useState, useEffect } from "react";
import { getAllProducts, searchProducts, Product } from "../../hooks/ShopApi";
import ProductCard from "./ProductCard";
import AddProductCard from "./AddProductCard";
import { mockProducts } from "./mockProducts";
import ProductSearch, { ProductSearchFilters } from "./ProductSearch";
import { useSearchParams } from "react-router-dom";

const ProductList: React.FC = () => {
  const [searchParams] = useSearchParams();

  // Načtení počátečních filtrů z URL
  const initialFilters: ProductSearchFilters = {
    ...(searchParams.get("name") && {
      name: searchParams.get("name") as string,
    }),
    ...(searchParams.get("minStock") && {
      minStock: Number(searchParams.get("minStock")),
    }),
    ...(searchParams.get("maxStock") && {
      maxStock: Number(searchParams.get("maxStock")),
    }),
    ...(searchParams.get("includeInactive") === "true" && {
      includeInactive: true,
    }),
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ProductSearchFilters>(initialFilters);

  // Modified fetchProducts to accept filters
  const fetchProducts = async (appliedFilters: ProductSearchFilters = {}) => {
    setLoading(true);
    try {
      const data =
        Object.keys(appliedFilters).length > 0
          ? await searchProducts(appliedFilters)
          : await getAllProducts();
      setProducts(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial seeding and fetch with current filters
  useEffect(() => {
    const seedAndFetch = async () => {
      await mockProducts();
      await fetchProducts(filters);
    };
    seedAndFetch();
  }, []);

  // Save filters and fetch products with these filters
  const handleSearch = async (newFilters: ProductSearchFilters) => {
    setFilters(newFilters);
    await fetchProducts(newFilters);
  };

  // Use the current filters when re-fetching products after an update
  const handleProductUpdated = async () => {
    await fetchProducts(filters);
  };

  if (loading) return <p>Načítám produkty…</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  // Sort products by ID (lowest first)
  const sortedProducts = [...products].sort((a, b) => a.id - b.id);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Produkty</h1>
      <ProductSearch onSearch={handleSearch} />
      <div className="row">
        {sortedProducts.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <ProductCard
              product={product}
              onProductUpdated={handleProductUpdated}
            />
          </div>
        ))}
        <div className="col-md-4 mb-4">
          <AddProductCard onProductAdded={handleProductUpdated} />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
