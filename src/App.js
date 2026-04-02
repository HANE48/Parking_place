import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import User_main from './user/user_main';
import SearchP from './user/components/SearchP';
import UserMain from './user/components/UserMain';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <SearchP/>
      </div>
    </BrowserRouter>
  );
}

export default App;
