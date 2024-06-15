import axiosClient from './axios-client';
import {authRoutes} from './route-constants';

export const handleRegister = async () =>
  (await axiosClient.get(authRoutes.health)).data;
