import axios from 'axios';

const axiosInsatnce = axios.create({
  baseURL: 'https://ecommerce-api.bridgeon.in',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInsatnce;
