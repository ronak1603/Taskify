import * as R from 'ramda';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {z} from 'zod';

export const isNilOrEmpty = R.anyPass([R.isNil, R.isEmpty]);
export const isPresent = R.complement(isNilOrEmpty);
export const removeEmptyKeys = (data: any): any =>
  R.reject((value: any) => isNilOrEmpty(value), data || {});
export const removeUndefinedKeys = (data: any): any =>
  R.reject(R.isNil, data || {});
export const wait = (ms: number) =>
  new Promise(resolve => {
    setTimeout(() => resolve('Resolved'), ms);
  });

export const handleError = (
  error: Error,
  {showToast}: {showToast: boolean} = {showToast: true},
) => {
  let message = 'Something went wrong.';
  let code = 'SomethingWentWrong';

  if (axios.isAxiosError(error)) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (typeof error.response.data === 'string') {
        message = error.response.data;
        code = error.response.data;
      } else if (typeof error.response.data === 'object') {
        if (typeof error.response.data.message === 'string') {
          message = error.response.data.message;
        }
        if (typeof error.response.data.code === 'string') {
          code = error.response.data.code;
        }
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      if (typeof error.request === 'string') {
        message = error.request;
      } else if (typeof error.request === 'object') {
        if (typeof error.request._response === 'string') {
          message = error.request._response;
        } else if (typeof error.request.response === 'string') {
          message = error.request.response;
        }
      }

      code = 'ClientException';
    } else {
      // Something happened in setting up the request that triggered an Error
      if (typeof error.message === 'string') {
        message = error.message;
      }
    }

    // Turn on for debugging
    // console.error('Error config -', error.config);
  } else {
    if (typeof error.message === 'string') {
      message = error.message;
    }
  }

  console.error({message, code});

  if (showToast) {
    Toast.show({
      type: 'error',
      text1: message,
    });
  }

  return {
    message,
    code,
  };
};

export const isEmail = (str: string): boolean =>
  z.string().email().safeParse(str).success;

export const convertToTitleCase = (word: string) => {
  if (!word || typeof word !== 'string') {
    return '';
  }

  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const objectToURLSearchParams = (
  payload: {[key: string]: string | number | boolean | undefined} | undefined,
): string => {
  if (!payload) {
    return '';
  }

  const params = new URLSearchParams();

  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined) {
      params.append(key, value.toString());
    }
  });

  return '?' + params.toString();
};

export function generateUrlPath(
  pathTemplate: string,
  pathVariables: {[key: string]: string},
): string {
  let result = pathTemplate;

  for (const key in pathVariables) {
    result = result.replace(`:${key}`, pathVariables[key]);
  }

  return result;
}

export const convertExpiresInToExpiresAt = (expiresIn: string): number => {
  if (!expiresIn) {
    throw new Error('expiresIn is required');
  }

  const expiresInRegex = /^(\d+)([smhd])$/;
  const matches = expiresIn.match(expiresInRegex);

  if (!matches) {
    throw new Error('Invalid expiresIn format');
  }

  const duration = parseInt(matches[1], 10);
  const unit = matches[2];

  let multiplier = 1;
  switch (unit) {
    case 's':
      multiplier = 1000;
      break;
    case 'm':
      multiplier = 1000 * 60;
      break;
    case 'h':
      multiplier = 1000 * 60 * 60;
      break;
    case 'd':
      multiplier = 1000 * 60 * 60 * 24;
      break;
    default:
      throw new Error('Invalid expiresIn unit');
  }

  const currentTime = Date.now();
  const expiresAt = currentTime + duration * multiplier;

  return expiresAt;
};

export const formatRelativeDate = (
  isoDate: string,
  includeAgo: boolean = false,
): string => {
  const now = new Date();
  const pastDate = new Date(isoDate);
  const elapsed = now.getTime() - pastDate.getTime();

  const timeUnits = [
    {unit: 'year', duration: 365 * 24 * 60 * 60 * 1000},
    {unit: 'month', duration: 30 * 24 * 60 * 60 * 1000},
    {unit: 'day', duration: 24 * 60 * 60 * 1000},
    {unit: 'hour', duration: 60 * 60 * 1000},
    {unit: 'minute', duration: 60 * 1000},
  ];

  for (const unit of timeUnits) {
    if (elapsed >= unit.duration) {
      const count = Math.round(elapsed / unit.duration);
      return `${count} ${unit.unit}${count === 1 ? '' : 's'}${
        includeAgo ? ' ago' : ''
      }`;
    }
  }

  return 'just now';
};

export function formatReadableDate(isoDate: string): string {
  const date = new Date(isoDate);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const day = date.getDate(); // Get the day as a number (1-31)
  const monthIndex = date.getMonth(); // Get the month as a number (0-11)
  const year = date.getFullYear(); // Get the year (4-digit year)
  const hour = date.getHours(); // Get the hour (0-23)
  const minute = date.getMinutes(); // Get the minute (0-59)

  // Formatting the hour in 12-hour format and determining the am/pm suffix
  const hour12 = hour % 12 || 12; // Convert 0-hour to 12 for 12-hour clock
  const amPm = hour < 12 ? 'am' : 'pm';

  // Ensuring minutes are two digits
  const minuteFormatted = minute < 10 ? `0${minute}` : minute;

  // Assembling the formatted date string
  return `${day} ${months[monthIndex]} ${year} ${hour12}:${minuteFormatted} ${amPm}`;
}

export const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};
