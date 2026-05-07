import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/experience', label: 'Experience' },
    { to: '/projects', label: 'Projects' },
    { to: '/skills', label: 'Skill Tracker' },
    { to: '/oss', label: 'Open Source' },
    { to: '/badges', label: 'Badges' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
  <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <nav className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-base font-semibold tracking-tight bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
          Aryan Thodupunuri
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`text-sm font-medium transition-colors duration-200 ${
                location.pathname === to
                  ? 'text-indigo-700 dark:text-cyan-300'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {label}
            </Link>
          ))}

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-medium text-indigo-600 dark:text-cyan-300 hover:text-indigo-700 dark:hover:text-cyan-200 transition-colors"
            >
              Sign in
            </Link>
            {user ? (
              <>
                <Link
                  to="/vault"
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${
                    location.pathname === '/vault'
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  <span>🔒</span> Interview Vault
                </Link>
                <button
                  onClick={signOut}
                  className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  title={`Sign out (${user.email})`}
                >
                  Sign out
                </button>
              </>
            ) : null}
          </div>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            <span className="text-lg">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-6 py-4 flex flex-col gap-4">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              {label}
            </Link>
          ))}
          <Link to="/login" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
            Sign in
          </Link>
          {user ? (
            <>
              <Link to="/vault" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                🔒 Vault
              </Link>
              <button onClick={() => { signOut(); setMenuOpen(false); }} className="text-sm text-left text-gray-500 dark:text-gray-400">
                Sign out
              </button>
            </>
          ) : null}
        </div>
      )}
    </header>
  );
};

export default Header;