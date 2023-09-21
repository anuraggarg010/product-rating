import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import ProductList from './components/productList';
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}
export default App;


// {"username":"jksdds","password":"jknds"}
