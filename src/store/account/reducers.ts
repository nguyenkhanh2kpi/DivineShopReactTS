
import { AccountState , AccountActionType, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOG_OUT} from "./types"

const initialState : AccountState = {
    user : null,
    loading : false,
    error : null,
    token : null  
}

const accountReducer = (
    state: AccountState = initialState,
    action: AccountActionType 
) : AccountState => {
    switch(action.type) {
        case LOGIN_REQUEST : {
            return {...state, 
                loading: true,
                error: null
            };
        }
        case LOGIN_SUCCESS : {
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                token: action.payload.access_token,
                error: null
            };
        }
        case LOGIN_FAILURE: {
            return {
                ...state,
                loading: false,
                token: null,
                error: action.payload.error,
            };
        }
        case LOG_OUT: {
            return {
                ...state,
                user: null,
                token: null,
                error: null 
            };
        }
        default:
            return state;
    }
};

export {accountReducer}