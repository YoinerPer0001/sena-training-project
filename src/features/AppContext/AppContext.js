import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pageResetPassword, setPageResetPassword] = useState(1);

  return (
    <AppContext.Provider value={{ searchTerm, setSearchTerm, pageResetPassword, setPageResetPassword }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
