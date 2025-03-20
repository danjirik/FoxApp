// AppRoutes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Domu from "../components/home/HomePage";
import Products from "../components/products/ProductsList";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/domu" element={<Domu />} />
      <Route path="/produkty" element={<Products />} />
      {/* Default route */}
      <Route path="*" element={<Domu />} />
    </Routes>
  );
};

export default AppRoutes;
