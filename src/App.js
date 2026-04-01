import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import User_main from './user/User_main.js';
import Manager_main from './manager/Manager_main.js';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Link to='/user'>유저창</Link>
        <Link to='/manager'>관리자창</Link>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/user' element={<User_main />} />
          <Route path='/manager' element={<Manager_main />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Login(){
  return(
    <div>
      <p>로그인 화면</p>
    </div>
  );

}

export default App;
