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
      <div className="logo-container">
          <img src={Logo} className="BQA-logo" alt="logo" />
          <p className="bqa-location">
            <strong>Manama, Bahrain —</strong> The team who built this AI grew up solving math problems in Bahraini schools and, inshallah, definitely got full marks on their exams.
          </p>
        </div>

        <div className="info-container">
          <div className="info-block">
            <h3>WHAT WE BELIEVE</h3>
            <p>
              We believe every student deserves smart evaluation – where AI-powered assessments provide fair, instant feedback and personalized learning paths. Just like Bahrain’s BQA ensures quality education standards, we ensure your progress is measured meaningfully to unlock your full potential.
            </p>
          </div>

          <div className="info-block">
            <h3>ABOUT US</h3>
            <p>
              TaqyeemPro is proudly aligned with Bahrain’s Education & Training Quality Authority (BQA) – the independent body ensuring excellence in education through rigorous evaluations, standardized testing, and quality certifications across all institutions, helping students like you achieve recognized, future-ready qualifications.
            </p>
          </div>
        </div>
    </div>
    
    </>
  );
};

export default HomePage;
