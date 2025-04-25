import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative inline-block text-left text-sm">
      <button
        onClick={toggleMenu}
        className="flex items-center gap-1 px-3 py-1 border border-gray-300 text-dark rounded-md bg-white hover:bg-gray-100 transition"
      >
        {i18n.language.toUpperCase()} <span>▼</span>
      </button>

      {isMenuOpen && (
        <div className="absolute z-10 mt-2 w-24 bg-white border border-gray-200 rounded-md shadow-lg animate-fade-in">
          {['tr', 'en', 'fr', 'de', 'es'].map((lng) => (
            <button
              key={lng}
              onClick={() => changeLanguage(lng)}
              className={`block w-full px-3 py-2 text-left  ${
                i18n.language === lng ? 'font-semibold text-blue-600' : 'text-orange-700'
              }`}
            >
              {lng.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
