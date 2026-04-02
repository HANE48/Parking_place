import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import User_main from "./user/User_main.js";
import SearchP from './user/components/SearchP.js';

function App() {
  return (
    
      <div className="App">
        <User_main/>
      </div>
    
  );
}

export default App;
