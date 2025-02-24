import { useNavigate } from 'react-router-dom';

export const ContractCard = ({ contract }) => {
  const navigate = useNavigate();
  return (
    <div className='flex rounded-2xl pl-3 contract-card tracking-wide'>
      <div className='w-full rounded-l-2xl rounded-r-2xl flex flex-col py-5 px-4 md:px-12 dark:bg-secondary bg-white dark:text-[#CACACB] min-w-40 sm:min-w-80 items-center gap-1'>
        {contract.image ? (
          <img
            className='w-20 aspect-square flex justify-center items-center rounded-full object-cover object-center'
            src={contract.image}
            alt='token'
          />
        ) : (
          <div className='w-20 aspect-square flex justify-center items-center bg-[#141b2e] rounded-full text-4xl font-black'>
            {contract.name.slice(0, 1).toUpperCase()}
          </div>
        )}
        <span className='dark:text-[#EAEAEA] text-secondary font-bold text-2xl'>
          {contract.name}
        </span>
        <div className='flex items-center gap-2 text-sm mt-2'>
          <span className='font-bold'>Vesting Schedule:</span>
          <span>{contract.duration}</span>
        </div>
        <div className='flex items-center gap-2 text-sm'>
          <span className='font-bold'>Beneficiaries:</span>
          <span>{contract.beneficiaries.length} addresses</span>
        </div>
        <div className='flex items-center gap-2 text-sm'>
          <span className='font-bold'>Status:</span>
          <span>{contract.status}</span>
        </div>
        <div className='flex items-center gap-2 text-sm'>
          <span className='font-bold'>Release Date:</span>
          <span>{contract.releaseTime}</span>
        </div>
        <div className='text-white text-lg font-semibold px-8 py-1 rounded-lg bg-primary dark:bg-dark-primary my-3 text-center'>
          <span className='font-bold'>
            {Number(
              ((contract.vestedAmount / contract.totalSupply) * 100).toFixed()
            )}
            % of total supply vested
          </span>
        </div>
        <button
          onClick={() => navigate('/contract/' + contract.contractAddress)}
          className='px-8 py-1 rounded-lg bg-primary dark:bg-dark-primary text-white'
        >
          View Contract
        </button>
      </div>
    </div>
  );
};
