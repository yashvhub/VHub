import {REQUEST_SKILLS, RECEIVE_SKILLS, HAS_ERROR_SKILLS} from "../action-creators/actions";


function blankState(){
    return {
        isFetching: false,
        hasError: false,
        skills: [],
    };
}

function requestSkills(state, action){
    return {
        ...state,
        hasError: false,
        isFetching: true
    }
}

function receiveSkills(state, action){
    return {
        ...state,
        isFetching: false,
        skills: action.skills,
    }
}

function hasErrorSkills(state, action) {
    return {
        ...state,
        isFetching: false,
        hasError: true
    }
}

export default function (state = blankState(), action) {
    const actionHandlers = {
        [REQUEST_SKILLS]: requestSkills,
        [RECEIVE_SKILLS]: receiveSkills,
        [HAS_ERROR_SKILLS]: hasErrorSkills
    };

    const reducer = actionHandlers[action.type];

    return reducer ?
        reducer(state, action) :
        state;
}