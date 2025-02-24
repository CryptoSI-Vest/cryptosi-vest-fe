import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import CandlestickChart from 'react-candlestick-chart';
import { useLocation } from 'react-router';

const PriceChart = () => {
  const [chartData, setChartData] = useState([]);
  const [interval, setInterval] = useState('1H');
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  useEffect(() => {
    // Fetch the candlestick data from GeckoTerminal or any API
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          `https://api.geckoterminal.com/api/v2/networks/eth/pools/0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640/ohlcv/${getParams()}`
        );
        const data = response.data;
        // Format the data into OHLC format for candlestick chart
        const formattedData = data.data.attributes.ohlcv_list.map((item) => {
          const date = new Date(item[0] * 1000);
          return {
            date:
              date.getFullYear() +
              '-' +
              String(date.getMonth() + 1).padStart(2, '0') +
              '-' +
              String(date.getDate()).padStart(2, '0') +
              ' ' +
              String(date.getHours()).padStart(2, '0') +
              ':' +
              String(date.getMinutes()).padStart(2, '0'), // Adjust according to API data structure
            open: item[1],
            high: item[2],
            low: item[3],
            close: item[4],
            volume: item[5],
          };
        });
        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchChartData();
  }, [interval]);

  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Handle window resize
  const handleResize = () => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    // Attach resize event listener
    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const filters = ['1H', '4H', '1D', '1W'];

  const handleClickOption = (option) => {
    setInterval(option);
  };

  const getParams = () => {
    if (interval === '1H') return 'minute?aggregate=1&limit=60';
    if (interval === '4H') return 'minute?aggregate=5&limit=48';
    if (interval === '1D') return 'minute?aggregate=15&limit=96';
    return 'hour?aggregate=1&limit=168';
  };
  return (
    <div
      className='w-full flex flex-col border-8 border-secondary dark:border-[#82889833] rounded-md'
      id='candlestick-chart'
    >
      <div className='flex items-center bg-secondary dark:bg-[#82889833] text-white p-2 pt-0'>
        <span className='text-xl font-bold flex-grow'>ETH/USD</span>
        <div className='flex p-1.5 bg-[#82889880] rounded-md'>
          {filters.map((option) => (
            <button
              key={option}
              onClick={() => handleClickOption(option)}
              className={`${
                interval === option ? 'bg-[#828898]' : ''
              } px-2 py-1 min-w-[50px] rounded leading-none`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <CandlestickChart
        data={chartData}
        id={'chart1'}
        width={screenSize.width - (isDashboard ? 140 : 55) * 4}
        height={250}
        decimal={2}
        scrollZoom={{
          enable: true,
          max: 20,
        }}
        rangeSelector={{
          enable: false,
          height: 0,
          initialRange: { type: 'month', value: 1 },
        }}
        responsiveBreakPoint={1}
      />
    </div>
  );
};

export default PriceChart;
