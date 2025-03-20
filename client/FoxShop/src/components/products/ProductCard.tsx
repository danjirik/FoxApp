import React, { useState } from "react";
import { updateProduct, deactivateProduct, Product } from "../../hooks/ShopApi";

type EditableProduct = {
  name: string;
  price: number;
  stockQuantity: number;
};

interface ProductCardProps {
  product: Product;
  onProductUpdated: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onProductUpdated,
}) => {
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState<EditableProduct>({
    name: product.name,
    price: product.price,
    stockQuantity: product.stockQuantity,
  });
  const [error, setError] = useState<string | null>(null);

  const handleEdit = () => setEditing(true);

  const handleCancel = () => {
    setEditing(false);
    setEditForm({
      name: product.name,
      price: product.price,
      stockQuantity: product.stockQuantity,
    });
  };

  const handleSave = async () => {
    try {
      await updateProduct(product.id, editForm);
      setEditing(false);
      onProductUpdated();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deactivateProduct(product.id);
      onProductUpdated();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="card h-100 position-relative p-3">
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Buttons in top-right corner */}
      <div className="position-absolute top-0 end-0 m-2">
        {!editing && (
          <>
            <button
              className="btn btn-sm btn-danger me-1"
              onClick={handleDelete}
            >
              X
            </button>
            <button className="btn btn-sm btn-primary" onClick={handleEdit}>
              Edit
            </button>
          </>
        )}
      </div>

      {/* Name Field - Full Width */}
      <div className="mb-2">
        <label htmlFor={`name-${product.id}`}>Název</label>
        {editing ? (
          <input
            id={`name-${product.id}`}
            type="text"
            className="form-control"
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
          />
        ) : (
          <h5 className="card-title">{product.name}</h5>
        )}
      </div>

      {/* Price Field */}
      <div className="mb-2">
        <label htmlFor={`price-${product.id}`}>Cena</label>
        {editing ? (
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input
              id={`price-${product.id}`}
              type="number"
              className="form-control"
              value={editForm.price}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  price: parseFloat(e.target.value),
                })
              }
            />
          </div>
        ) : (
          <h6 className="card-subtitle text-muted">
            ${product.price.toFixed(2)}
          </h6>
        )}
      </div>

      {/* Stock Quantity Field */}
      <div className="mb-2">
        <label htmlFor={`stock-${product.id}`}>Zásoby</label>
        {editing ? (
          <input
            id={`stock-${product.id}`}
            type="number"
            className="form-control"
            value={editForm.stockQuantity}
            onChange={(e) =>
              setEditForm({
                ...editForm,
                stockQuantity: parseInt(e.target.value, 10),
              })
            }
          />
        ) : (
          <p className="card-text">
            {product.stockQuantity} ve skladě{" "}
            {!product.isActive && <span>(neaktivní)</span>}
          </p>
        )}
      </div>

      {/* Save & Cancel Buttons */}
      {editing && (
        <div>
          <button className="btn btn-success me-2" onClick={handleSave}>
            Uložit změny
          </button>
          <button className="btn btn-secondary" onClick={handleCancel}>
            Zrušit
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
