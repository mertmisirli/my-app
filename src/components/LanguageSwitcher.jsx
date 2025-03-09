import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsMenuOpen(false); // Dil değiştirildikten sonra menüyü kapat
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`language-switcher ${isMenuOpen ? 'active' : ''}`}>
      <button onClick={toggleMenu}>
        {i18n.language.toUpperCase()} <span>▼</span>
      </button>
      <div className="language-dropdown">
        <button onClick={() => changeLanguage('tr')}>TR</button>
        <button onClick={() => changeLanguage('en')}>EN</button>
        <button onClick={() => changeLanguage('fr')}>FR</button>
        <button onClick={() => changeLanguage('de')}>DE</button>
        <button onClick={() => changeLanguage('es')}>ES</button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
