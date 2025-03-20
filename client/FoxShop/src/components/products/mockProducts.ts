import { addNewProduct, getAllProducts } from "../../hooks/ShopApi";

const sampleProducts = [
  { name: "Jablka", price: 1.29, stockQuantity: 150 },
  { name: "Banány", price: 0.69, stockQuantity: 220 },
  { name: "Mrkve", price: 0.89, stockQuantity: 180 },
  { name: "Brokolice", price: 2.49, stockQuantity: 90 },
  { name: "Jahody", price: 3.99, stockQuantity: 60 },
  { name: "Špenát", price: 1.99, stockQuantity: 130 },
  { name: "Pomeranče", price: 1.59, stockQuantity: 200 },
  { name: "Rajčata", price: 2.19, stockQuantity: 140 },
  { name: "Okurky", price: 1.79, stockQuantity: 160 },
  { name: "Brambory", price: 0.99, stockQuantity: 300 },
];

export const mockProducts = async () => {
  try {
    // Check if there are already products present
    const existingProducts = await getAllProducts();
    if (existingProducts && existingProducts.length > 0) {
      console.log("Products already seeded. Skipping seeding.");
      return;
    }

    // Seed the products only if the product list is empty
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
