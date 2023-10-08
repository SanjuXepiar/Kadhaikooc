import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authPage, setAuthPage] = useState(false);

  const slideClose = () => {
    setAuthPage(false);
  };
  const slideOpen = () => {
    setAuthPage(true);
  };
  return (
    <AuthContext.Provider value={{ authPage, slideOpen, slideClose }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
