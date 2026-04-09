import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './manager_main.css';
import Sidebar from './Sidebar.js';
import ParkingTable from './ParkingTable.js';
import ParkingPriceTable from './ParkingPriceTable.js';
import ParkingData from './ParkingData';
import StatCards from './StatCards.js';
import ParkingHours from './ParkingHours.js';
import SearchP from '../user/components/SearchP.js';

function ManagerMain(props) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const pathParts = location.pathname.split('/');
  const currentView = pathParts[pathParts.length - 1] || 'dashboard';

  // id가 admin이 아닐경우 id에 맞는 데이터만 가져오도록 변경
  const data = id === 'admin' ? props.data : props.data.filter(item => item.pklt_cd === Number(id));


  // 주차장명칭 추출
  const myParkingName = (id !== 'admin' && data.length > 0)
    ? data[0].pklt_nm
    : "서울시 전체";

  // 제목 결정 로직
  let viewTitle = `${myParkingName} 통합 주차 관리`;

  if (currentView === 'dashboard') {
    viewTitle = { myParkingName } + '현황';
  } else if (currentView === 'list') {
    viewTitle = { myParkingName };
  } else if (currentView === 'price') {
    viewTitle = { myParkingName } + '요금 정책 관리';
  } else if (currentView === 'time') {
    viewTitle = { myParkingName } + '운영 시간 관리';
  } else if (currentView === 'admin') {
    viewTitle = id === 'admin' ? "시스템 통합 설정" : {myParkingName} + '관리자 정보';
  }

  const handleViewChange = (viewName) => {
    navigate("/manager/" + id + "/" + viewName);
  };

  //관리권한 문구
  let adminAuthority = "";
  if (id === 'admin') {
    adminAuthority = "서울시 전 구역";
  } else if (data.length > 0) {
    adminAuthority = data[0].pklt_nm; // 데이터가 있으면 그 주차장 주소
  } else {
    adminAuthority = "지정된 구역 없음";
  }
  return (
    <div className="manager-layout">
      <Sidebar currentView={currentView} setCurrentView={handleViewChange} data={data} />

      <main className="main-content">
        <header className="main-header">
          <h2>{viewTitle}</h2>
          <div className="mg-name">관리자({id})님 접속중</div>
        </header>

        <section className="view-area">
          {currentView === 'dashboard' && (
            <div className="content-box">
              <div className="admin-summary-bar">
                <h4>현재 관리 중인 서울시 주차장: {data.length}개</h4>
              </div>
              <ParkingTable data={data} setData={props.setData} />
            </div>
          )}

          {currentView === 'list' && (
            <div className="content-box">
              <StatCards data={data} setData={props.setData} />
            </div>
          )}


          {currentView === 'price' && (
            <div className="content-box">
              <ParkingPriceTable data={data} />
            </div>
          )}

          {currentView === 'time' && (
            <div className="content-box">
              <ParkingHours data={data} setData={props.setData} />
            </div>
          )}

          {currentView === 'admin' && (
            <div className="content-box">

              <h3>🔐 {id === 'admin' ? '총괄 관리자 설정' : '관리자 설정'}</h3>

              <div className="admin-setting-box">
                <p className="admin-info-text">
                  <strong>{id === 'admin' ? '총괄 관리자 ID:' : '관리자 ID:'}</strong> {id}
                </p>

                <p className="admin-info-text">

                  <strong>관리 권한:</strong> {adminAuthority}
                </p>

              </div>
            </div>
          )}

        </section>
      </main>
    </div>
  );
}

export default ManagerMain;
