// import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './Components/Auth/LoginPage';
import RegisterPage from './Components/Auth/RegisterPage';
import HomePage from './Components/Feed/HomePage';
// import Header from './Components/Header';

function App() {
  return (
    <BrowserRouter>
      <div >
        <Routes>
          <Route exact path="/" element={<LoginPage/>}/>
          <Route exact path="/register" element={<RegisterPage/>}/>
          <Route exact path="/home" element={<HomePage/>}/>
        </Routes>
      </div>      
    </BrowserRouter>
  );
}

export default App;
