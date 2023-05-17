// export const API_URL = 'http://localhost:8080/api';
export const API_URL =
  process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8080/api';
