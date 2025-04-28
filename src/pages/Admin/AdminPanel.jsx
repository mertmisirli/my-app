import React, { lazy, Suspense, startTransition, useState, useEffect } from 'react';
import Topics from './Panel/Topics';
import decodeToken from '../../utils/tokenUtils';  // decodeToken fonksiyonunu içeri aktarıyoruz
import Cookies from 'js-cookie';  // js-cookie kütüphanesini doğru şekilde import ediyoruz

// Lazy yüklenen componentler
const Users = lazy(() => import('./Panel/Users'));
const Roles = lazy(() => import('./Panel/Roles'));
// const Permissions = lazy(() => import('./Panel/Permissions'));
const Permissions = lazy(() => import('./Panel/Permissions.tsx'));
const Articles = lazy(() => import('./Panel/Articles'));
const Projects = lazy(() => import('./Panel/Projects'));
const Settings = lazy(() => import('./Panel/Settings'));

function AdminPanel() {
  const [activeTab, setActiveTab] = useState('Users');
  const [darkMode, setDarkMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);  // Admin kontrolü için state
  const [loading, setLoading] = useState(true);  // Yükleniyor durumu için state

  // Token kontrol ve admin yetkisi doğrulama
  useEffect(() => {
    const token = Cookies.get('accessToken'); // Cookie'den token'ı al
    console.log("Gelen Token :", token);

    if (token) {
      const decodedToken = decodeToken(token); // Token'ı çöz
      console.log("Çözülmüş Token :", decodedToken);
      console.log("Çözülmüş Token Rolü :", decodedToken.role);
      
      
      if (decodedToken && decodedToken.role === 'Admin') {
        setIsAdmin(true);
      }
    }
    setLoading(false); // Yükleme tamamlandı
    //  const token = document.cookie.split('; ').find(row => row.startsWith('accessToken='));
    //  if (token) {
    //    const decodedToken = decodeToken(token.split('=')[1]);
    //    // Admin rolü kontrolü
    //    if (decodedToken && decodedToken.role === 'Admin') {
    //      setIsAdmin(true);
    //    }
    //  }
    //  setLoading(false);  // Yükleme tamamlandı
  }, []);

  const handleTabChange = (tab) => {
    startTransition(() => {
      setActiveTab(tab);
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Users':
        return <Users />;
      case 'Roles':
        return <Roles />;
      case 'Permissions':
        return <Permissions />;
      case 'Articles':
        return <Articles />;
      case 'Projects':
        return <Projects />;
      case 'Topics':
        return <Topics />;
      case 'Settings':
        return <Settings />;
      default:
        return <p>Bir panel seçin.</p>;
    }
  };

  // Eğer kullanıcı admin değilse paneli gizliyoruz
  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  if (!isAdmin) {
    return <p>Bu sayfaya erişim izniniz yok.</p>;
  }

  return (
    <div className={`container-fluid min-vh-100 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <h4 className='mt-2'>Admin Panel</h4>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`btn btn-sm ${darkMode ? 'btn-light' : 'btn-dark'}`}
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <div className="row mt-2">
        {/* Sidebar */}
        <div className="col-md-2">
          <ul className="list-group">
            {['Users', 'Roles', 'Permissions', 'Articles', 'Projects', 'Topics', 'Settings'].map((item) => (
              <li
                key={item}
                className={`list-group-item ${activeTab === item ? 'active' : ''}`}
                onClick={() => handleTabChange(item)}
                style={{ cursor: 'pointer' }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Content */}
        <div className="col-md-10">
          <div className={`card p-4 ${darkMode ? 'bg-secondary text-light' : ''}`}>
            <h4>{activeTab}</h4>
            <Suspense fallback={<p>Yükleniyor...</p>}>
              {renderContent()}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
