import React, { useState } from 'react';
import type { MultilingualString } from '../types';

interface AdminLoginProps {
  onClose: () => void;
  onLoginAttempt: (password: string) => boolean;
  getML: (textObj: MultilingualString | undefined) => string;
  supportEmail: string;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onClose, onLoginAttempt, getML, supportEmail }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLoginAttempt(password)) {
      // Success is handled by parent
    } else {
      setError(getML({ vi: 'Mật khẩu không chính xác.', en: 'Incorrect password.' }));
      setPassword('');
    }
  };
  
  const mailtoHref = `mailto:${supportEmail}?subject=${encodeURIComponent(
    getML({ vi: 'Yêu cầu đặt lại mật khẩu Admin', en: 'Admin Password Reset Request' })
  )}`;

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 print:hidden"
      onClick={onClose}
    >
      <div
        className="relative bg-[var(--bg-secondary)] rounded-xl shadow-2xl p-8 w-full max-w-xs"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" onClick={onClose} className="absolute top-3 right-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-3xl h-10 w-10 flex items-center justify-center rounded-full hover:bg-[var(--bg-tertiary)] transition-colors z-10" aria-label={getML({ vi: 'Đóng', en: 'Close' })}>
            &times;
        </button>
        <h3 className="text-xl font-semibold text-center mb-4 text-[var(--text-primary)]">
            {getML({ vi: 'Đăng Nhập Admin', en: 'Admin Login' })}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="text-sm font-medium text-[var(--text-secondary)]">
                {getML({ vi: 'Mật khẩu', en: 'Password' })}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="mt-1 block w-full bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--border-accent)] focus:border-[var(--border-accent)] sm:text-sm"
              autoFocus
            />
          </div>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[var(--text-accent)] text-[var(--bg-primary)] font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
          >
            {getML({ vi: 'Đăng Nhập', en: 'Login' })}
          </button>
        </form>
         <div className="text-center mt-4">
          <a
            href={mailtoHref}
            className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-accent)] hover:underline transition-colors"
          >
            {getML({ vi: 'Quên mật khẩu?', en: 'Forgot password?' })}
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;