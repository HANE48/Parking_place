import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import User_main from './user/User_main.js';
import Manager_main from './manager/Manager_main.js';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <ParkingApp /> */}
        <Link to='/user'>유저창</Link>
        <Link to='/manager'>관리자창</Link>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/user' element={<User_main />} />
          <Route path='/manager' element={<Manager_main />} />
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
  const [parkingData, setParkingData] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = process.env.REACT_APP_SEOUL_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const url = `http://openapi.seoul.go.kr:8088/${API_KEY}/json/GetParkingInfo/1/1000/`;
        
        const response = await axios.get(url);
        
        
        if (response.data.GetParkingInfo) {
          setParkingData(response.data.GetParkingInfo.row);
        }
        setLoading(false);
      } catch (error) {
        console.error("데이터 로드 중 에러 발생!", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [API_KEY]);

  if (loading) return <div>데이터를 불러오는 중입니다...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>서울시 실시간 주차 현황</h1>
      <div style={{ display: 'grid', gap: '10px' }}>
        {parkingData.map((item, index) => {
          // 주차 가능 대수 계산 (전체 - 현재주차)
          const available = Number(item.TPKCT) - Number(item.NOW_PRK_VHCL_CNT);
          
          return (
            <div key={index} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
              <h3>{item.PKLT_NM}</h3>
              <p>주소: {item.ADDR}</p>
              <p style={{ fontWeight: 'bold' }}>
                주차 가능 현황: 
                <span style={{ color: available > 0 ? 'blue' : 'red', marginLeft: '5px' }}>
                  {available > 0 ? `${available}대 가능` : '만차'}
                </span>
              </p>
              <small>(전체 {item.TPKCT}면 / 현재 {item.NOW_PRK_VHCL_CNT}대 주차 중)</small>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
