import axios from 'axios';
import { parseCookies } from 'nookies';

const api = axios.create({ baseURL: process.env.API_URL });




api.interceptors.request.use(
    config => {
        const { 'kanban-token': token } = parseCookies();
        config.headers['authorization'] = token;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


export { api };