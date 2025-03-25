// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Navbar from './Navbar';
import NewPage from './NewPage';
import Register from './Register';
import Login from './Login';  // 引入 Login 頁面
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/new-page" element={<NewPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />  {/* 加入 Login 路由 */}
    </Routes>
  </Router>
);

reportWebVitals();
