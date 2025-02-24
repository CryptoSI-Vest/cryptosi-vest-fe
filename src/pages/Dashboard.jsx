import { formatDate, getActionbByType } from '../utils';
import claimImg from '../assets/images/claim.png';
import createImg from '../assets/images/create.png';
import explorerImg from '../assets/images/explorer.png';
import { contracts } from '../constants/contracts';
import { Link } from 'react-router-dom';
import CandlestickChart from '../components/PriceChart';

const data = {
  totalVested: 100000,
  symbol: 'XYZ',
  pending: 50000,
  eligible: 1000,
  price: 2500,
};

const transactions = [
  {
    timestamp: Date.now(),
    type: 'claim',
    amount: 1000,
  },
  {
    timestamp: Date.now(),
    type: 'release',
    amount: 5000,
  },
  {
    timestamp: Date.now(),
    type: 'create',
  },
];

const Dashboard = () => {
  return (
    <div className='px-4 py-16 sm:px-12 sm:py-24 flex max-h-screen w-full'>
      <div className='flex gap-6 flex-grow'>
        <div className='flex flex-col gap-8 flex-grow'>
          <div className='flex gap-8'>
            <div className='flex gap-1 flex-col px-8 py-3 items-center bg-white border border-black dark:border-primary rounded-lg w-full'>
              <p>Total Vested:</p>
              <strong>
                {data.totalVested.toLocaleString()} {data.symbol}
              </strong>
            </div>
            <div className='flex gap-1 flex-col px-8 py-3 items-center bg-white border border-black dark:border-primary rounded-lg w-full'>
              <p>Pending Tokens:</p>
              <strong>
                {data.pending.toLocaleString()} {data.symbol}
              </strong>
            </div>
            <div className='flex gap-1 flex-col px-8 py-3 items-center bg-white border border-black dark:border-primary rounded-lg w-full'>
              <p>Eligible Claim:</p>
              <strong>
                {data.eligible.toLocaleString()} {data.symbol}
              </strong>
            </div>
          </div>
          <div className='flex w-full flex-grow overflow-x-auto'>
            <table className='w-full table-fixed border-separate min-w-[700px]'>
              <thead>
                <tr>
                  <th className='bg-primary px-2 dark:bg-secondary dark:text-white py-2'>
                    Token Name
                  </th>
                  <th className='bg-primary px-2 dark:bg-secondary dark:text-white py-2'>
                    Vesting Type
                  </th>
                  <th className='bg-primary px-2 dark:bg-secondary dark:text-white py-2'>
                    Total Vested
                  </th>
                  <th className='bg-primary px-2 dark:bg-secondary dark:text-white py-2'>
                    Next Unlock
                  </th>
                  <th className='bg-primary px-2 dark:bg-secondary dark:text-white py-2'>
                    Target Price
                  </th>
                  <th className='bg-secondary dark:bg-primary px-2 py-2 text-white dark:text-black'>
                    Status
                  </th>
                  <th className='bg-primary px-2 dark:bg-secondary dark:text-white py-2'>
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {contracts.map((contract, index) => (
                  <tr key={index}>
                    <td className='text-center py-2 px-2 bg-white'>
                      <div className='flex w-full items-center justify-center gap-1 whitespace-nowrap'>
                        <img
                          src={contract.image}
                          alt={contract.name}
                          className='h-8 w-8 rounded-full object-cover object-center'
                        />
                        {contract.name}
                      </div>
                    </td>
                    <td className='text-center py-2 px-2 bg-white'>
                      {contract.type}
                    </td>
                    <td className='text-center py-2 px-2 bg-white'>
                      {contract.vestedAmount.toLocaleString()} {contract.symbol}
                    </td>
                    <td className='text-center py-2 px-2 bg-white'>
                      {formatDate(contract.releaseTime)}
                    </td>
                    <td className='text-center py-2 px-2 bg-white'>
                      ${contract.target.toFixed(2).toLocaleString()}
                    </td>
                    <td className='text-center py-2 px-2 bg-primary dark:text-white dark:bg-secondary'>
                      {contract.status}
                    </td>
                    <td className='text-center py-2 px-2 bg-white'>
                      <Link
                        href={'/contract/' + contract.contractAddress}
                        className='text-white dark:text-black bg-secondary dark:bg-primary font-bold px-2 py-1 rounded-md'
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <CandlestickChart />
        </div>
        <div className='quick-action p-6 rounded-lg text-lg gap-8 flex flex-col min-w-[440px]'>
          <div className='flex flex-col rounded-lg bg-[#252A3436] dark:bg-secondary p-4 text-secondary'>
            <span className='p-1 border-b border-white font-bold dark:text-white'>
              Recent Transactions:
            </span>
            {transactions.length ? (
              transactions.map((transaction, index) => (
                <div
                  key={index}
                  className='flex gap-1 p-1 border-b border-white dark:text-[#D2D1D1]'
                >
                  <span>{formatDate(transaction.timestamp)}:</span>
                  {transaction.amount ? (
                    <span>
                      {transaction.amount.toLocaleString()} {data.symbol}
                    </span>
                  ) : null}
                  <span>{getActionbByType(transaction.type)}</span>
                </div>
              ))
            ) : (
              <span className='flex gap-1 p-1 border-b border-white dark:text-[#D2D1D1]'>
                No transactions
              </span>
            )}
          </div>
          <span className='font-bold px-4 dark:text-white'>Quick Actions</span>
          <Link to='/create' className='flex relative'>
            <img src={createImg} alt='claim' />
            <div className='absolute w-full h-full flex justify-center items-center font-black text-3xl text-white text-border'>
              Create Vesting
            </div>
          </Link>
          <Link to='/claim' className='flex relative'>
            <img src={claimImg} alt='claim' />
            <div className='absolute w-full h-full flex justify-center items-center font-black text-3xl text-white text-border'>
              Claim Tokens
            </div>
          </Link>
          <Link to='/explore' className='flex relative'>
            <img src={explorerImg} alt='claim' />
            <div className='absolute w-full h-full flex justify-center items-center font-black text-3xl text-white text-border'>
              Explore Contracts
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
