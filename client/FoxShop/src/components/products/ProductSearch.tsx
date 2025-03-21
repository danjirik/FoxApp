import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

export interface ProductSearchFilters {
  name?: string;
  minStock?: number;
  maxStock?: number;
  includeInactive?: boolean;
}

interface ProductSearchProps {
  onSearch: (filters: ProductSearchFilters) => void;
}

const ProductFilters: React.FC<ProductSearchProps> = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize state from query parameters
  const [name, setName] = useState(searchParams.get("name") || "");
  const [minStock, setMinStock] = useState(searchParams.get("minStock") || "");
  const [maxStock, setMaxStock] = useState(searchParams.get("maxStock") || "");
  const [includeInactive, setIncludeInactive] = useState(
    searchParams.get("includeInactive") === "true"
  );

  const buildFilters = (): ProductSearchFilters => ({
    ...(name && { name }),
    ...(minStock && { minStock: Number(minStock) }),
    ...(maxStock && { maxStock: Number(maxStock) }),
    ...(includeInactive && { includeInactive: true }),
  });

  const buildParams = (): Record<string, string> => {
    const params: Record<string, string> = {};
    if (name) params.name = name;
    if (minStock) params.minStock = minStock;
    if (maxStock) params.maxStock = maxStock;
    if (includeInactive) params.includeInactive = "true";
    return params;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filters = buildFilters();
    onSearch(filters);
    setSearchParams(buildParams());
  };

  const handleReset = () => {
    setName("");
    setMinStock("");
    setMaxStock("");
    setIncludeInactive(false);
    onSearch({});
    setSearchParams({});
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5 className="mb-0">Filtry</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSearch}>
          <div className="row align-items-end">
            <div className="col-md-3 mb-3">
              <label htmlFor="filter-name" className="form-label">
                Název produktu:
              </label>
              <input
                id="filter-name"
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Filtrování pomocí názvu produktu"
              />
            </div>
            <div className="col-md-2 mb-3">
              <label htmlFor="minStock" className="form-label">
                Minimální počet ve skladu:
              </label>
              <input
                id="minStock"
                type="number"
                className="form-control"
                value={minStock}
                onChange={(e) => setMinStock(e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="col-md-2 mb-3">
              <label htmlFor="maxStock" className="form-label">
                Maximální počet ve skladu:
              </label>
              <input
                id="maxStock"
                type="number"
                className="form-control"
                value={maxStock}
                onChange={(e) => setMaxStock(e.target.value)}
                placeholder="1000"
              />
            </div>
            <div className="col-md-2 mb-3">
              <div className="form-check mt-4">
                <input
                  id="includeInactive"
                  type="checkbox"
                  className="form-check-input"
                  checked={includeInactive}
                  onChange={(e) => setIncludeInactive(e.target.checked)}
                />
                <label htmlFor="includeInactive" className="form-check-label">
                  Zahrnout neaktivní
                </label>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="d-flex">
                <button type="submit" className="btn btn-primary me-2">
                  Použít filtry
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleReset}
                >
                  Vymazat filtry
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFilters;
