import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import icon from './bookicon.png'

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username === 'admin' && formData.password === 'password') {
      setMessage('Login successful!');
    } else {
      setMessage('Invalid username or password');
    }
  };

  return (
    <>   
    <header  className="login-header">
    <img src={icon} className="login-logo" alt="icon" />    
    <Link to="/"><p>TaqyeemPro</p></Link>
     
    </header>
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="login-form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            pattern=".{4,12}"
            title="Username must be between 4 and 12 characters"
            required
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
        {message && <p style={{ marginTop: '10px', color: 'crimson' }}>{message}</p>}
        <p>Do not have an account?</p>
        <Link to="/signup" style={{ fontSize: 'small' }}>Create an acount</Link>

      </form>
    </div>
    </>
  );
  
};

export default LoginPage;
