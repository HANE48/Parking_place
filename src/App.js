import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Parking_info from './Parking_info.json';
import SearchP from './user/components/SearchP.js';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<SearchP />} />
          <Route path='/manager' element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Login(){
  return(
    <div>
      <p>로그인 화면</p>
    </div>
  );

}


export default App;
