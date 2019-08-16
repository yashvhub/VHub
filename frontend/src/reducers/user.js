import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_FAILED } from "../action-creators/actions";

function blankState(){
    return{};
}

function loginSuccess(state, action) {
    const {company, email, firstName, id, lastName, title, location, phoneNumber, roles, vedorUsers} = action.user.data
    return {
        ...state,
        company,
        email,
        firstName,
        id,
        lastName,
        location,
        phoneNumber,
        roles,
        title,
        vedorUsers
    }
}

export default function(state = blankState(), action) {
    const actionHandlers = {
        [LOGIN_SUCCESS]: loginSuccess,
    }

    const reducer = actionHandlers[action.type];

    return reducer ? reducer(state, action) : state;
}