import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/app/contexts/ThemeContext';
import { Button } from '@/app/components/ui/button';
import { useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { value: 'light' as const, label: 'Light', icon: Sun },
    { value: 'dark' as const, label: 'Dark', icon: Moon },
    { value: 'system' as const, label: 'System', icon: Monitor },
  ];

  const currentTheme = themes.find((t) => t.value === theme);
  const Icon = currentTheme?.icon || Sun;

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110"
        aria-label="Toggle theme"
      >
        <Icon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            {themes.map((themeOption) => {
              const ThemeIcon = themeOption.icon;
              const isSelected = theme === themeOption.value;
              
              return (
                <button
                  key={themeOption.value}
                  onClick={() => {
                    setTheme(themeOption.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-200 ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-300'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <ThemeIcon className="h-4 w-4" />
                  <span className="text-sm font-medium">{themeOption.label}</span>
                  {isSelected && (
                    <span className="ml-auto text-blue-900 dark:text-blue-300">✓</span>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
