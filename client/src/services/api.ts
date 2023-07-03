import axios from 'axios';
import { parseCookies } from 'nookies';

const api = axios.create({ baseURL: 'http://localhost:8000' });




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