import { useTheme } from '../../contexts/ThemeContext';

/**
 * Simple theme toggle button that cycles through system -> light -> dark
 */
export function ThemeToggle({ className = "" }) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'system') {
      setTheme('light');
    } else if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('system');
    }
  };

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return '☀️';
      case 'dark':
        return '🌙';
      default:
        return '💻';
    }
  };

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      default:
        return 'System';
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center gap-2 px-3 py-2 rounded-md bg-black/20 backdrop-blur-md border border-white/20 hover:bg-black/30 transition-all duration-200 text-white ${className}`}
      title={`Current theme: ${getLabel()}. Click to change.`}
    >
      <span className="text-sm">{getIcon()}</span>
      <span className="text-sm font-medium hidden sm:inline">{getLabel()}</span>
    </button>
  );
}