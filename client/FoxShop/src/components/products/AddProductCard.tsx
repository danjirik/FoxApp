// AddProductCard.tsx
import React, { useState } from "react";
import { addNewProduct } from "../../hooks/ShopApi";

type EditableProduct = {
  name: string;
  price: number;
  stockQuantity: number;
};

interface AddProductCardProps {
  onProductAdded: () => void;
}

const AddProductCard: React.FC<AddProductCardProps> = ({ onProductAdded }) => {
  const [showForm, setShowForm] = useState(false);
  const [newProductForm, setNewProductForm] = useState<EditableProduct>({
    name: "",
    price: 0,
    stockQuantity: 0,
  });
  const [error, setError] = useState<string | null>(null);

  const handleAddProduct = async () => {
    try {
      await addNewProduct(newProductForm);
      setNewProductForm({ name: "", price: 0, stockQuantity: 0 });
      setShowForm(false);
      onProductAdded();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (!showForm) {
    return (
      <div className="card h-100 d-flex justify-content-center align-items-center">
        <div className="card-body text-center">
          <button
            className="btn btn-outline-primary rounded-circle"
            style={{
              width: "80px",
              height: "80px",
              fontSize: "2rem",
              lineHeight: "1",
            }}
            onClick={() => setShowForm(true)}
          >
            +
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card h-100">
      <div className="card-body">
        {error && <p style={{ color: "red" }}>{error}</p>}
        <h5 className="card-title">New Product</h5>
        <div className="mb-2">
          <label htmlFor="new-name">Name</label>
          <input
            id="new-name"
            type="text"
            className="form-control"
            placeholder="Product Name"
            value={newProductForm.name}
            onChange={(e) =>
              setNewProductForm({
                ...newProductForm,
                name: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-2">
          <label htmlFor="new-price">Price</label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input
              id="new-price"
              type="number"
              className="form-control"
              placeholder="0.00"
              value={newProductForm.price}
              onChange={(e) =>
                setNewProductForm({
                  ...newProductForm,
                  price: parseFloat(e.target.value),
                })
              }
            />
          </div>
        </div>
        <div className="mb-2">
          <label htmlFor="new-stock">Stock Quantity</label>
          <input
            id="new-stock"
            type="number"
            className="form-control"
            placeholder="0"
            value={newProductForm.stockQuantity}
            onChange={(e) =>
              setNewProductForm({
                ...newProductForm,
                stockQuantity: parseInt(e.target.value, 10),
              })
            }
          />
        </div>
        <button className="btn btn-success me-2" onClick={handleAddProduct}>
          Add Product
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setShowForm(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddProductCard;
