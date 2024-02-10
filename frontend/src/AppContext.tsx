import React, { createContext, useState, ReactNode } from 'react';

type AppProviderProps = {
    children: ReactNode;
  };

  interface AppContextType {
    localStorageValue: string;
    setLocalStorageValue: (value: string) => void;
}

export const AppContext = createContext<AppContextType>({
    localStorageValue: '',
    setLocalStorageValue: () => {}
  });

export const AppProvider = ({ children }: AppProviderProps) => {
  const [localStorageValue, setLocalStorageValue] = useState(localStorage.getItem('myValue') || '');

  return (
    <AppContext.Provider value={{ localStorageValue, setLocalStorageValue }}>
      {children}
    </AppContext.Provider>
  );
};