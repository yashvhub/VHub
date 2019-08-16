import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_FAILED } from "../action-creators/actions";

function blankState(){
    return {
        isPending: false,
        authenticated: false
    };
}


function loginPending(state, action) {
    return {
        ...state,
        isPending: true
    }
}

function loginSuccess(state, action) {
    return {
        ...state,
        isPending: false,
        authenticated: true,
        status: undefined,
        lastUpdated: Date.now()
    }
}

function loginFailed(state, action) {
    return {
        ...state,
        isPending: false,
        status: action.status
    }
}


export default function(state = blankState(), action) {
    const actionHandlers = {
        [LOGIN_PENDING]: loginPending,
        [LOGIN_SUCCESS]: loginSuccess,
        [LOGIN_FAILED]: loginFailed
    }

    const reducer = actionHandlers[action.type];

    return reducer ? reducer(state, action) : state;
}