import React, { useState, useEffect, useRef } from 'react';
import type { Theme } from '../App';
import ThemeSwitcher from './ThemeSwitcher';
import type { MultilingualString, LanguageConfig } from '../types';
import { getMultilingualText } from '../utils/multilingual';

interface HeaderProps {
  onGoBack: () => void;
  showBackButton: boolean;
  currentLanguage: string;
  languages: LanguageConfig[];
  defaultLanguage: string;
  onLanguageChange: (langCode: string) => void;
  onAdminClick: () => void;
  onLogout: () => void;
  isAdmin: boolean;
  logoUrl: string;
  title: MultilingualString;
  subtitle: MultilingualString;
  onTitleClick: () => void;
  onAboutClick: () => void;
  onThemeChange: (theme: Theme) => void;
  currentTheme: Theme;
}

const Header: React.FC<HeaderProps> = ({
  onGoBack,
  showBackButton,
  currentLanguage,
  languages,
  defaultLanguage,
  onLanguageChange,
  onAdminClick,
  onLogout,
  isAdmin,
  logoUrl,
  title,
  subtitle,
  onTitleClick,
  onAboutClick,
  onThemeChange,
  currentTheme,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [showThemeSwitcher, setShowThemeSwitcher] = useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const langButtonRef = useRef<HTMLButtonElement>(null);
  const adminMenuRef = useRef<HTMLDivElement>(null);
  const adminButtonRef = useRef<HTMLButtonElement>(null);
  
  const getML = (textObj: MultilingualString | undefined) => getMultilingualText(textObj, currentLanguage, defaultLanguage);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node) && langButtonRef.current && !langButtonRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
      if (adminMenuRef.current && !adminMenuRef.current.contains(event.target as Node) && adminButtonRef.current && !adminButtonRef.current.contains(event.target as Node)) {
        setIsAdminMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-10 w-full bg-[var(--bg-primary)]/80 backdrop-blur-md shadow-md print:hidden">
        <div className="container mx-auto max-w-4xl flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            {showBackButton ? (
              <button
                onClick={onGoBack}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors h-10 w-10 flex items-center justify-center bg-[var(--bg-secondary)] rounded-lg"
                aria-label={getML({ vi: 'Quay lại', en: 'Go back' })}
              >
                <i className="fas fa-arrow-left"></i>
              </button>
            ) : (
                <div className="w-10 h-10"></div> // Placeholder
            )}
            <div onClick={onTitleClick} className="flex items-center space-x-3 cursor-pointer">
              {logoUrl && <img src={logoUrl} alt="Logo" className="h-10 w-10 object-contain" />}
              <div>
                <h1 className="text-xl font-bold text-[var(--text-accent)]">{getML(title)}</h1>
                <p className="text-xs text-[var(--text-secondary)] hidden sm:block">{getML(subtitle)}</p>
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-2">
            <div className="relative">
                <button ref={langButtonRef} onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} className="menu-btn" aria-label={getML({ vi: "Đổi ngôn ngữ", en: "Change language" })}>
                    <i className="fas fa-language text-lg"></i>
                </button>
                {isLangMenuOpen && (
                    <div ref={langMenuRef} className="absolute right-0 mt-2 w-40 bg-[var(--bg-secondary)] rounded-lg shadow-xl py-1">
                        {languages.map(lang => (
                            <a
                                key={lang.code}
                                href="#"
                                onClick={(e) => { e.preventDefault(); onLanguageChange(lang.code); setIsLangMenuOpen(false); }}
                                className={`block px-4 py-2 text-sm ${currentLanguage === lang.code ? 'font-bold text-[var(--text-accent)]' : 'text-[var(--text-secondary)]'} hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]`}
                            >
                                {lang.name}
                            </a>
                        ))}
                    </div>
                )}
            </div>
            <button onClick={() => setShowThemeSwitcher(true)} className="menu-btn" aria-label={getML({ vi: "Đổi giao diện", en: "Change theme" })}>
              <i className="fas fa-palette"></i>
            </button>
            <button onClick={onAboutClick} className="menu-btn" aria-label={getML({ vi: "Về ứng dụng", en: "About the app" })}>
              <i className="fas fa-info-circle"></i>
            </button>
            <div className="relative">
              <button ref={adminButtonRef} onClick={() => isAdmin ? setIsAdminMenuOpen(prev => !prev) : onAdminClick()} className={`menu-btn ${isAdmin ? 'text-[var(--text-accent)]' : ''}`} aria-label="Admin Menu">
                <i className="fas fa-user-shield"></i>
              </button>
              {isAdmin && isAdminMenuOpen && (
                <div ref={adminMenuRef} className="absolute right-0 mt-2 w-48 bg-[var(--bg-secondary)] rounded-lg shadow-xl py-1 text-sm">
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); onAdminClick(); setIsAdminMenuOpen(false); }}
                    className="flex items-center px-4 py-2 text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
                  >
                    <i className="fas fa-cogs fa-fw mr-2"></i> {getML({ vi: 'Bảng Điều Khiển', en: 'Admin Panel' })}
                  </a>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); onLogout(); setIsAdminMenuOpen(false); }}
                    className="flex items-center px-4 py-2 text-red-400 hover:bg-red-500/10"
                  >
                    <i className="fas fa-sign-out-alt fa-fw mr-2"></i> {getML({ vi: 'Đăng Xuất', en: 'Logout' })}
                  </a>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button ref={buttonRef} onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors h-10 w-10 flex items-center justify-center bg-[var(--bg-secondary)] rounded-lg" aria-label="Open menu">
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div ref={menuRef} className="md:hidden animate-fade-in-down bg-[var(--bg-secondary)] shadow-lg absolute top-full left-0 w-full">
            <nav className="flex flex-col p-4 space-y-2">
              <div className="mobile-menu-btn">
                <i className="fas fa-language w-6"></i>
                <select onChange={(e) => { onLanguageChange(e.target.value); setIsMenuOpen(false); }} value={currentLanguage} className="bg-transparent w-full focus:outline-none">
                    {languages.map(lang => (
                        <option key={lang.code} value={lang.code} className="bg-[var(--bg-primary)] text-[var(--text-primary)]">{lang.name}</option>
                    ))}
                </select>
              </div>
              <button onClick={() => { setShowThemeSwitcher(true); setIsMenuOpen(false); }} className="mobile-menu-btn">
                <i className="fas fa-palette w-6"></i><span>{getML({ vi: "Đổi Giao Diện", en: "Change Theme" })}</span>
              </button>
              <button onClick={() => { onAboutClick(); setIsMenuOpen(false); }} className="mobile-menu-btn">
                <i className="fas fa-info-circle w-6"></i><span>{getML({ vi: "Về Ứng Dụng", en: "About App" })}</span>
              </button>
              <button onClick={() => { onAdminClick(); setIsMenuOpen(false); }} className={`mobile-menu-btn ${isAdmin ? 'text-[var(--text-accent)]' : ''}`}>
                <i className="fas fa-user-shield w-6"></i><span>{isAdmin ? getML({ vi: 'Bảng Điều Khiển', en: 'Admin Panel' }) : 'Admin'}</span>
              </button>
              {isAdmin && (
                  <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="mobile-menu-btn text-red-400">
                      <i className="fas fa-sign-out-alt w-6"></i><span>{getML({ vi: 'Đăng Xuất', en: 'Logout' })}</span>
                  </button>
              )}
            </nav>
          </div>
        )}
      </header>
      {showThemeSwitcher && (
         <ThemeSwitcher 
            currentTheme={currentTheme} 
            onThemeChange={onThemeChange}
            onClose={() => setShowThemeSwitcher(false)} 
        />
      )}
      <style>{`
        .menu-btn { display: flex; align-items: center; padding: 0.5rem; border-radius: 0.5rem; background-color: var(--bg-secondary); color: var(--text-secondary); transition: all 0.2s; }
        .menu-btn:hover { background-color: var(--bg-tertiary); color: var(--text-primary); }
        .mobile-menu-btn { display: flex; align-items: center; padding: 0.75rem; border-radius: 0.5rem; text-align: left; font-weight: 600; color: var(--text-secondary); }
        .mobile-menu-btn:hover { background-color: var(--bg-tertiary); color: var(--text-primary); }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-down { animation: fadeInDown 0.3s ease-out forwards; }
      `}</style>
    </>
  );
};

export default Header;