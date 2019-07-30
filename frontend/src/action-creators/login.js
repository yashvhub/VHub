const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILED = 'LOGIN_FAILED';
const LOGIN_PENDING = 'LOGIN_PENDING';

export function loginSuccess(isLoginSuccess){
    return {
        type: LOGIN_SUCCESS,
        isLoginSuccess
    }
}

export function loginFailed(isLoginFailed){
    return {
        type: LOGIN_FAILED,
        isLoginFailed
    }
}

export function loginPending(isLoginPending){
    return {
        type: LOGIN_PENDING,
        isLoginPending
    }
}