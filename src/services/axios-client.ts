import axios from 'axios';
import Config from 'react-native-config';
// import {useAccessTokenStore} from '../hooks/access-token';

const baseURL = 'http://127.0.0.1:5000';

console.log('#### Config.SERVER_BASE_URL', Config.SERVER_BASE_URL);
console.log('#### baseURL', baseURL);

const axiosClient = axios.create({
  baseURL,
  timeout: 5000,
  headers: {'x-access-token': 'taskify'},
});

axiosClient.interceptors.request.use(
  async config => {
    // const accessToken = useAccessTokenStore.getState().accessToken;

    // const auth = accessToken ? `Bearer ${accessToken}` : '';
    // config.headers.setAuthorization(auth);

    return config;
  },
  error => Promise.reject(error),
);

export default axiosClient;
