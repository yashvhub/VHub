import { REQUEST_RESOURCES, RECEIVE_RESOURCES, INVALIDATE_RESOURCES } from "../action-creators/actions";

function blankState() {
    return {
        isFetching: false,
        didInvalidate: false,
        items: []
    };
}

function requestResources(state, action) {
    return {
        ...state,
        didInvalidate: false,
        isFetching: true
    }
}

function receiveResources(state, action) {
    return {
        ...state,
        isFetching: false,
        items: action.resources.resources,
        lastUpdated: Date.now()
    }
}

function invalidateResources(state, action) {
    return {
        ...state,
        isFetching: false,
        didInvalidate: true
    }
}

export default function(state = blankState(), action) {
    const actionHandlers = {
        [REQUEST_RESOURCES]: requestResources,
        [RECEIVE_RESOURCES]: receiveResources,
        [INVALIDATE_RESOURCES]: invalidateResources
    }

    const reducer = actionHandlers[action.type];

    return reducer ? reducer(state, action) : state;
}