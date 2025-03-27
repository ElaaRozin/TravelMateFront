import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';



const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();


  const handleBackToLogin = () => {
    navigate('/login')
  };
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://35.184.227.186:3006/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert ('user signed up successfully')
        localStorage.removeItem('token'); 
        navigate('/'); 
      } else {
        alert('email adress already exists');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  

  return (
    <div>
        <NavBar/>
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        
      <input 
          type="email" 
          required placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        />
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
        <button type="submit" onClick={handleBackToLogin}>Already have an account!</button>
      </form>
    </div>
    <Footer/>
    </div>
  );
};

export default Register;
