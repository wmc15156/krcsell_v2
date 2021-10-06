// @flow
import { AuthActionTypes } from './constants';

type AuthAction = { type: string, payload: {} | string };

// common success
export const authApiResponseSuccess = (actionType: string, data: any): AuthAction => ({
    type: AuthActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});
// common error
export const authApiResponseError = (actionType: string, error: string): AuthAction => ({
    type: AuthActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const loginUser = (id: string, password: string): AuthAction => ({
    type: AuthActionTypes.LOGIN_USER,
    payload: { id, password },
});

export const logoutUser = (): AuthAction => ({
    type: AuthActionTypes.LOGOUT_USER,
    payload: {},
});

export const signupUser = (id, password, name, bank, banknum, contact, telegram): AuthAction => ({
    type: AuthActionTypes.SIGNUP_USER,
    payload: { id, password, name, bank, banknum, contact, telegram },
});

export const forgotPassword = (username: string): AuthAction => ({
    type: AuthActionTypes.FORGOT_PASSWORD,
    payload: { username },
});

export const forgotPasswordChange = (username: string): AuthAction => ({
    type: AuthActionTypes.FORGOT_PASSWORD_CHANGE,
    payload: { username },
});

export const resetAuth = (): AuthAction => ({
    type: AuthActionTypes.RESET,
    payload: {},
});
