// AppRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Domu from '../components/home/HomePage';
import Produkty from '../components/products/Products';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/domu" element={<Domu />} />
      <Route path="/produkty" element={<Produkty />} />
      {/* Default route */}
      <Route path="*" element={<Domu />} />
    </Routes>
  );
};

export default AppRoutes;
