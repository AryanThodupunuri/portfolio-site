import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white">
          Aryan Thodupunuri
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
            Home
          </Link>
          <Link to="/projects" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
            Projects
          </Link>
          <Link to="/experience" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
            Experience
          </Link>
          <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
            Contact
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;