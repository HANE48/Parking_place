import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Parking_info from './Parking_info.json';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Link to='/'>유저창</Link>
        <br/>
        <Link to='/manager'>관리자창</Link>
        <Routes>
          <Route path='/' element={<div><p>검색</p></div>} />
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
