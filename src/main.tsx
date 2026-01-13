import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { polygon } from 'wagmi/chains';
import { SpeedInsights } from '@vercel/speed-insights/react';
import App from './App';
import './index.css';
import '@rainbow-me/rainbowkit/styles.css';

// Configure wagmi with RainbowKit
const config = getDefaultConfig({
  appName: 'RicoBenzia',
  projectId: 'c243ecd896d58031042571b5da6987e5', // WalletConnect Cloud Project ID
  chains: [polygon],
  ssr: false,
});

// Create a react-query client
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider 
            theme={darkTheme({
              accentColor: '#7CFC00',
              accentColorForeground: '#0D0D2B',
              borderRadius: 'large',
            })}
          >
            <App />
            <SpeedInsights />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </BrowserRouter>
  </StrictMode>
);
