import React from 'react';
import { BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import SearchP from './user/components/SearchP.js';
import AdminLogin from './manager/AdminLogin.js';
import ManagerMain from './manager/manager_main.js';


function App() {
  return (
    <BrowserRouter>
      <Link to='/'>홈</Link>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link to='/manager/login'>관리자 로그인</Link>
      <Routes>
        <Route path="/*" element={<SearchP />} />
        <Route path="/manager/login/*" element={<AdminLogin />} />
        <Route path="/manager/:id/*" element={<ManagerMain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
