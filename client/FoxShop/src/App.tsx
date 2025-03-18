// App.tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/headers/MainHeader';
import AppRoutes from './routes/AppRoutes';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <AppRoutes />
    </Router>
  );
};

export default App;
