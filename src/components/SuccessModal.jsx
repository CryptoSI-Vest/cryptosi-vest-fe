import success from '../assets/images/success.jfif';
import { Description, Dialog, DialogPanel } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { FacebookTwoTone, Twitter } from '@mui/icons-material';

export const SuccessModal = ({ handleClose, open }) => {
  if (!open) return null;
  return (
    <Dialog open={open} onClose={handleClose} className='relative z-50'>
      <div className='fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/50'>
        <DialogPanel className='max-w-lg space-y-4 bg-white dark:bg-secondary rounded-3xl success-modal'>
          <div className='flex relative flex-col items-center'>
            <img
              src={success}
              className='rounded-3xl aspect-[2.5] object-cover w-full'
              alt='success'
            />
            <div className='absolute bottom-0 flex items-end'>
              <div className='w-5 h-5 bg-white dark:bg-secondary square'></div>
              <div className='bg-white dark:bg-secondary font-black text-2xl text-dark-primary dark:text-white tracking-wider px-4 rounded-t-2xl pt-1'>
                CONGRATULATIONS
              </div>
              <div className='w-5 h-5 bg-white dark:bg-secondary square scale-x-[-1]'></div>
            </div>
          </div>
          <Description className='font-black text-2xl text-[#] dark:text-[#FFFFFF85] px-20 pt-4 text-center tracking-wider'>
            You Have Successfully CLAIMED your TOKEN!
          </Description>
          <div className='flex gap-4 w-full justify-center items-center pb-4'>
            <Link className=''>
              <Twitter
                className='text-dark-primary dark:text-white'
                fontSize='large'
              />
            </Link>
            <Link className=''>
              <FacebookTwoTone
                className='text-dark-primary dark:text-white'
                fontSize='large'
              />
            </Link>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
