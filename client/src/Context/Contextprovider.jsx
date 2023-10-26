import React, { createContext, Usercontext, useState, useEffect } from 'react';
import Usercontext from './context';
export const AuthProvider = ({ children }) => {
  // A function to read cookies by name
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
    return null;
  };

  const [token, setToken] = useState(getCookie('token') || null);
  const [imageData, setImageData] = useState(null);
   const login = (newToken) => {
    setToken(newToken);
    document.cookie = `token=${newToken}; path=/`;
  };

  const logout = () => {
    setToken(null);
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
  };

  useEffect(() => {
    // Add any code you need to fetch image data here, if necessary.
    if (token) {
      // Fetch image data here using the token
      fetchImage(userId, setImageData);
    }
  }, [token]);

  return (
    <Usercontext.Provider value={{ token, login, logout, imageData, setImageData }}>
      {children}
    </Usercontext.Provider>
  );
};
