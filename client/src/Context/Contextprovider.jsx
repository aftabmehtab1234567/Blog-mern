import React, { createContext, useContext, useState, useEffect } from 'react';


import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [image, setImage] = useState(null);

  return (
    <AuthContext.Provider value={{ token, setToken,image, setImage }}>
      {children}
    </AuthContext.Provider>
  );
};
