import React, { useState } from 'react';
import '../styles/Login.css'; // CSS dosyasını import ediyoruz.
import Header from '../components/Header';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { useNavigate } from 'react-router-dom';
import { login, logout } from '../redux/authSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
    // State yönetimi
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Hata mesajı için bir state
    const [isLoading, setIsLoading] = useState(false); // Yükleniyor durumu
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Form gönderildiğinde yükleniyor durumunu başlatıyoruz
        setError(''); // Önceki hata mesajlarını temizliyoruz

        try {
            const response = await fetch('https://localhost:7007/api/Users/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: email,
                    userEmail: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Giriş başarısız');
            }

            // Başarılı giriş sonrası yapılacak işlemler
            console.log('Success:', data);
            dispatch(login());
            navigate('/');

        } catch (error) {
            setError(error.message); // Hata durumunda kullanıcıya mesaj gösteriyoruz
            console.error('Error:', error);
        } finally {
            setIsLoading(false); // Yükleniyor durumunu bitiriyoruz
        }
    };

    return (
        <>
            <Header />

            <div className="login-container">
                <div className="login-box">
                    <h2>Login</h2>

                    {/* Eğer hata varsa, kullanıcıya göster */}
                    {error && <div className="error-message">{error}</div>}

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
                        <button type="submit" className="login-btn" disabled={isLoading}>
                            {isLoading ? 'Logging In...' : 'Log In'}
                        </button>
                    </form>

                    {/* Google Login Butonu */}
                    <GoogleLoginButton />


                    <p className="signup-link">
                        Don't have an account? <a href="/signup">Sign Up</a>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Login;
