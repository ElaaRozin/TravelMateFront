import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (emailError) {
      alert('Please enter a valid email');
      return;
    }

    try {
      const response = await fetch('http://localhost:3006/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }),
      });

      if (response.ok) {
        alert('User signed up successfully');
        localStorage.removeItem('token'); 
        navigate('/'); 
      } else {
        alert('Email address already exists');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input 
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required 
          />
          {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
          
          <input 
            type="text"
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
          />
          <input 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <button type="submit">Register</button>
          <button type="button" onClick={handleBackToLogin}>
            Already have an account!
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
