import React from 'react';
import { Link } from 'react-router-dom';
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
          {/* 이 부분은 대시보드 처럼 링크 달아서 링크 넘어가게 */}
          <li
            className={currentView === 'dashboard' ? 'nav-item active' : 'nav-item'}
            onClick={function () { setCurrentView('dashboard'); }}>
            <Link to="/manager/:id/dashboard">
              <span className="nav-icon">📊</span>
              <span className="nav-label">대시보드</span>
            </Link>
          </li>

          <li
            className={currentView === 'list' ? 'nav-item active' : 'nav-item'}
            onClick={function () { setCurrentView('list'); }}>
            <Link to='/manager/:id/list'>
              <span className="nav-icon">🚗</span>
              <span className="nav-label">주차장 목록</span>
            </Link>
          </li>

          <li
            className={currentView === 'price' ? 'nav-item active' : 'nav-item'}
            onClick={function () { setCurrentView('price'); }}>
            <Link to='/manager/:id/price'>
              <span className="nav-icon">💳</span>
              <span className="nav-label">요금 관리</span>
            </Link>
          </li>

          <li
            className={currentView === 'settings' ? 'nav-item active' : 'nav-item'}
            onClick={function () { setCurrentView('time'); }}>
            <Link to='/manager/:id/time'>
              <span className="nav-icon">🕒</span>
              <span className="nav-label">운영시간</span>
            </Link>
          </li>

          <li
            className={currentView === 'admin' ? 'nav-item active' : 'nav-item'}
            onClick={function () { setCurrentView('admin'); }}>
            <Link to='/manager/:id/admin'>
              <span className="nav-icon">👤</span>
              <span className="nav-label">관리자 정보</span>
            </Link>
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