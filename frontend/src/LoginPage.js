import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import icon from './bookicon.png'

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [role, setRole] = useState('Student');

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
      <h2>Welcome Back </h2>
      <p>Sign in to your TaqyeemPro account</p>
      <div className="role-toggle">
          <label>
            <input
              type="radio"
              value="Student"
              checked={role === 'Student'}
              onChange={() => setRole('Student')}
            />
            Student
          </label>
          <label>
            <input
              type="radio"
              value="Moderator"
              checked={role === 'Moderator'}
              onChange={() => setRole('Moderator')}
            />
            Moderator
          </label>
        </div>
      <form onSubmit={handleSubmit}>
        <div className="login-form-group">
          <label htmlFor="username"></label>
          <input
            type="text"
            id="username"
            placeholder="Email"
            name="username"
            pattern=".{4,12}"
            title="Username must be between 4 and 12 characters"
            required
            value={formData.username}
            onChange={handleChange}
          />
        </div>   
        <div className="login-form-group">
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder='Password'
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
        {message && <p style={{ marginTop: '10px', color: 'crimson' }}>{message}</p>}
        <p>Do not have an account?<Link to="/signup" className='sighnup' > Sign Up</Link></p>
        
      </form>
    </div>
    </>
  );
  
};

export default LoginPage;
