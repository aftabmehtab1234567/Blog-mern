import axios from 'axios';

const API_URL = `http://localhost:8000`;



export const signup = async (data) => {
  const formData = new FormData();

  // Assuming "data" contains form fields and files
  formData.append('email', data.email);
  formData.append('file', data.file);
  formData.append('username', data.username);
  formData.append('password', data.password);

  try {
    const response = await axios.post(`${API_URL}/signup`, formData, );
    
    return response.data;
  } catch (error) {
    console.error('Error while calling API:', error);
    throw error;
  }
};
export const login = async (userdata) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userdata);
     
      return response.data;
    } catch (error) {
      console.error('Error while logging in:', error);
      throw error;
    }
  };
