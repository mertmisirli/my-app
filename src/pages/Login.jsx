import React, { useState } from 'react';
import '../styles/Login.css'; // CSS dosyasını import ediyoruz.
import Header from '../components/Header';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Burada giriş işlemi yapılabilir
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <>
            <Header />

            <div className="login-container">
                <div className="login-box">
                    <h2>Login</h2>
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
                        <button type="submit" className="login-btn">Log In</button>
                    </form>
                    <p className="signup-link">
                        Don't have an account? <a href="/signup">Sign Up</a>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Login;
