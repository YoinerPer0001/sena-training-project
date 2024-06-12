'use client'

import { NextUIProvider } from '@nextui-org/react'
import { Provider } from 'react-redux'
import { PrimeReactProvider } from 'primereact/api';
import { AppProvider } from '../features/AppContext/AppContext';
import { store } from './store';

export function Providers({ children }) {
  const value = {
    appendTo: 'self',
  };
  return (
    <Provider store={store}>
      <PrimeReactProvider>
        <NextUIProvider>
          <AppProvider>
            {children}
          </AppProvider>
        </NextUIProvider>
      </PrimeReactProvider>
    </Provider>
  )
}