import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_FAILED } from "../action-creators/actions";

function blankState(){
    return {
        isPending: false
    };
}


function loginPending(state, action) {
    console.log(`loginPending()`);
    return {
        ...state,
        isPending: true
    }
}

function loginSuccess(state, action) {
    console.log(`loginSuccess()`);
    return {
        ...state,
        isPending: false,
        status: undefined,
        user: action.user.data,
        lastUpdated: Date.now()
    }
}

function loginFailed(state, action) {
    console.log(`loginFailed()`);
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