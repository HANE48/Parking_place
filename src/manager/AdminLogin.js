import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (id === "171730") {
      
      navigate("/manager/" + id + "/dashboard");
    } else {
      alert("아이디를 확인하세요.");
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ padding: '50px', textAlign: 'center' }}>
      <h2>관리자 로그인</h2>
      <input 
        value={id} 
        onChange={(e) => setId(e.target.value)} 
        placeholder="아이디 입력(171730)" 
      />
      <button type="submit">로그인</button>
    </form>
  );
}

export default AdminLogin;