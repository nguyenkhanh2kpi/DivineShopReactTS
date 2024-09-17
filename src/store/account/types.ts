import { type } from "os";

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const LOG_OUT = 'LOG_OUT'

export interface AuthenticateUser {
    pk: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}

interface LoginRequest {
    type: typeof LOGIN_REQUEST;
    payload: {
        username: string;
        password: string;
    };
}

interface LoginSuccess {
    type: typeof LOGIN_SUCCESS;
    payload: {
        user: AuthenticateUser;
        access_token: string;
    }
}

interface LoginFailure {
    type: typeof LOGIN_FAILURE;
    payload: {
        error: string;
    }
}

interface Logout {
    type: typeof LOG_OUT;
}


export interface AccountState {
    user: AuthenticateUser | null;
    loading: boolean;
    error: string | null;
    token: string | null;
}


export type AccountActionType =
    | LoginRequest
    | LoginSuccess
    | LoginFailure
    | Logout;