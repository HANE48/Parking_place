import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import ManagerMain from './manager/manager_main';
import ParkingTable from './manager/ParkingTable';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ManagerMain />
      </div>
    </BrowserRouter>
  );
}

export default App;
