import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { TxStreetContainer, WalletContainer } from './containers/TxStreetContainer';
import { defaultTheme } from './theme';
import { AppView } from './views';
import './App.css';

function App() {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={defaultTheme}>
      <QueryClientProvider client={queryClient}>
        <WalletContainer.Provider>
          <TxStreetContainer.Provider>
            <BrowserRouter>
              <AppView />
            </BrowserRouter>
          </TxStreetContainer.Provider>
        </WalletContainer.Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
