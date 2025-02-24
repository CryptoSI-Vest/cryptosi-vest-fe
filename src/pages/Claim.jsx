import { useState } from 'react';
import { SuccessModal } from '../components/SuccessModal';
import { Link } from 'react-router-dom';

const eligibleContracts = [
  {
    name: 'XYZ Token',
    symbol: 'XYZ',
    tokenAddress: '0x1231231231',
    contractAddress: '0x1234567890',
    totalVested: 10000,
    eligible: 5000,
    image:
      'https://s3-alpha-sig.figma.com/img/09bf/2eea/4f6bf4de1a0963b24726bb3b1b157c34?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VDQj~~Cj59Ro8ono114w34LEqCDHas4Mp6V0o0R-W5CYTqi9XSIYOECJmHrqqVz9eB7OE~J98LI0i~9Hs9oqg6fw-M12YsyZQS8IeR0ZPAIiZh97eWX4epTskUzYVb7D1lQ5A9Ojixeu2XJyNHivBsOApj8nJ0OlAoYtVweGA8bO9YVNjP3or0nDrlrj8UHHJm8PJNw0XoScTlhRqmuK6jDJi-XR8kXAcGLxTGdw0n6CqjYXqyN38H-uvk2DzXVHzmGIq0VF67W8JuC-DV9xSjOt58MQ-T2RvpTd9dJezsOsXglmOkSSf1T1I1ANnUc2d5ESdDNU6NHvCeO7ZyWfcQ__',
  },
  {
    name: 'ABC Token',
    symbol: 'ABC',
    tokenAddress: '0x1231231231',
    contractAddress: '0x1234567890',
    totalVested: 20000,
    eligible: 10000,
    image:
      'https://s3-alpha-sig.figma.com/img/9848/70a9/d3288e7406d55dc647be6bce6adbe811?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=awUG-6wxOvt0rTkXb9NltY55uj7aJNzoe4wzjRn5M~9KEUFnembqzIbm55lZ0WiD7sLUegf4c9iTeGUScDc~ad9JL2mQ3xa-YGKHFmP~lEoUaPVZjpMa42LibrWwszb091bqx3MU8BztjjW4IK5wpc8y16XVQFeagsEUymopWbki3j2DNzBtm~iS9rvOM5JkMSJ~4FfsshAoP9cYD0xplPB7uAwsMMSwNiWToOPd~rMUI-7VckbDtezwExQ2cjwJCQi5jUPO929X9Lomv87oIJUKVyc9h9hLJihxi28QS5O2qlYnqG2rNZyfBYNf1Ss1X6BWCjP0CFs-JfLSDHM5bw__',
  },
];

const Claim = () => {
  const [open, setOpen] = useState(false);
  const handleDismiss = () => {
    setOpen(false);
  };
  const handleClaim = () => {
    setOpen(true);
  };
  return (
    <div className='px-4 py-16 sm:px-12 sm:py-24 flex max-h-screen w-full'>
      <div className='rounded-xl shadow-md px-4 sm:px-12 py-8 flex flex-col bg-white dark:bg-[#252A3480] gap-6 border-2 border-white dark:border-black flex-grow overflow-y-auto'>
        <span className='text-center dark:text-white text-secondary font-semibold text-3xl'>
          Claim Tokens
        </span>
        <div className='flex flex-col gap-2 items-center bg-white dark:bg-secondary rounded-lg py-4 px-6 shadow-large dark:border-2 border-[#828898]'>
          <p className='text-secondary dark:text-white text-2xl'>
            Total Eligible Tokens:
          </p>
          {eligibleContracts.length ? (
            eligibleContracts.map((contract, index) => (
              <p className='font-bold text-xl dark:text-white' key={index}>
                {contract.eligible.toLocaleString()} {contract.symbol}
              </p>
            ))
          ) : (
            <p className='font-bold text-xl dark:text-white'>
              No Eligible Tokens
            </p>
          )}
        </div>
        <div className='flex flex-col gap-4 items-center bg-[#EAEAEA] border-[#EAEAEA] dark:bg-secondary rounded-lg py-4 px-6 border-2 dark:border-[#828898]'>
          <p className='w-full text-secondary dark:text-white font-bold text-2xl'>
            Vesting Contract Breakdown
          </p>
          <div className='flex w-full overflow-x-auto'>
            <table className='w-full table-fixed border-separate min-w-[700px]'>
              <thead>
                <tr>
                  <th className='bg-secondary dark:bg-black text-white py-2'>
                    Token Name
                  </th>
                  <th className='bg-secondary dark:bg-black text-white py-2'>
                    Vested Amount
                  </th>
                  <th className='bg-secondary dark:bg-black text-white py-2'>
                    Claimable
                  </th>
                  <th className='bg-secondary dark:bg-black text-white py-2'>
                    View
                  </th>
                  <th className='bg-primary dark:bg-dark-primary py-2'>
                    Select
                  </th>
                </tr>
              </thead>
              <tbody>
                {eligibleContracts.map((contract, index) => (
                  <tr key={index}>
                    <td className='text-center py-1 bg-white'>
                      <div className='flex w-full items-center justify-center gap-3'>
                        <img
                          src={contract.image}
                          alt={contract.name}
                          className='h-8 w-8 rounded-full object-cover object-center'
                        />
                        {contract.name}
                      </div>
                    </td>
                    <td className='text-center py-1 bg-white'>
                      {contract.totalVested.toLocaleString()} {contract.symbol}
                    </td>
                    <td className='text-center py-1 bg-white'>
                      {contract.eligible.toLocaleString()} {contract.symbol}
                    </td>
                    <td className='text-center py-1 bg-white'>
                      <Link
                        href={'/contract/' + contract.contractAddress}
                        className='text-primary dark:text-dark-primary font-bold'
                      >
                        View Contract
                      </Link>
                    </td>
                    <td className='text-center py-1 bg-white'>
                      <input
                        type='checkbox'
                        className='focus:outline-none focus:ring-0'
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='py-2 flex flex-col sm:flex-row justify-center items-center text-secondary dark:text-white gap-2 border-4 border-primary dark:border-dark-primary dark:bg-secondary text-xl rounded-3xl px-2'>
          <span className='text-center'>Estimated Gas Fee:</span>
          <span className='font-bold'>0.001 ETH </span>
        </div>
        <div className='flex items-center space-x-2 justify-center'>
          <input
            type='checkbox'
            id='enable-batch-claim'
            className='h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
          />
          <label
            htmlFor='enable-batch-claim'
            className='font-medium text-secondary dark:text-white'
          >
            Enable Batch Claim
          </label>
        </div>
        <button
          onClick={handleClaim}
          className='w-full rounded-lg bg-primary dark:bg-dark-primary text-white text-xl py-3 transition-all duration-200 hover:scale-105 active:scale-95'
        >
          Claim Selected Tokens
        </button>
      </div>
      <SuccessModal handleClose={handleDismiss} open={open} />
    </div>
  );
};

export default Claim;
