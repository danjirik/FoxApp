import React, { useState } from "react";
import { addNewProduct } from "../../hooks/ShopApi";

type EditableProduct = {
  name: string;
  price: number;
  stockQuantity: number;
  isActive: boolean;
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
    isActive: true,
  });
  const [error, setError] = useState<string | null>(null);

  const validateProduct = (product: EditableProduct): string | null => {
    if (!product.name.trim()) return "Název produktu je povinný.";
    if (product.price < 0) return "Cena nemůže být záporná.";
    if (product.stockQuantity < 0) return "Zásoby nemohou být záporné.";
    if (product.price === 0) return "Cena nemůže být nula.";
    return null;
  };

  const handleAddProduct = async () => {
    const validationError = validateProduct(newProductForm);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await addNewProduct(newProductForm);
      setNewProductForm({
        name: "",
        price: 0,
        stockQuantity: 0,
        isActive: true,
      });
      setShowForm(false);
      setError(null);
      onProductAdded();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (!showForm) {
    return (
      <div className="card h-100">
        <div className="card-body d-flex justify-content-center align-items-center">
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
        <h5 className="card-title">Nový produkt</h5>
        <div className="mb-2">
          <label htmlFor="new-name">Název</label>
          <input
            id="new-name"
            type="text"
            className="form-control"
            placeholder="Product Name"
            value={newProductForm.name}
            onChange={(e) => {
              setNewProductForm({
                ...newProductForm,
                name: e.target.value,
              });
              setError(null);
            }}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="new-price">Cena</label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input
              id="new-price"
              type="number"
              className="form-control"
              placeholder="0.00"
              value={newProductForm.price}
              onChange={(e) => {
                setNewProductForm({
                  ...newProductForm,
                  price: parseFloat(e.target.value),
                });
                setError(null);
              }}
            />
          </div>
        </div>
        <div className="mb-2">
          <label htmlFor="new-stock">Zásoby</label>
          <input
            id="new-stock"
            type="number"
            className="form-control"
            placeholder="0"
            value={newProductForm.stockQuantity}
            onChange={(e) => {
              setNewProductForm({
                ...newProductForm,
                stockQuantity: parseInt(e.target.value, 10),
              });
              setError(null);
            }}
          />
        </div>

        <div className="mb-2 form-check">
          <input
            id="new-active"
            type="checkbox"
            className="form-check-input"
            checked={newProductForm.isActive}
            onChange={(e) =>
              setNewProductForm({
                ...newProductForm,
                isActive: e.target.checked,
              })
            }
          />
          <label className="form-check-label" htmlFor="new-active">
            Aktivní
          </label>
        </div>
        <button className="btn btn-success me-2" onClick={handleAddProduct}>
          Přidej produkt
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
