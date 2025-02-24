import React from 'react';
import logo from '../assets/images/logo-light.png';
import logo_dark from '../assets/images/logo-dark.png';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='absolute top-0 w-full flex'>
      <div className='fixed w-full flex justify-between py-1 px-8 items-center shadow-xl backdrop-filter backdrop-blur-[8px] bg-[#F2F2F2] dark:bg-secondary transition duration-200'>
        <img
          className='max-h-[40px] sm:max-h-[50px] block dark:hidden'
          src={logo}
          alt='logo'
        />
        <img
          className='max-h-[40px] sm:max-h-[50px] hidden dark:block'
          src={logo_dark}
          alt='logo'
        />
        <div className='flex flex-grow justify-center gap-1'>
          <Link
            to='/explore'
            className='font-bold text-black dark:text-[#EAEAEA] hover:bg-black/5 dark:hover:bg-white/5 rounded px-4 py-2 transition duration-300'
          >
            Explore
          </Link>
          <Link
            to='/dashboard'
            className='font-bold text-black dark:text-[#EAEAEA] hover:bg-black/5 dark:hover:bg-white/5 rounded px-4 py-2 transition duration-300'
          >
            Dashboard
          </Link>
          <Link
            to='/claim'
            className='font-bold text-black dark:text-[#EAEAEA] hover:bg-black/5 dark:hover:bg-white/5 rounded px-4 py-2 transition duration-300'
          >
            Claim
          </Link>
          <Link
            to='/create'
            className='font-bold text-black dark:text-[#EAEAEA] hover:bg-black/5 dark:hover:bg-white/5 rounded px-4 py-2 transition duration-300'
          >
            Create
          </Link>
        </div>
        <div className='flex gap-0 my-0 sm:gap-4'>
          <ConnectButton></ConnectButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
