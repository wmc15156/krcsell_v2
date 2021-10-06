import { APICore, AUTH_SESSION_KEY } from '../../helpers/api/apiCore';
import axios from 'axios';

const api = new APICore();

export const getAccountInfo = async () => {
    const baseUrl = '/account/authenticated';
    let token = localStorage.getItem(AUTH_SESSION_KEY);
    if(token) {
        token = token.slice(1, token.length - 1);
        axios.defaults.headers.common['Authentication'] = token;
    }
    return await axios.get(`${baseUrl}`).then((resp) => resp.data.data);
};
