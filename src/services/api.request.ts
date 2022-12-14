import axios, { Method } from 'axios';
import { apiConfig, ApiConfigInterface } from '../config/apiConfig';

export function getBaseApiUrl(config: ApiConfigInterface = apiConfig) {
    return `${config.protocol}://${config.host}/${config.service}`;
}

export function callAPI(url: string, method: Method, data?: any, headers?: any) {
    return axios({
        url,
        method,
        data,
        headers
    });
}
