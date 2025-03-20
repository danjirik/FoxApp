import { addNewProduct, getAllProducts } from "../../hooks/ShopApi";

const sampleProducts = [
  { name: "Apple", price: 1.29, stockQuantity: 150 },
  { name: "Banana", price: 0.69, stockQuantity: 220 },
  { name: "Carrot", price: 0.89, stockQuantity: 180 },
  { name: "Broccoli", price: 2.49, stockQuantity: 90 },
  { name: "Strawberry", price: 3.99, stockQuantity: 60 },
  { name: "Spinach", price: 1.99, stockQuantity: 130 },
  { name: "Orange", price: 1.59, stockQuantity: 200 },
  { name: "Tomato", price: 2.19, stockQuantity: 140 },
  { name: "Cucumber", price: 1.79, stockQuantity: 160 },
  { name: "Potato", price: 0.99, stockQuantity: 300 },
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
