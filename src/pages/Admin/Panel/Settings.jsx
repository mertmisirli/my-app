import React, { useState } from 'react';

function Settings() {
  const [systemSettings, setSystemSettings] = useState({
    siteTitle: 'Admin Paneli',
    maintenanceMode: false,
    defaultLanguage: 'tr',
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: 30, // dakika
  });

  const handleSystemChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSystemSettings({
      ...systemSettings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecuritySettings({
      ...securitySettings,
      [name]: type === 'checkbox' ? checked : parseInt(value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Kaydedilen Admin Ayarları:', {
      systemSettings,
      securitySettings,
    });
    alert('Ayarlar başarıyla kaydedildi!');
  };

  return (
    <div>
      <h5 className="mb-4">Yönetim Paneli Ayarları</h5>
      <form onSubmit={handleSubmit}>

        {/* Sistem Ayarları */}
        <div className="mb-4">
          <h6>Sistem Ayarları</h6>
          <div className="mb-2">
            <label className="form-label">Site Başlığı</label>
            <input
              type="text"
              name="siteTitle"
              value={systemSettings.siteTitle}
              onChange={handleSystemChange}
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Varsayılan Dil</label>
            <select
              name="defaultLanguage"
              value={systemSettings.defaultLanguage}
              onChange={handleSystemChange}
              className="form-select"
            >
              <option value="tr">Türkçe</option>
              <option value="en">İngilizce</option>
              <option value="fr">Fransızca</option>
            </select>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              name="maintenanceMode"
              checked={systemSettings.maintenanceMode}
              onChange={handleSystemChange}
              className="form-check-input"
              id="maintenanceMode"
            />
            <label htmlFor="maintenanceMode" className="form-check-label">
              Bakım Modunu Aktif Et
            </label>
          </div>
        </div>

        {/* Güvenlik Ayarları */}
        <div className="mb-4">
          <h6>Güvenlik Ayarları</h6>
          <div className="form-check mb-2">
            <input
              type="checkbox"
              name="twoFactorAuth"
              checked={securitySettings.twoFactorAuth}
              onChange={handleSecurityChange}
              className="form-check-input"
              id="twoFactorAuth"
            />
            <label htmlFor="twoFactorAuth" className="form-check-label">
              2 Adımlı Doğrulama (2FA)
            </label>
          </div>
          <div className="mb-2">
            <label className="form-label">Oturum Zaman Aşımı (dk)</label>
            <input
              type="number"
              name="sessionTimeout"
              value={securitySettings.sessionTimeout}
              onChange={handleSecurityChange}
              className="form-control"
              min={5}
              max={120}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Ayarları Kaydet
        </button>
      </form>
    </div>
  );
}

export default Settings;
