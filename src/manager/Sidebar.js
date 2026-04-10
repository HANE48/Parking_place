import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

function Sidebar(props) {
  const { id } = useParams();
  const navigate = useNavigate(); //페이지 강제이동을 위한 navigate함수 선언
  // 부모 컴포넌트로 부터 화면전환 기능 물려받음
  const currentView = props.currentView;
  const setCurrentView = props.setCurrentView;

  // 로그아웃 처리 함수
  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      // 1. 필요한 경우 세션이나 로컬스토리지 삭제 (예: localStorage.clear();)
      // 2. 관리자 로그인 화면(AdminLogin)으로 이동
      navigate('/');
    }
  };
  
  let first_name = '';
  if (id === 'admin') {
    first_name = "서울시 총괄 관리자";
  } else {
    // 데이터가 있을 때만 접근하도록 안전장치 추가
    first_name = props.data && props.data.length > 0
      ? props.data[0].pklt_nm.split(' ')[0]
      : '관리자';
  }

  // let first_name = '';
  // if(id === 'admin'){
  //   first_name = "서울시 총괄 관리자"
  // }else{
  //   first_name = props.data[0].pklt_nm.split(' ')[0];
  // }

  return (
    <div className="sidebar">

      <div className="sidebar-logo">
        <h2>{first_name}</h2>
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

    {/* 로그아웃 버튼 영역 */}
     <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          로그아웃
        </button>
      </div>

    </div>
  );
}

export default Sidebar;