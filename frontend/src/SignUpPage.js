import React, { useState } from 'react';
import './SignUpPage.css'; 
import { Link } from 'react-router-dom';
import icon from './bookicon.png'

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    phone: '',
    email: '',
    password: '',
    address: '',
  });



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User signed up with:', formData);
    alert('Sign up successful (simulated)');
   
  };

  return (
    <> 
    <header  className="signup-header">
    <img src={icon} className="signup-logo" alt="icon" />    
    <Link to="/"><p>TaqyeemPro</p></Link>
     
    </header>

    <div className="signup-container">
      <h2>Join TaqyeemPro</h2>
      <p>Create your account now to get started</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Write your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone number:</label>
          <input
            type="tel"
            name="phone"
            placeholder="+973 33333333"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            pattern="(?=.*[A-Z]).{8,}"
            placeholder="8+ characters, at least 1 capital"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>


        <button type="submit">Sign Up</button>
        <p>have an account?<Link to="/login">  Login</Link> </p>
        
      </form>
    </div>
 </>
  );
 
  
};

export default SignUpPage;
