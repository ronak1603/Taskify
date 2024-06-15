import {accessTokenKey} from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';

interface AccessTokenState {
  accessToken: string | null;
  isLoading: boolean;
  fetch: () => Promise<void>;
  setAccessToken: (payload: AccessTokenPayload) => Promise<void>;
  removeToken: () => Promise<void>;
}

interface AccessTokenPayload {
  accessToken: string;
  expiresAt: number;
}

export const useAccessTokenStore = create<AccessTokenState>(set => ({
  accessToken: null,
  isLoading: true,
  fetch: async () => {
    const accessTokenString = await AsyncStorage.getItem(accessTokenKey);

    const accessTokenPayload: AccessTokenPayload | null = accessTokenString
      ? JSON.parse(accessTokenString)
      : null;

    if (!accessTokenPayload) {
      return set({
        accessToken: null,
        isLoading: false,
      });
    }

    if (accessTokenPayload.expiresAt < Date.now()) {
      await Promise.all([AsyncStorage.removeItem(accessTokenKey)]);

      return set({
        accessToken: null,
        isLoading: false,
      });
    }

    return set({
      accessToken: accessTokenPayload.accessToken || null,
      isLoading: false,
    });
  },
  setAccessToken: async (payload: AccessTokenPayload) => {
    set(() => ({accessToken: payload.accessToken}));
    await AsyncStorage.setItem(accessTokenKey, JSON.stringify(payload));
  },
  removeToken: async () => {
    set(() => ({accessToken: null}));
    await AsyncStorage.removeItem(accessTokenKey);
  },
}));
