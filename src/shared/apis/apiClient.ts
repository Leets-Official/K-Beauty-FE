import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_TIMEOUT = 10_000;
const SESSION_TOKEN_STORAGE_KEY = 'k-beauty-session-token';
const SESSION_TOKEN_HEADER = 'X-Session-Token';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

function getSessionToken() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.sessionStorage.getItem(SESSION_TOKEN_STORAGE_KEY);
}

function setSessionToken(sessionToken: string) {
  window.sessionStorage.setItem(SESSION_TOKEN_STORAGE_KEY, sessionToken);
}

function clearSessionToken() {
  window.sessionStorage.removeItem(SESSION_TOKEN_STORAGE_KEY);
}

apiClient.interceptors.request.use((config) => {
  const sessionToken = getSessionToken();

  if (sessionToken) {
    config.headers.set(SESSION_TOKEN_HEADER, sessionToken);
  }

  return config;
});

export { apiClient, clearSessionToken, getSessionToken, setSessionToken };
