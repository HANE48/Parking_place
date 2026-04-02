import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import SearchP from './user/components/SearchP.js';

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
