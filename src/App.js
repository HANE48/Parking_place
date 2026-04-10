import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import SearchP from './user/components/SearchP.js';
import AdminLogin from './manager/AdminLogin.js';
import ManagerMain from './manager/manager_main.js';
import './App.css';
import { useState } from 'react';
import Parking_info from './Parking_info.json';

function App() {

  const [data, setData] = useState(()=>{
    const saved = localStorage.getItem('ParkingData');
    //JSON.parse(saved) --> saved를 JSON형태로 변환
    return saved ? JSON.parse(saved) : Parking_info.DATA;
  });

  useEffect(() => {
    localStorage.setItem('ParkingData', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const handleStroageChange = (e)=>{
      if(e.key === 'ParkingData'){
        setData(JSON.parse(e.newValue));
      }
    }
    // 브라우저의 storage 이벤트 리스너 등록
    window.addEventListener('storage', handleStroageChange);
    return () => window.removeEventListener('storage', handleStroageChange);
  }, []);

  return (
    <BrowserRouter>
      <header>
        <Link to='/'>홈</Link>
        <Link to='/manager/login'>관리자 로그인</Link>
      </header>
      <Routes>
        <Route path="/*" element={<SearchP data={data} />} />
        <Route path="/manager/login/*" element={<AdminLogin data={data}/>} />
        <Route path="/manager/:id/*" element={<ManagerMain data={data} setData={setData} />} />
      </Routes>
    </BrowserRouter>
  );//return
}//app


export default App;
