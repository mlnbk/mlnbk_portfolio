'use client';

import { useEffect, useState } from 'react';

import { useTheme } from '@Hooks/useTheme';

type NavItem = {
  label: string;
  id: string;
};

const navItems: NavItem[] = [
  { label: 'Projects', id: 'projects' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
  { label: 'Activity', id: 'activity' },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 border-b transition-colors duration-200 ${
        isScrolled
          ? 'border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80'
          : 'border-transparent bg-white/90 backdrop-blur-sm dark:border-transparent dark:bg-gray-900/90'
      }`}
    >
      <div className='mx-auto max-w-6xl px-6 md:px-12 lg:px-16'>
        <div className='flex h-16 items-center justify-end gap-6 md:h-20 md:gap-8'>
          {/* Desktop Navigation */}
          <div className='hidden items-center gap-8 md:flex'>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className='text-sm font-light text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className='flex items-center justify-center p-2 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
            aria-label='Toggle dark mode'
          >
            {isDark ? (
              <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
                />
              </svg>
            ) : (
              <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                />
              </svg>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='flex items-center justify-center p-2 text-gray-600 transition-colors hover:text-gray-900 md:hidden dark:text-gray-400 dark:hover:text-gray-100'
            aria-label='Toggle menu'
          >
            <svg
              className='h-6 w-6'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='1.5'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              {isOpen ? <path d='M6 18L18 6M6 6l12 12' /> : <path d='M4 6h16M4 12h16M4 18h16' />}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className='border-t border-gray-200 bg-white pb-4 md:hidden dark:border-gray-800 dark:bg-gray-900'>
            <div className='flex flex-col gap-4 pt-4'>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className='px-2 py-2 text-left text-sm font-light text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
