import React, { useState } from 'react';
import './manager_main.css';
import Sidebar from './Sidebar.js'; 
import ParkingTable from './ParkingTable.js';
import ParkingPriceTable from './ParkingPriceTable.js';
import ParkingData from './ParkingData';

// 관리자창 --> 로그인 기능과 로그인시 관리시스템으로 넘어가게변경

function ManagerMain() {
  // id는 로그인 기능 구현 후 파라미터로 받는것으로 변경
  const id = 171730;
  const [currentView, setCurrentView] = useState('dashboard');
  const [data, setData] = useState(ParkingData.DATA.filter
          (parking => parking.pklt_cd === id)
      );
  return (
    <div className="manager-layout">
              
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} data={data} />
      
      <main className="main-content">

        <header className="main-header">
          <h2>🅿️ 주차 관리 시스템 <br/>{data[0].pklt_nm}</h2>
          <div className="mg-name">{data[0].pklt_nm} 님 접속중</div>
        </header>

        <section className="view-area">
          
         
          {currentView === 'dashboard' && (
            <div className="content-box">
              <ParkingTable data={data} setData={setData}/>
              {/* <h3>종합 대시보드</h3>
              <p>실시간 주차 현황자리</p> */}
            </div>
          )}
          {currentView === 'list' && (
            <div className="content-box">
              <h3>주차장 목록</h3>
              <p>주차장이름, 현재주차현황, 위치를 중심으로 리스트 만들고 
                만차인곳은 빨간색?으로 표시하는 로직 만들면 좋을 것 같음
              </p>
            </div>
          )}
          {currentView === 'price' && (
            <div className="content-box">
              {/* <h3>요금 관리</h3>
              <p>기본요금, 추가요금, 유료/무료, 월정기권, 관리</p> */}
              <ParkingPriceTable data = {data} />
              {/* 요금관리 전체DATA -> data */}
            </div>
          )}
          {currentView === 'time' && (
            <div className="content-box">
              <h3>운영 시간</h3>
              <p>각 주차장이 언제 문을 열고 닫는지 확인하는 곳
                운영시간(평일/주말/공휴일)데이터 활용(24시간운영인지 아닌지 필터링해서 보여주면 좋을듯)
              </p>
            </div>
          )}
          {currentView === 'admin' && (
            <div className="content-box">
              <h3>관리자 정보</h3>
              <p>내 정보 수정 및 비밀번호 변경 화면</p>
            </div>
          )}
        </section>

      </main>

    </div>
  );
}

export default ManagerMain;