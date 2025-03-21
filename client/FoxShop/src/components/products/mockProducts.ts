import { addNewProduct, getAllProducts } from "../../hooks/ShopApi";

const sampleProducts = [
  { name: "Jablka", price: 25, stockQuantity: 150 },
  { name: "Banány", price: 20, stockQuantity: 220 },
  { name: "Mrkve", price: 12, stockQuantity: 180 },
  { name: "Brokolice", price: 50, stockQuantity: 90 },
  { name: "Jahody", price: 99, stockQuantity: 60 },
  { name: "Špenát", price: 35, stockQuantity: 130, isActive: false },
  { name: "Pomeranče", price: 66, stockQuantity: 200, isActive: false },
  { name: "Rajčata", price: 48, stockQuantity: 140 },
  { name: "Okurky", price: 21, stockQuantity: 160 },
  { name: "Brambory", price: 6, stockQuantity: 300 },
];

export const mockProducts = async () => {
  try {
    // Check if there are already products present
    const existingProducts = await getAllProducts();
    if (existingProducts && existingProducts.length > 0) {
      console.log("Products already seeded. Skipping seeding.");
      return;
    }

    // Add the products only if the product list is empty
    for (const product of sampleProducts) {
      try {
        await addNewProduct(product);
        console.log(`Added ${product.name}`);
      } catch (error) {
        console.error(`Error adding ${product.name}:`, error);
      }
    }
  } catch (err: any) {
    console.error("Error during seeding:", err);
  }
};
