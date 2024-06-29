import './App.css';
import LandingPage from './components/views/LandingPage/LandingPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import axios from 'axios';
import React, { useEffect } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


function App() {

  const callApi = async () => {
    axios.get('/api/hello')
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err);
    })
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<LandingPage/>} /> 
              <Route path="/register" element={<RegisterPage/>} /> 
              <Route path="/login" element={<LoginPage/>} /> 
            </Routes>
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
