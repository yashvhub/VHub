import {LOGIN_SUCCESS, LOGIN_FAILED, LOGIN_PENDING, LOGOUT_SUCCESS, LOGOUT_FAILED, LOGOUT_PENDING} from './actions';
import Users from '../API/users';

export function loginSuccess(user, password){
    // console.log(user)
    sessionStorage.setItem('token', user.data.id);
    sessionStorage.setItem('email', user.data.email);
    sessionStorage.setItem('password', password);
    return {
        type: LOGIN_SUCCESS,
        user
    }
}

export function loginFailed(status){
    return {
        type: LOGIN_FAILED,
        status
    }
}

export function loginPending(){
    return {
        type: LOGIN_PENDING,
    }
}

export function logoutSuccess(){
    return {
        type: LOGOUT_SUCCESS
    }
}

export function logoutFailed(status){
    return {
        type: LOGOUT_FAILED,
        status
    }
}

export function logoutPending(){
    return {
        type: LOGOUT_PENDING,
    }
}

export function login(email, password) {
    console.log('attemped login', email, password)
    return async function(dispatch) {
        dispatch(loginPending());
        try {
            const [response, status] = await Users.login(email, password);
            if(response) {
                console.log(response)
                dispatch(loginSuccess(response, password));
            } else {
                dispatch(loginFailed(status));
            }
        } catch (e) {
            dispatch(loginFailed({status: 'Something went wrong while logging in. Try again later.'}))
        }
    }
}