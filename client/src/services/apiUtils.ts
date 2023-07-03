import axios from 'axios';
import { parseCookies } from 'nookies';
const api = axios.create({ baseURL: 'http://localhost:8000' });


export const getApiClient = (ctx: any) => {
    const { 'kanban-token': token } = parseCookies(ctx);


    api.interceptors.request.use(
        config => {
            config.headers['authorization'] = token;
            return config;
        },
        (error => {
            return Promise.reject(error);
        })
    );


    return api;
}