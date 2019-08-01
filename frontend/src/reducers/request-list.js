import {REQUEST_LIST_DATA} from "../action-creators/actions";

function blankState(){
    return [];
}
function fetchRequestListsData(state, action) {
    return action.apiUrl;
}

export default function (state = blankState(), action) {
    const actionHandlers = {
        [REQUEST_LIST_DATA]: fetchRequestListsData
    };

    const reducer = actionHandlers[action.type];

    return reducer ?
        reducer(state, action) :
        state;
}