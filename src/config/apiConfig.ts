export interface ApiConfigInterface {
    protocol: string;
    host: string;
    service: string
}

export const apiConfig: ApiConfigInterface = {
    protocol: 'http',
    host: 'localhost:4000',
    service: 'credilinq'
};