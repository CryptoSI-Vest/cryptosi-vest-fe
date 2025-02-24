import React, { useEffect, useState } from 'react';
import useWeb3 from '../hooks/useWeb3';
import { useAnalytics } from '../utils/GoogleAnalytics';
import { SuccessModal } from '../components/SuccessModal';

const Home = () => {
  const { initialized } = useAnalytics();
  console.log('GoogleAnalytics', initialized);
  const { chainId } = useWeb3(); // hook address, isconnected, inConnecting.. @dew

  const [toast, setToast] = useState('');

  useEffect(() => {
    if (toast) {
      setTimeout(() => setToast(''), 5000);
    }
  }, [toast]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);

  return (
    <div>
      <div className='md:hidden fixed gap-3 right-[20px] bottom-[50px] flex flex-col items-center'>
        <a
          className='flex gap-2 items-center p-3 rounded-full bg-[#f78410]'
          href='https://youtu.be/QnmIbgLfC1Y'
          target='_blank'
          rel='noreferrer'
        >
          <svg
            className='h-[30px] w-[30px]'
            xmlns='http://www.w3.org/2000/svg'
            width='30'
            height='30'
            viewBox='0 0 24 24'
            fill='none'
            stroke='white'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <circle cx='12' cy='12' r='10'></circle>
            <polygon points='10 8 16 12 10 16 10 8'></polygon>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Home;
