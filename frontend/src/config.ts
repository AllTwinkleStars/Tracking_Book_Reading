const urls = {
  SERVER_URL: process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://'
};

export const BASE_URL = urls.SERVER_URL;