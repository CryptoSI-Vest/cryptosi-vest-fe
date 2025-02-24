import { Field, Label, Switch } from '@headlessui/react';
import axios from 'axios';
import { BigNumber, ethers } from 'ethers';
import { Delete, Plus, Recycle, Trash } from 'lucide-react';
import React, { Fragment, useEffect, useState } from 'react';

const CreatePage = () => {
  const [tokenInfo, setTokenInfo] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedToken, setSelectedToken] = useState(
    '0x1121acc14c63f3c872bfca497d10926a6098aac5'
  );
  const [cliffPeriod, setCliffPeriod] = useState(0);
  const [duration, setDuration] = useState(0);
  const [frequency, setFrequency] = useState('montly');
  const [beneficiaries, setBeneficiaries] = useState(['']);
  const [partner, setPartner] = useState('');
  const [amounts, setAmounts] = useState([0]);
  const [priceUnit, setPriceUnit] = useState('USD');
  const [targetPrice, setTargetPrice] = useState(0);
  const [stability, setStability] = useState(24);
  const [oracleAddress, setOracleAddress] = useState('');
  const [isPercentage, setIsPercentage] = useState(false);
  const totalSupply = Number(
    ethers.utils.formatEther(
      BigNumber.from(tokenInfo?.attributes.total_supply.split('.')[0] || '0')
    )
  );

  const [vestingType, setVestingType] = useState('Time-Based');
  const [activeStep, setActiveStep] = useState(0);

  const commonStartSteps = ['Type & Token Detail'];
  const commonEndSteps = ['Beneficiaries', 'Confirm Contract'];

  const isEligible = tokenInfo?.relationships?.top_pools?.data?.[0]?.id || '';

  // Dynamic steps based on the contract type
  const getContractSteps = () => {
    if (vestingType === 'Time-Based') {
      return [...commonStartSteps, 'Vesting Period', ...commonEndSteps];
    }
    if (vestingType === 'Price-Based') {
      return [...commonStartSteps, 'Vesting Trigger', ...commonEndSteps];
    }
    if (vestingType === 'Hybrid') {
      return [
        ...commonStartSteps,
        'Vesting Trigger',
        'Vesting Period',
        ...commonEndSteps,
      ];
    }
  };
  const stepsToDisplay = getContractSteps();

  const handleNext = () => {
    if (activeStep < stepsToDisplay.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      deployContract();
    }
  };

  const deployContract = () => {};

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleGetInfo = async () => {
    if (!selectedToken) return;
    try {
      const response = await axios.get(
        `https://api.geckoterminal.com/api/v2/networks/eth/tokens/${selectedToken}`
      );
      const data = response.data;
      // Format the data into OHLC format for candlestick chart
      if (data) setTokenInfo(data.data);
    } catch (error) {
      if (error.response.status === 404)
        return console.log('Token is not exist');
      console.error('Error fetching chart data:', error);
    }
  };

  const geckoTerminal = () => {
    return `https://www.geckoterminal.com/eth/pools/${
      isEligible.split('_')[1]
    }`;
  };

  const handleBeneficiaryChange = (e, index) => {
    const addresses = beneficiaries.slice(0);
    addresses[index] = e.target.value;
    setBeneficiaries(addresses);
  };

  const handleAmountChange = (e, index) => {
    const values = amounts.slice(0);
    values[index] = isPercentage
      ? (e.target.valueAsNumber / 100) * totalAmount
      : e.target.valueAsNumber;
    if (values.reduce((a, b) => a + b, 0) > totalAmount) return;
    setAmounts(values);
  };

  const handleAddBeneficiary = () => {
    setBeneficiaries([...beneficiaries, '']);
    setAmounts([...amounts, 0]);
  };

  const handleRemoveBeneficiary = (index) => {
    const addresses = beneficiaries.filter((_, id) => id !== index);
    const values = amounts.filter((_, id) => id !== index);
    setBeneficiaries(addresses);
    setAmounts(values);
  };

  const validateBeneficiaries = () => {
    if (stepsToDisplay[activeStep] !== 'Beneficiaries') return true;
    return beneficiaries.reduce((a, b) => a & (b !== ''), true);
  };

  console.log(
    activeStep === stepsToDisplay.length - 1,
    !isEligible,
    !validateBeneficiaries()
  );

  return (
    <div className='px-4 py-16 sm:px-12 sm:py-24 flex flex-col md:max-h-screen w-full'>
      <div className='flex gap-6 flex-col md:flex-row flex-grow sm:items-center'>
        {/* Input Form */}
        <div className='flex flex-col gap-8 flex-grow bg-white dark:bg-[#252A3480] shadow-lg rounded-lg p-6 h-full'>
          <h1 className='text-2xl font-bold text-center dark:text-white'>
            Create Vesting Contract
          </h1>
          {/* Stepper Header */}
          <div className='mb-6 flex justify-between items-start'>
            {stepsToDisplay.map((step, index) => (
              <div
                key={index}
                className={`flex-1 text-center py-2 text-sm gap-2 flex flex-col items-center ${
                  index < activeStep
                    ? 'text-green-500'
                    : index === activeStep
                    ? 'font-bold'
                    : 'text-gray-400'
                }`}
              >
                <div
                  className={`mx-auto w-10 h-10 rounded-full border-2 justify-center items-center flex ${
                    index < activeStep
                      ? 'border-green-500 bg-green-100'
                      : index === activeStep
                      ? 'border-blue-500 bg-blue-100'
                      : 'border-gray-400'
                  }`}
                >
                  <span>{index + 1}</span>
                </div>
                <div className='dark:text-white'>{step}</div>
              </div>
            ))}
          </div>
          {/* Token Info Step */}
          {activeStep === 0 && (
            <div className=' flex flex-col flex-grow'>
              {/* Second Row: Vesting Type Select */}
              <span className='font-bold mb-1 dark:text-white'>
                Vesting Type:
              </span>
              <div className='flex items-center'>
                <select
                  value={vestingType}
                  onChange={(e) => setVestingType(e.target.value)}
                  className='px-4 py-2 rounded-md border border-gray-300 dark:border-secondary text-black dark:text-white bg-[#F2F2F2] dark:bg-secondary flex-grow'
                >
                  <option value='Time-Based'>Time-Based</option>
                  <option value='Price-Based'>Price-Based</option>
                  <option value='Hybrid'>Hybrid</option>
                </select>
              </div>
              {/* First Row: Getting Token Info */}
              <span className='font-bold mb-1 mt-8 dark:text-white'>
                Select Token:
              </span>
              <div className='flex gap-4 flex-col sm:flex-row'>
                <input
                  type='text'
                  value={selectedToken}
                  onChange={(e) => setSelectedToken(e.target.value)}
                  placeholder='Enter token contract address'
                  className='px-4 py-2 rounded-md border border-gray-300 dark:border-secondary text-black dark:text-white bg-[#F2F2F2] dark:bg-secondary flex-grow'
                />
                <button
                  onClick={handleGetInfo}
                  className='px-8 py-2 rounded-md bg-primary dark:bg-dark-primary hover:shadow-lg hover:opacity-90 text-white'
                >
                  Get Info
                </button>
              </div>

              <span className='font-bold mb-1 mt-8 dark:text-white'>
                Vesting Amount:
              </span>
              <div className='flex gap-4 flex-col sm:flex-row'>
                <input
                  type='number'
                  value={totalAmount}
                  max={totalSupply}
                  disabled={!isEligible}
                  onChange={(e) =>
                    setTotalAmount(
                      e.target.valueAsNumber > totalSupply
                        ? totalAmount
                        : e.target.valueAsNumber
                    )
                  }
                  placeholder='Enter vesting amount'
                  className='px-4 py-2 rounded-md border border-gray-300 dark:border-secondary text-black dark:text-white bg-[#F2F2F2] dark:bg-secondary flex-grow'
                />
                <div className='text-lg font-semibold min-w-[120px] flex items-center justify-center border border-gray-300 dark:border-secondary dark:text-white rounded-md'>
                  {Number(
                    (
                      (totalAmount * 100) /
                      (totalSupply ? totalSupply : 1)
                    ).toFixed(4)
                  )}
                  %
                </div>
              </div>
            </div>
          )}
          {/* Duration Step */}
          {((activeStep === 1 && vestingType === 'Time-Based') ||
            (activeStep === 2 && vestingType === 'Hybrid')) && (
            <div className='flex flex-col flex-grow'>
              <span className='font-bold mb-1 dark:text-white'>
                Cliff Period:
              </span>
              <div className='flex gap-4 flex-col sm:flex-row'>
                <input
                  type='number'
                  value={cliffPeriod}
                  disabled={!isEligible}
                  onChange={(e) => setCliffPeriod(e.target.valueAsNumber)}
                  placeholder='Enter vesting amount'
                  className='px-4 py-2 rounded-md border border-gray-300 dark:border-secondary text-black dark:text-white bg-[#F2F2F2] dark:bg-secondary flex-grow'
                />
                <div className='text-lg font-semibold min-w-[120px] flex items-center justify-center border border-gray-300 dark:border-secondary dark:text-white rounded-md'>
                  Months
                </div>
              </div>
              <span className='font-bold mb-1 dark:text-white mt-8'>
                Linear Vesting Period:
              </span>
              <div className='flex gap-4 flex-col sm:flex-row'>
                <input
                  type='number'
                  value={duration}
                  disabled={!isEligible}
                  onChange={(e) => setDuration(e.target.valueAsNumber)}
                  placeholder='Enter vesting amount'
                  className='px-4 py-2 rounded-md border border-gray-300 dark:border-secondary text-black dark:text-white bg-[#F2F2F2] dark:bg-secondary flex-grow'
                />
                <div className='text-lg font-semibold min-w-[120px] flex items-center justify-center border border-gray-300 dark:border-secondary dark:text-white rounded-md'>
                  Months
                </div>
              </div>
              <span className='font-bold mb-1 dark:text-white mt-8'>
                Release Frequency:
              </span>
              <div className='flex items-center'>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className='px-4 py-2 rounded-md border border-gray-300 dark:border-secondary text-black dark:text-white bg-[#F2F2F2] dark:bg-secondary flex-grow'
                >
                  <option value='monthly'>Monthly</option>
                  <option value='weekly'>Weekly</option>
                  <option value='daily'>Daily</option>
                </select>
              </div>
            </div>
          )}
          {/* Price Trigger Step */}
          {vestingType !== 'Time-Based' && activeStep === 1 && (
            <div className='flex flex-col flex-grow'>
              <span className='font-bold mb-1 dark:text-white'>
                Target Price:
              </span>
              <div className='flex gap-4 flex-col sm:flex-row'>
                <input
                  type='number'
                  value={targetPrice}
                  disabled={!isEligible}
                  onChange={(e) => setTargetPrice(e.target.valueAsNumber)}
                  placeholder='Enter target price'
                  className='px-4 py-2 rounded-md border border-gray-300 dark:border-secondary text-black dark:text-white bg-[#F2F2F2] dark:bg-secondary flex-grow'
                />
                <select
                  value={priceUnit}
                  onChange={(e) => setPriceUnit(e.target.value)}
                  className='px-4 py-2 min-w-[120px] rounded-md border border-gray-300 dark:border-secondary text-black dark:text-white bg-[#F2F2F2] dark:bg-secondary'
                >
                  <option value='USD'>USD</option>
                  <option value='ETH'>ETH</option>
                </select>
              </div>
              <span className='font-bold mb-1 dark:text-white mt-8'>
                Price Stability Period:
              </span>
              <div className='flex gap-4 flex-col sm:flex-row'>
                <input
                  type='number'
                  value={stability}
                  disabled={!isEligible}
                  onChange={(e) => setStability(e.target.valueAsNumber)}
                  placeholder='Enter price stability period'
                  className='px-4 py-2 rounded-md border border-gray-300 dark:border-secondary text-black dark:text-white bg-[#F2F2F2] dark:bg-secondary flex-grow'
                />
                <div className='text-lg font-semibold min-w-[120px] flex items-center justify-center border border-gray-300 dark:border-secondary dark:text-white rounded-md'>
                  Hours
                </div>
              </div>
              <span className='font-bold mb-1 dark:text-white mt-8'>
                Oracle Price Feed Address:
              </span>
              <div className='flex gap-4 flex-col sm:flex-row'>
                <input
                  type='text'
                  value={oracleAddress}
                  disabled={!isEligible}
                  onChange={(e) => setOracleAddress(e.target.valueAsNumber)}
                  placeholder='Enter oracle price feed address'
                  className='px-4 py-2 rounded-md border border-gray-300 dark:border-secondary text-black dark:text-white bg-[#F2F2F2] dark:bg-secondary flex-grow'
                />
              </div>
            </div>
          )}
          {/* Beneficiaries */}
          {((activeStep === 3 && vestingType === 'Hybrid') ||
            (activeStep === 2 && vestingType !== 'Hybrid')) && (
            <div className='flex flex-col flex-grow'>
              <div className='flex items-center space-x-2'>
                <span className='font-bold dark:text-white flex-grow'>
                  Add Beneficiaries:
                </span>
                <Field className='flex items-center gap-4 text-black dark:text-white'>
                  <Label>Percentage</Label>
                  <Switch
                    checked={isPercentage}
                    onChange={setIsPercentage}
                    className={`group inline-flex h-6 w-11 items-center rounded-full transition ${
                      isPercentage
                        ? 'bg-primary dark:bg-dark-primary'
                        : 'bg-gray-400'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 transform rounded-full bg-white transition ${
                        isPercentage ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </Switch>
                </Field>
              </div>
              {beneficiaries.map((beneficiary, index) => (
                <div
                  key={index}
                  className='flex gap-4 flex-col sm:flex-row mt-2'
                >
                  <input
                    type='text'
                    value={beneficiary}
                    disabled={!isEligible}
                    onChange={(e) => handleBeneficiaryChange(e, index)}
                    placeholder='Enter address'
                    className='px-4 py-2 rounded-md border border-gray-300 dark:border-secondary text-black dark:text-white bg-[#F2F2F2] dark:bg-secondary flex-grow'
                  />
                  <input
                    type='number'
                    value={
                      isPercentage
                        ? (amounts[index] * 100) / (totalAmount || 1)
                        : amounts[index]
                    }
                    disabled={!isEligible}
                    onChange={(e) => handleAmountChange(e, index)}
                    placeholder='Enter amount'
                    className='px-4 py-2 rounded-md border min-w-[120px] border-gray-300 dark:border-secondary text-black dark:text-white bg-[#F2F2F2] dark:bg-secondary'
                  />
                  <div className='text-base font-semibold min-w-[80px] flex items-center justify-center border border-gray-300 dark:border-secondary dark:text-white rounded-md'>
                    {isPercentage ? '%' : tokenInfo.attributes.symbol}
                  </div>
                  {index === beneficiaries.length - 1 ? (
                    <button
                      onClick={handleAddBeneficiary}
                      className='px-2 border rounded-full border-gray-300 dark:border-secondary text-black dark:text-white bg-[#F2F2F2] dark:bg-secondary'
                    >
                      <Plus />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRemoveBeneficiary(index)}
                      className='px-2 rounded-full border border-gray-300 dark:border-secondary text-white dark:text-white bg-red-500'
                    >
                      <Trash />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
          {/* Confirm Contract */}
          {activeStep === stepsToDisplay.length - 1 && (
            <div className='flex flex-col flex-grow dark:text-white text-lg gap-2'>
              <div className='flex items-center gap-2'>
                <strong className='dark:text-gray-300'>Token:</strong>
                <span className='dark:text-gray-200'>
                  {tokenInfo.attributes.name}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <strong className='dark:text-gray-300'>Total Amount:</strong>
                <span className='dark:text-gray-200'>
                  {totalAmount.toLocaleString()} {tokenInfo.attributes.symbol}
                </span>
              </div>
              {vestingType !== 'Time-Based' && (
                <div className='flex items-center gap-2'>
                  <strong className='dark:text-gray-300'>Price Target:</strong>
                  <span className='dark:text-gray-200'>
                    ${targetPrice} with a {stability} hours stability
                    requirement
                  </span>
                </div>
              )}
              {vestingType !== 'Price-Based' && (
                <div className='flex items-center gap-2'>
                  <strong className='dark:text-gray-300'>
                    Vesting Period:
                  </strong>
                  <span className='dark:text-gray-200'>
                    {`${
                      cliffPeriod ? `${cliffPeriod} months cliff and ` : ''
                    }${duration} months with linear release`}
                  </span>
                </div>
              )}
              <div className='flex-grow'></div>
              <span className='font-bold dark:text-white'>
                Add Partner Address(Optional):
              </span>
              <input
                type='text'
                value={partner}
                disabled={!isEligible}
                onChange={(e) => setPartner(e.target.value)}
                placeholder='Enter address'
                className='px-4 py-2 rounded-md border border-gray-300 dark:border-secondary text-black dark:text-white bg-[#F2F2F2] dark:bg-secondary'
              />
            </div>
          )}
          {/* Actions */}
          <div className='flex justify-between'>
            <button
              onClick={handleBack}
              disabled={activeStep === 0}
              className='px-4 py-2 rounded bg-gray-300 disabled:bg-gray-200 text-black hover:shadow-lg hover:opacity-90'
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!isEligible || !validateBeneficiaries()}
              className='px-4 py-2 rounded bg-primary disabled:bg-blue-300 disabled:cursor-not-allowed dark:bg-dark-primary hover:shadow-lg hover:opacity-90 text-white'
            >
              {stepsToDisplay[activeStep] === 'Confirm Contract'
                ? 'Confirm & Deploy'
                : 'Next'}
            </button>
          </div>
        </div>
        {/* Token Info */}
        {tokenInfo ? (
          <div className='bg-white dark:bg-[#252A3480] dark:text-white shadow-lg p-6 py-12 rounded-lg text-lg gap-4 flex flex-col min-w-[360px] items-center'>
            <img
              className='w-2800 h-20 rounded-full'
              src={tokenInfo.attributes.image_url}
              alt='token'
            />
            <span className='text-xl font-bold'>
              {tokenInfo.attributes.name}
            </span>
            <hr className='w-full' />
            <span className='flex items-center gap-1 w-full'>
              <strong>Ticker:</strong>
              {tokenInfo.attributes.symbol}
            </span>
            <span className='flex items-center gap-1 w-full'>
              <strong>Circulating Supply:</strong>
              {Number(tokenInfo.attributes.market_cap_usd) /
                Number(tokenInfo.attributes.price_usd)}
            </span>
            <span className='flex items-center gap-1 w-full'>
              <strong>Total Supply:</strong>
              {ethers.utils.formatEther(
                BigNumber.from(tokenInfo.attributes.total_supply.split('.')[0])
              )}
            </span>
            <span className='flex items-center gap-1 w-full'>
              <strong>Market Cap:</strong>$
              {Number(tokenInfo.attributes.market_cap_usd).toLocaleString()}
            </span>
            <a
              href={geckoTerminal()}
              className='text-dark-primary dark:text-primary'
              target='_blank'
            >
              View in Gecko Terminal
            </a>
            <hr className='w-full' />
            <div
              className={`inline-block w-full px-4 py-2 rounded-full text-white text-center ${
                isEligible ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              {isEligible ? 'Eligible' : 'Ineligible'}
            </div>
          </div>
        ) : (
          <div className='bg-white dark:bg-[#252A3480] dark:text-white shadow-lg p-6 rounded-lg text-lg gap-8 flex flex-col min-w-[360px]'>
            <div
              className={`inline-block w-full px-4 py-2 rounded-full text-white text-center ${
                isEligible ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              {isEligible ? 'Eligible' : 'Ineligible'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePage;
