import axios from 'axios';
import { Company } from '../features/companies/types';

// const API_URL = 'http://localhost:3001/companies'; // For mock JSON Server
const API_URL = 'https://companies-directory-backend-4h7s.onrender.com/api/companiess'; // For Node.js backend

export const fetchCompaniesFromApi = async (): Promise<Company[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // For JSON Server, it's response.data.companies if wrapped
  } catch (error) {
    throw new Error('API request failed');
  }
};