export interface Product {
  id: number;
  name: string;
  price: number;
  stockQuantity: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:3000/products");
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  return res.json();
}

export async function addNewProduct(newProduct: {
  name: string;
  price: number;
  stockQuantity: number;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}): Promise<Product> {
  const payload = {
    name: newProduct.name,
    price: newProduct.price,
    stockQuantity: newProduct.stockQuantity, // API expects 'stockQuantity'
    isActive: newProduct.isActive,
  };

  const response = await fetch("http://localhost:3000/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();

  return {
    id: data.id,
    name: data.name,
    price: data.price,
    stockQuantity: data.stockQuantity,
    isActive: data.isActive,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}

export async function deactivateProduct(id: number): Promise<void> {
  const response = await fetch(`http://localhost:3000/products/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
}

export async function updateProduct(
  id: number,
  update: { name: string; price: number; stockQuantity: number }
): Promise<Product> {
  const response = await fetch(`http://localhost:3000/products/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(update),
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();

  return {
    id: data.id,
    name: data.name,
    price: data.price,
    stockQuantity: data.stockQuantity,
    isActive: data.isActive,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}

export async function searchProducts(filters: {
  name?: string;
  minStock?: number;
  maxStock?: number;
  includeInactive?: boolean;
}): Promise<Product[]> {
  const params = new URLSearchParams();
  if (filters.name) {
    params.append("name", filters.name);
  }
  if (filters.minStock !== undefined) {
    params.append("minStock", filters.minStock.toString());
  }
  if (filters.maxStock !== undefined) {
    params.append("maxStock", filters.maxStock.toString());
  }
  if (filters.includeInactive !== undefined) {
    params.append("includeInactive", filters.includeInactive.toString());
  }
  const res = await fetch(
    `http://localhost:3000/products?${params.toString()}`
  );
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  return res.json();
}
