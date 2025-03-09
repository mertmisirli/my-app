import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import '../styles/Settings.css';

const Settings = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    privacy: {
      profileVisibility: 'public',
      showProgress: true
    },
    language: 'tr',
    theme: 'light'
  });

  const handleNotificationChange = (type) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
  };

  const handlePrivacyChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [setting]: value
      }
    }));
  };

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSave = () => {
    // API call to save settings
    console.log('Saving settings:', settings);
  };

  return (
    <>
      <Header />
      <div className="settings-container">
        <h1>Ayarlar</h1>

        <section className="settings-section">
          <h2>Bildirim Ayarları</h2>
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={settings.notifications.email}
                onChange={() => handleNotificationChange('email')}
              />
              E-posta Bildirimleri
            </label>
          </div>
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={settings.notifications.push}
                onChange={() => handleNotificationChange('push')}
              />
              Push Bildirimleri
            </label>
          </div>
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={settings.notifications.sms}
                onChange={() => handleNotificationChange('sms')}
              />
              SMS Bildirimleri
            </label>
          </div>
        </section>

        <section className="settings-section">
          <h2>Gizlilik Ayarları</h2>
          <div className="setting-item">
            <label>Profil Görünürlüğü</label>
            <select
              value={settings.privacy.profileVisibility}
              onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
            >
              <option value="public">Herkese Açık</option>
              <option value="friends">Sadece Arkadaşlar</option>
              <option value="private">Gizli</option>
            </select>
          </div>
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={settings.privacy.showProgress}
                onChange={(e) => handlePrivacyChange('showProgress', e.target.checked)}
              />
              İlerleme Durumumu Göster
            </label>
          </div>
        </section>

        <section className="settings-section">
          <h2>Genel Ayarlar</h2>
          <div className="setting-item">
            <label>Dil</label>
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
            >
              <option value="tr">Türkçe</option>
              <option value="en">English</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
          <div className="setting-item">
            <label>Tema</label>
            <select
              value={settings.theme}
              onChange={(e) => handleSettingChange('theme', e.target.value)}
            >
              <option value="light">Açık</option>
              <option value="dark">Koyu</option>
              <option value="system">Sistem</option>
            </select>
          </div>
        </section>

        <button className="save-settings-btn" onClick={handleSave}>
          Ayarları Kaydet
        </button>
      </div>
    </>
  );
};

export default Settings;
