import { REQUEST_REQUEST_ENVELOPE, RECEIVE_REQUEST_ENVELOPE, INVALIDATE_REQUEST_ENVELOPE } from "../action-creators/actions";

function blankState(){
    return {
        isFetching: false,
        didInvalidate: false,
    };
}


function requestRequestEnvelope(state, action) {
    return {
        ...state,
        didInvalidate: false,
        isFetching: true
    }
}

function receiveRequestEnvelope(state, action) {
    // console.log("received request envelope: " , action);
    return {
        ...state,
        isFetching: false,
        item: action.requestEnvelope,
        lastUpdated: Date.now()
    }
}

function invalidateRequestEnvelope(state, action) {
    return {
        ...state,
        isFetching: false,
        didInvalidate: true
    }
}


export default function(state = blankState(), action) {
    const actionHandlers = {
        [REQUEST_REQUEST_ENVELOPE]: requestRequestEnvelope,
        [RECEIVE_REQUEST_ENVELOPE]: receiveRequestEnvelope,
        [INVALIDATE_REQUEST_ENVELOPE]: invalidateRequestEnvelope
    }

    const reducer = actionHandlers[action.type];

    return reducer ? reducer(state, action) : state;
}