import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './manager_main.css';

function AdminLogin({data}) {
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const idchk = () =>{
      for(let i=0; i<data.length; i++){
        if(data[i].pklt_cd === id){
          return true;
        }
      }
      return false;
    }

    if ( idchk || id === "admin") {
      alert("로그인 성공");
      navigate("/manager/" + id + "/dashboard");
    } else {
      alert("아이디를 확인하세요.");
    }
  };

 return (
    <div className="admin-login-container">
      <div className="login-card">
        
        <div className="login-header">
          <div className="robot-emoji">🅿️</div>
          <h2 className="login-title">관리자 로그인</h2>
          <p className="login-subtitle">내안의 서울 P 관리 시스템</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label className="input-label">ID / 주차장 코드</label>
            <input 
              className="login-input"
              value={id} 
              onChange={(e) => setId(e.target.value)} 
              placeholder="아이디를 입력하세요" 
            />
          </div>
          
          <button type="submit" className="login-button">
            로그인
          </button>
        </form>

        <div className="login-footer">
          <span onClick={() => navigate('/')} className="back-home-link">
            홈으로 돌아가기
          </span>
        </div>

      </div>
    </div>
  );
}

export default AdminLogin;