import React from 'react';

function Sidebar(props) {

  const currentView = props.currentView;
  const setCurrentView = props.setCurrentView;

  return (
    <div className="sidebar">

      <div className="sidebar-logo">
        <h2>ADMIN</h2>
        <p>Parking System</p>
      </div>

      <nav className="sidebar-nav">
        <ul>
          
          <li 
            className={currentView === 'dashboard' ? 'nav-item active' : 'nav-item'}
            onClick={function() { setCurrentView('dashboard'); }}>
            <span className="nav-icon">📊</span>
            <span className="nav-label">대시보드</span>
          </li>

          <li 
            className={currentView === 'list' ? 'nav-item active' : 'nav-item'}
            onClick={function() { setCurrentView('list'); }}>
            <span className="nav-icon">🚗</span>
            <span className="nav-label">주차장 목록</span>
          </li>
          
          <li 
            className={currentView === 'price' ? 'nav-item active' : 'nav-item'}
            onClick={function() { setCurrentView('price'); }}>
            <span className="nav-icon">💳</span>
            <span className="nav-label">요금 관리</span>
          </li>
         
          <li 
            className={currentView === 'settings' ? 'nav-item active' : 'nav-item'}
            onClick={function() { setCurrentView('time'); }}>
            <span className="nav-icon">🕒</span>
            <span className="nav-label">운영시간</span>
          </li>
   
          <li 
            className={currentView === 'admin' ? 'nav-item active' : 'nav-item'}
            onClick={function() { setCurrentView('admin'); }}>
            <span className="nav-icon">👤</span>
            <span className="nav-label">관리자 정보</span>
          </li>
        </ul>
      </nav>


      <div className="sidebar-footer">
        <button className="logout-btn">로그아웃</button>
      </div>

    </div>
  );
}

export default Sidebar;