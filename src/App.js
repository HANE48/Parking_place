import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ManagerMain from './manager/manager_main';
import AdminLogin from './manager/AdminLogin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/manager/login" element={<AdminLogin />} />
      
        <Route path="/manager/:id/*" element={<ManagerMain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;