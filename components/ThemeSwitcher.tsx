import React from 'react';
import type { Theme } from '../App';

interface ThemeSwitcherProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  onClose: () => void;
}

const THEMES: { id: Theme; name: string; colors: string[] }[] = [
  { id: 'classic', name: 'Cổ Điển', colors: ['bg-[#fdf6e3]', 'bg-[#eee8d5]'] },
  { id: 'light', name: 'Sáng', colors: ['bg-white', 'bg-gray-100'] },
  { id: 'dark', name: 'Tối', colors: ['bg-gray-900', 'bg-gray-800'] },
  { id: 'black', name: 'Đen', colors: ['bg-black', 'bg-neutral-900'] },
  { id: 'light-blue', name: 'Xanh Nhạt', colors: ['bg-[#f0f9ff]', 'bg-[#e0f2fe]'] },
  { id: 'wood', name: 'Gỗ', colors: ['bg-[#f5f5dc]', 'bg-[#e3d1b1]'] },
];

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, onThemeChange, onClose }) => {
  const handleThemeSelect = (theme: Theme) => {
    onThemeChange(theme);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 print:hidden"
      onClick={onClose}
    >
      <div 
        className="relative bg-[var(--bg-secondary)] rounded-xl shadow-2xl p-6 w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" onClick={onClose} className="absolute top-3 right-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-3xl h-10 w-10 flex items-center justify-center rounded-full hover:bg-[var(--bg-tertiary)] transition-colors z-10" aria-label="Đóng">
            &times;
        </button>
        <h3 className="text-xl font-semibold text-center mb-6 text-[var(--text-primary)]">Chọn Giao Diện</h3>
        <div className="grid grid-cols-2 gap-4">
          {THEMES.map((theme) => (
            <div key={theme.id} onClick={() => handleThemeSelect(theme.id)} className="cursor-pointer">
              <div
                className={`w-full h-20 rounded-lg flex overflow-hidden border-2 ${
                  currentTheme === theme.id ? 'border-[var(--border-accent)]' : 'border-transparent'
                } transition-all`}
              >
                <div className={`w-1/2 ${theme.colors[0]}`}></div>
                <div className={`w-1/2 ${theme.colors[1]}`}></div>
              </div>
              <p className={`text-center mt-2 text-sm font-medium ${
                currentTheme === theme.id ? 'text-[var(--text-accent)]' : 'text-[var(--text-secondary)]'
              }`}>{theme.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;