import { userService } from "../../services/user.service";
import {
    AccountActionType,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOG_OUT,
} from "./types";
import { Dispatch } from "react";
import {history} from '../../helpers/history'
import { useNavigate } from "react-router";

export const login = (username: string, password: string, from: string) => {
    return (dispatch: Dispatch<AccountActionType>) => {
        dispatch({
            type: LOGIN_REQUEST,
            payload: {
                username: username,
                password: password,
            },
        });
        userService.login(username, password).then(
            (res) => {
                console.log(res)
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res,
                });
                history.push("/home")
            },
            (error) => {
                dispatch({
                    type: LOGIN_FAILURE,
                    payload: { error: error.toString() },
                });
            }
        );
    };
};



export const logout = ():AccountActionType => {
    return {
        type: LOG_OUT
    };
}

