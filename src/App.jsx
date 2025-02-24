import '@rainbow-me/rainbowkit/styles.css';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import ActiveWeb3Provider from './contexts/Web3Context';
import {
  RainbowKitProvider,
  connectorsForWallets,
  getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import { customChains } from './constants/chains';
import {
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
  trustWallet,
  ledgerWallet,
  phantomWallet,
  okxWallet,
} from '@rainbow-me/rainbowkit/wallets';
import Header from './components/Header';
import Footer from './components/Footer';
import Explorer from './pages/Explore';
import Detail from './pages/Detail';
import Claim from './pages/Claim';
import Dashboard from './pages/Dashboard';
import CreatePage from './pages/Create';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [
        metaMaskWallet,
        phantomWallet,
        walletConnectWallet,
        rainbowWallet,
        trustWallet,
        ledgerWallet,
        okxWallet,
      ],
    },
  ],
  {
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
  }
);

const config = getDefaultConfig({
  appName: 'RainbowKit demo',
  projectId: 'projectId',
  chains: customChains,
  connectors: connectors,
});

const queryClient = new QueryClient();
const App = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ActiveWeb3Provider>
            <BrowserRouter>
              <div className='app-body md:max-h-screen md:h-screen transition duration-500 relative flex'>
                <Header />
                <Routes>
                  <Route path='/dashboard' element={<Dashboard />} />
                  <Route path='/explore' element={<Explorer />} />
                  <Route path='/contract/:address' element={<Detail />} />
                  <Route path='/claim' element={<Claim />} />
                  <Route path='/create' element={<CreatePage />} />
                  <Route
                    path='/'
                    element={<Navigate to='/dashboard' replace />}
                  />
                </Routes>
                <Footer />
              </div>
            </BrowserRouter>
          </ActiveWeb3Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;
