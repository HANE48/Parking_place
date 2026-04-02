import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import User_main from './user/User_main.js';
import Manager_main from './manager/Manager_main.js';
import axios from 'axios';
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
          <Route path='/' element={<ParkingApp />} />
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

function ParkingApp() {
  const arr = Parking_info.DATA.map((item, index)=>{
    return(
      <li key={index} style={{border:'1px solid black' }}>
        주차장명: {item.pklt_nm}<br/>
        주차면 수: {item.tpkct}<br/>
        현재 주차 차량수: {item.now_prk_vhcl_cnt}
      </li>
    );
  })

  return (
    <div style={{ padding: '20px' }}>
      <input type='text' placeholder='주차장 검색 '/>
      <ul>
        {arr}
      </ul>
    </div>
    );
}

export default App;
