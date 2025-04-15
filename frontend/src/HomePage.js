import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import icon from './bookicon.png'
import Logo from './BQA-Logo.jpg'
const HomePage = () => {
  return (
  <>
<header className="home-header">
  <div className="left-group">
    <img src={icon} className="header-logo" alt="icon" />
    <p>TaqyeemPro</p>
  </div>
  <Link to="/login" className="login-link">Login</Link>
</header>

    <div className="home-container">
      <h1>Welcome to  TaqyeemPro</h1>
      <div className="logo-container"><img src={Logo} className="BQA-logo" alt="logo" /></div>

    </div>
    
    </>
  );
};

export default HomePage;
