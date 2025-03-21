// AppRoutes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/home/HomePage";
import Products from "../components/products/ProductsList";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/domu" element={<Home />} />
      <Route path="/produkty" element={<Products />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
