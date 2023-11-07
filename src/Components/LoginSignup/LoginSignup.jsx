import React, { useState } from 'react';
import axios from 'axios';
import './LoginSignup.css';
import { useNavigate } from 'react-router-dom'; // import useNavigate instead of useHistory

// importing the assets
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Update state with user input
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Handle user sign up
  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:5002/register', userData);
      console.log(response.data);
      // Perform actions after successful Sign Up
    } catch (error) {
      console.error('There was an error!', error);
    }
  };



  const navigate = useNavigate(); // Initialize the useNavigate hook


  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5002/login', userData);
  
      if (response.status === 200) {
        // Assuming the server sends a response with a success field
        navigate(`/welcome?name=${encodeURIComponent(response.data.message)}`);
      } else {
        // Handle other responses here
        alert(response.data.message);
      }
    } catch (error) {
      console.error('There was an error!', error);
      // Handle non-200 responses here
      alert(error.response.data.message || 'An error occurred during login.');
    }
  };
  
  
  
  
  // Toggle to show login form
  const showLogin = () => {
    setAction("Login");
  };

  // Toggle to show sign up form
  const showSignUp = () => {
    setAction("Sign Up");
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'> {action} </div>
      </div>
      <div className='inputs'>
        {action === "Sign Up" && (
          <div className='input'>
            <img src={user_icon} alt='' />
            <input 
              type="text" 
              placeholder='Name' 
              name="name"
              value={userData.name}
              onChange={handleChange}
            />
          </div>
        )}

        <div className='input'>
          <img src={email_icon} alt='' />
          <input 
            type="email" 
            placeholder='Email' 
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        <div className='input'>
          <img src={password_icon} alt='' />
          <input 
            type="password" 
            placeholder='Password' 
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className='submit-container'>
        {action === "Sign Up" ? (
          <button 
            className="submit" 
            onClick={handleSignUp}
          > 
            Sign Up
          </button>
        ) : (
          <button 
            className="submit" 
            onClick={handleLogin}
          > 
            Login
          </button>
        )}
        {action === "Sign Up" ? (
          <button 
            className="submit gray" 
            onClick={showLogin}
          > 
            Login
          </button>
        ) : (
          <button 
            className="submit gray" 
            onClick={showSignUp}
          > 
            Sign Up
          </button>
        )}
      </div>
    </div>
  );
}

export default LoginSignup;
