import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <form onSubmit={handleLogin} style={{ padding: '50px', textAlign: 'center' }}>
      <h2>관리자 로그인</h2>
      <input value={id} onChange={(e) => setId(e.target.value)} placeholder="아이디 입력" />
      <button type="submit">로그인</button>
    </form>
  );
}

export default AdminLogin;