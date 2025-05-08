import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';  // js-cookie kütüphanesini doğru şekilde import ediyoruz
import { useNavigate } from 'react-router-dom';
import decodeToken from '../../utils/tokenUtils';

function AdminLogin() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();  // React Router'dan useNavigate hook'u kullanarak yönlendirme işlemi yapacağız.

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !password || !userEmail) {
      setError('Tüm alanları doldurun!');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_USER_API_URL}/Users/LoginAsAdmin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserName: userName,
          Password: password,
          UserEmail: userEmail,
          accessTokenLifeTime: 60,  // Token süresi (dakika cinsinden)
        }),
      });

      const text = await response.text();
      
      try {
        const data = JSON.parse(text);  // Eğer JSON dönüyorsa parse edilir

        if (data && data.accessToken) {
          Cookies.set('accessToken', data.accessToken, { expires: 7 });
          alert('Giriş başarılı!');
        } else {
          setError('Token alınamadı. Giriş başarısız.');
        }
      } catch (err) {
        console.error('JSON parse hatası:', err);
        setError('Yanıttan token okunamadı.');
      } finally {
        setLoading(false);
      }

    }
    catch (error) {
      console.error('Giriş hatası:', error);
      setError('Giriş sırasında bir hata oluştu.');
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get('accessToken');  // Cookie'den token'ı alıyoruz

    if (token) {
      const decodedToken = decodeToken(token);  // Token'ı çöz

      if (decodedToken && decodedToken.role === 'Admin') {
        navigate('/admin-panel');  // Eğer admin ise yönlendiriyoruz
      }
    }
  }
  , []);  // Boş bağımlılık dizisi ile sadece bileşen ilk yüklendiğinde çalışır
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-400 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Giriş Yap</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Kullanıcı Adı
          </label>
          <input
            id="username"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Kullanıcı Adı"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            E-Posta
          </label>
          <input
            id="email"
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="E-Posta"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Şifre
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Şifre"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg transition duration-200"
          disabled={loading}
        >
          {loading ? 'Yükleniyor...' : 'Giriş'}
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;
