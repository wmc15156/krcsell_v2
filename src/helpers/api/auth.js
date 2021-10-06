// @flow
import { APICore } from './apiCore';

const api = new APICore();

// account
function login(params: any): any {
    const baseUrl = '/account/signin';
    console.log('lkogib12312312');
    return api.create(baseUrl, { type: 'buy', ...params }); // modify point 2
}

function logout(): any {
    const baseUrl = '/logout/';
    return api.create(`${baseUrl}`, {});
}

function signup(params: any): any {
    const baseUrl = '/account/signup';
    return api.create(`${baseUrl}`, params);
}

function forgotPassword(params: any): any {
    const baseUrl = '/forget-password/';
    return api.create(`${baseUrl}`, params);
}

function forgotPasswordConfirm(params: any): any {
    const baseUrl = '/password/reset/confirm/';
    return api.create(`${baseUrl}`, params);
}

export { login, logout, signup, forgotPassword, forgotPasswordConfirm };
