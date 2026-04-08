import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import SearchP from './user/components/SearchP.js';
import AdminLogin from './manager/AdminLogin.js';
import ManagerMain from './manager/manager_main.js';
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <header>
        <Link to='/'>홈</Link>
        <Link to='/manager/login'>관리자 로그인</Link>
      </header>
      <Routes>
        <Route path="/*" element={<SearchP />} />
        <Route path="/manager/login/*" element={<AdminLogin />} />
        <Route path="/manager/:id/*" element={<ManagerMain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
