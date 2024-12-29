import React, { useState } from 'react';
import '../styles/Signup.css'; // CSS dosyasını import ediyoruz.
import Header from '../components/Header';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Kayıt işlemi yapılabilir
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <>
      <Header />
      <div className="signup-container">
        <div className="signup-box">
          <h2>Create an Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm your password"
              />
            </div>
            <button type="submit" className="signup-btn">Sign Up</button>
          </form>
          <p className="login-link">
            Already have an account? <a href="/login">Log In</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
