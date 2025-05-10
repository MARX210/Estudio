"use client";

import { useEffect, useState, useCallback } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Theme = 'light' | 'dark';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light'); // Default to 'light', useEffect will set the correct one
  const [mounted, setMounted] = useState(false);

  // Effect to set the initial theme from localStorage or system preference on mount
  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let initialTheme: Theme;
    if (storedTheme) {
      initialTheme = storedTheme;
    } else if (systemPrefersDark) {
      initialTheme = 'dark';
    } else {
      initialTheme = 'light'; // Default
    }
    setTheme(initialTheme);
  }, []);

  // Effect to apply theme to HTML element and save to localStorage whenever 'theme' state changes
  useEffect(() => {
    if (mounted) { // Ensure this runs only after initial mount and theme determination
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  if (!mounted) {
    // Return a placeholder matching the button's size to prevent layout shift,
    // or null if a brief absence of the button is acceptable.
    return <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10" disabled />;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Mudar para modo escuro' : 'Mudar para modo claro'}
      title={theme === 'light' ? 'Mudar para modo escuro' : 'Mudar para modo claro'} // Tooltip for desktop users
      className="h-9 w-9 sm:w-10 sm:w-10 text-foreground hover:text-primary focus-visible:ring-1 focus-visible:ring-ring"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 sm:h-6 sm:h-6" /> // If light, show Moon (to switch to Dark)
      ) : (
        <Sun className="h-5 w-5 sm:h-6 sm:h-6" />  // If dark, show Sun (to switch to Light)
      )}
    </Button>
  );
}
