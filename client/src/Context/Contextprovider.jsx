import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [imageData, setImageData] = useState(null);

  const login = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userData);

      if (response.data && response.data.token) {
        setToken(response.data.token);

        // Check if there is image data in the response
        if (response.data.image) {
          setImageData(response.data.image);
        }
      }

      return response;
    } catch (error) {
      console.error('Error while logging in:', error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    // Clear the token from wherever you store it (e.g., cookies, local storage, etc.)
  };

  // Fetch image data when the component mounts or when the token changes
  useEffect(() => {
    if (token) {
      // Make an API call to fetch image data and update 'imageData'
      axios.get(`${API_URL}/fetch-image`).then((response) => {
        if (response.data && response.data.image) {
          setImageData(response.data.image);
        }
      });
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, login, logout, imageData }}>
      {children}
    </AuthContext.Provider>
  );
};
