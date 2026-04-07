import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import SearchP from './user/components/SearchP.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<SearchP />} />
        <Route path="/manager/login" element={<AdminLogin />} />
      
        <Route path="/manager/:id/*" element={<ManagerMain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
