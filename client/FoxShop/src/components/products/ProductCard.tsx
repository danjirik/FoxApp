import React, { useState } from "react";
import { updateProduct, deactivateProduct, Product } from "../../hooks/ShopApi";

type EditableProduct = {
  name: string;
  price: number;
  stockQuantity: number;
  isActive: boolean;
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
    isActive: product.isActive,
  });
  const [error, setError] = useState<string | null>(null);

  const handleEdit = () => setEditing(true);

  const handleCancel = () => {
    setEditing(false);
    setEditForm({
      name: product.name,
      price: product.price,
      stockQuantity: product.stockQuantity,
      isActive: product.isActive,
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

      {/* Tlačítka v pravém horním rohu */}
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
              Upravit
            </button>
          </>
        )}
      </div>

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

      <div className="mb-2">
        <label htmlFor={`price-${product.id}`}>Cena</label>
        {editing ? (
          <div className="input-group">
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
            <span className="input-group-text">Kč</span>
          </div>
        ) : (
          <h6 className="card-subtitle text-muted">
            {product.price.toFixed(2)} Kč
          </h6>
        )}
      </div>

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
            {product.stockQuantity} ve skladě {!product.isActive}
          </p>
        )}
      </div>

      {editing && (
        <div className="mb-2 form-check">
          <input
            id={`active-${product.id}`}
            type="checkbox"
            className="form-check-input"
            checked={editForm.isActive}
            onChange={(e) =>
              setEditForm({ ...editForm, isActive: e.target.checked })
            }
          />
          <label className="form-check-label" htmlFor={`active-${product.id}`}>
            Aktivní
          </label>
        </div>
      )}
      {!editing && !product.isActive && (
        <div className="mb-2">
          <span className="badge bg-secondary">Neaktivní</span>
        </div>
      )}

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
