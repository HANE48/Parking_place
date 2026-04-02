import React, { useState } from 'react';
import './manager_main.css';
import Sidebar from './Sidebar'; 

function ManagerMain() {
 //초기값 일단 대시보드로 ++ 관리자 로그인 페이지 내일 만들기 
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <div className="manager-layout">

      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="main-content">
        <header className="main-header">
          <h2>🅿️ 주차 관리 시스템 (관리자)</h2>
          <div className="user-info">(관리자) 님 접속중</div>
        </header>

        <section className="view-area">
          
          {currentView === 'dashboard' && (
            <div className="content-box">
              <h3>📊 종합 대시보드</h3>
              <p>실시간 주차 현황자리</p>
              <div className="dummy-box"></div>
            </div>
          )}

          {currentView === 'list' && (
            <div className="content-box">
              <h3>🚗 주차장 목록</h3>
              <p>등록된 모든 주차장의 상세 정보를 표로 보여줄 자리</p>
              <div className="dummy-table">주차장 Table</div>
            </div>
          )}

          {currentView === 'price' && (
            <div className="content-box">
              <h3>💳 요금 관리</h3>
              <p>기본 요금 및 추가 요금 정책을 설정하는 화면</p>
            </div>
          )}

          {currentView === 'settings' && (
            <div className="content-box">
              <h3>⚙️ 시스템 설정</h3>
              <p>알림 설정 및 시스템 환경을 관리</p>
            </div>
          )}

          {currentView === 'admin' && (
            <div className="content-box">
              <h3>👤 관리자 정보</h3>
              <p>내 정보 수정 및 비밀번호 변경 화면</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default ManagerMain;