// App.js
import React from 'react';
import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import Welcome from './Components/Welcome'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginSignup />} /> 
          <Route path="/welcome" element={<Welcome />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
