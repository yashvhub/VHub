import {REQUEST_REQUEST_LIST_DATA, RECEIVE_REQUEST_LIST_DATA, INVALIDATE_REQUEST_LIST_DATA} from "../action-creators/actions";

function blankState(){
    return {
        isFetching: false,
        didInvalidate: false,
        data: [],
    };
}

function requestRequestListsData(state, action) {
    return {
        ...state,
        didInvalidate: false,
        isFetching: true
    }
}

function receiveRequestListData(state, action) {
    return {
        ...state,
        isFetching: false,
        data: action.requestListData.requestEnvelopes,
        lastUpdated: Date.now()
    }
}

function invalidateRequestListData(state, action) {
    return {
        ...state,
        isFetching: false,
        didInvalidate: true
    }
}

export default function (state = blankState(), action) {
    const actionHandlers = {
        [REQUEST_REQUEST_LIST_DATA]: requestRequestListsData,
        [RECEIVE_REQUEST_LIST_DATA]: receiveRequestListData,
        [INVALIDATE_REQUEST_LIST_DATA]: invalidateRequestListData,
    };

    const reducer = actionHandlers[action.type];

    return reducer ?
        reducer(state, action) :
        state;
}