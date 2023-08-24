/**
 * axios setup to use mock service
 */

import axios from 'axios';
import { BASE_URL } from '../config';

const axiosServices = axios.create();

axiosServices.interceptors.request.use(
  (config: any) => {
    config.baseURL = BASE_URL;
    // const state = store.getState() as any;
    // const accessToken = state.auth.token;
    // if (accessToken) {
    //   config.headers.authorization = accessToken;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosServices;
