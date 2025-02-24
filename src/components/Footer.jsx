import { Moon, Sun } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ data }) => {
  const [darkMode, setDarkMode] = useState(
    typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);
  console.log(darkMode);
  return (
    <footer className='fixed bottom-0 w-full flex bg-[#CACACB] dark:bg-secondary transition duration-200'>
      <div className='relative flex w-full'>
        <div className='flex justify-center p-4 divide-x divide-secondary dark:divide-white w-full'>
          <Link
            to='/terms'
            className='font-semibold hover:text-black dark:hover:text-white text-secondary px-4 dark:text-white transition duration-300'
          >
            Terms
          </Link>
          <Link
            to='/privacy'
            className='font-semibold hover:text-black dark:hover:text-white text-secondary px-4 dark:text-white transition duration-300'
          >
            Privacy
          </Link>
          <Link
            to='/contact'
            className='font-semibold hover:text-black dark:hover:text-white text-secondary px-4 dark:text-white transition duration-300'
          >
            Support
          </Link>
        </div>
        <div className='absolute left-4 flex h-full'>
          <label className='relative inline-flex items-center cursor-pointer'>
            <input
              type='checkbox'
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className='sr-only peer'
            />
            <div className='w-16 h-8 bg-secondary dark:bg-black rounded-full transition-all relative shadow-md'>
              {/* Sun Icon */}
              <Sun
                className={`absolute left-1.5 top-1/2 transform -translate-y-1/2 z-10 w-5 h-5 text-yellow-500 transition-all duration-500 opacity-100 ${
                  darkMode
                    ? 'text-[#EAEAEA6E] dark:text-[#EAEAEA]'
                    : 'text-secondary dark:text-[#EAEAEA6E]'
                }`}
              />

              {/* Moon Icon */}
              <Moon
                className={`absolute right-1.5 top-1/2 transform -translate-y-1/2 z-10 w-5 h-5 text-gray-100 transition-all duration-500 opacity-100 ${
                  darkMode
                    ? 'text-secondary dark:text-[#EAEAEA6E]'
                    : 'text-[#EAEAEA6E] dark:text-[#EAEAEA]'
                }`}
              />

              {/* Slider Ball */}
              <div
                className={`absolute left-1 top-1 w-6 h-6 bg-white dark:bg-secondary rounded-full shadow-md transition-all transform duration-500 ${
                  darkMode ? 'translate-x-8' : 'translate-x-0'
                }`}
              ></div>
            </div>
          </label>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
