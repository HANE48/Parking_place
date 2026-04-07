import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './manager_main.css';
import Sidebar from './Sidebar.js';
import ParkingTable from './ParkingTable.js';
import ParkingPriceTable from './ParkingPriceTable.js';
import ParkingData from './ParkingData';
import StatCards from './StatCards.js';

function ManagerMain() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const pathParts = location.pathname.split('/');
  const currentView = pathParts[pathParts.length - 1] || 'dashboard';

  // id가 admin이 아닐경우 id에 맞는 데이터만 가져오도록 변경
  const [data, setData] = useState(() => {
    if (id === 'admin') {
      return ParkingData.DATA;
    } else {
      return ParkingData.DATA.filter((res, i) => res.pklt_cd === Number(id));
    }
  });

  // 주차장명칭 추출
  const myParkingName = (id !== 'admin' && data.length > 0)
  ? data[0].pklt_nm
  :"서울시 전체";

  // 제목 결정 로직
 let viewTitle = `${myParkingName} 통합 주차 관리`; 

  if (currentView === 'dashboard') {
    viewTitle = `${myParkingName} 현황`;
  } else if (currentView === 'list') {
    viewTitle = `${myParkingName}`;
  } else if (currentView === 'price') {
    viewTitle = `${myParkingName} 요금 정책 관리`;
  } else if (currentView === 'time') {
    viewTitle = `${myParkingName} 운영 시간 관리`;
  } else if (currentView === 'admin') {
    viewTitle = id === 'admin' ? "시스템 통합 설정" : `${myParkingName} 관리자 정보`;}

  const handleViewChange = (viewName) => {
    navigate("/manager/" + id + "/" + viewName);
  };

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
              <ParkingTable data={data} setData={setData} />
            </div>
          )}

          {currentView === 'list' && (
            <div className="content-box">
              {/* <h3>전체 주차장 리스트</h3>
              <p>서울시 내 모든 주차장의 위치와 만차 여부를 관리합니다.</p> */}
              <StatCards data={data} setData={setData} />
            </div>
          )}

          {currentView === 'price' && (
            <div className="content-box">
              <ParkingPriceTable data={data} />
            </div>
          )}

          {currentView === 'admin' && (
            <div className="content-box">
              <h3>🔐 총괄 관리자 설정</h3>
              <div className="admin-setting-box">
                <p className="admin-info-text"><strong>총괄 관리자 ID:</strong> {id}</p>
                <p className="admin-info-text"><strong>관리 권한:</strong> 서울시 전 구역</p>

                <hr className="admin-divider" />

                <h4>마스터 비밀번호 변경</h4>
                <div className="pw-change-form">
                  <input type="password" placeholder="현재 비밀번호" className="pw-input" id="oldPw" />
                  <input type="password" placeholder="새 비밀번호" className="pw-input" id="newPw" />
                  <input type="password" placeholder="새 비밀번호 확인" className="pw-input" id="checkPw" />

                  <button
                    className="pw-save-btn"
                    onClick={() => {
                      const newPw = document.getElementById('newPw').value;
                      const checkPw = document.getElementById('checkPw').value;
                      if (!newPw || !checkPw) alert("새 비밀번호를 입력해주세요.");
                      else if (newPw === checkPw) alert("마스터 비밀번호가 변경되었습니다.");
                      else alert("비밀번호가 일치하지 않습니다.");
                    }}
                  >
                    비밀번호 저장
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default ManagerMain;