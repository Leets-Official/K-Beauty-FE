import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ?? '';
const API_PREFIX = '/api';
const API_TIMEOUT = 10_000;
const SESSION_TOKEN_HEADER = 'X-Session-Token';
const API_CLIENT_BASE_URL = `${API_BASE_URL}${API_PREFIX}`;
let sessionToken: string | null = null;

const apiClient = axios.create({
  baseURL: API_CLIENT_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

function getSessionToken() {
  return sessionToken;
}

function setSessionToken(nextSessionToken: string) {
  sessionToken = nextSessionToken;
}

function clearSessionToken() {
  sessionToken = null;
}

apiClient.interceptors.request.use((config) => {
  const sessionToken = getSessionToken();

  if (sessionToken) {
    config.headers.set(SESSION_TOKEN_HEADER, sessionToken);
  }

  return config;
});

export { API_PREFIX, apiClient, clearSessionToken, getSessionToken, setSessionToken };
