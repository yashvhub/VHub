import RequestEnvelopes from '../API/request-envelopes'
import {
    REQUEST_REQUEST_LIST_DATA,
    RECEIVE_REQUEST_LIST_DATA,
    INVALIDATE_REQUEST_LIST_DATA,
    CLOSE_REQUEST
} from "./actions";

export function requestRequestListsData() {
    return {
        type: REQUEST_REQUEST_LIST_DATA
    }
}

export function receiveRequestListData(requestListData) {
    return {
        type: RECEIVE_REQUEST_LIST_DATA,
        requestListData
    }
}

export function invalidateRequestListData() {
    return {
        type: INVALIDATE_REQUEST_LIST_DATA
    }
}

export function fetchRequestEnvelopeList(name, page={}, toggle) {
    return async function(dispatch,getState) {
        const config = {
            params: {
                projection: "ListRequestEnvelope",
                size: getState().requestLists.page.size,
                ...page,
            }
        };
        if(toggle) {
            config.params.status = 'CLOSED'
        }
        try {
            dispatch(requestRequestListsData())
            let response, status;
            if(toggle && name) {
                [response, status] = await RequestEnvelopes.getByNameToggled(name, config)
            } else if(toggle) {
                [response, status] = await RequestEnvelopes.getAllToggled(config)
            } else if(name) {
                [response, status] = await RequestEnvelopes.getByName(name, config)
            } else {
                [response, status] = await RequestEnvelopes.getAll(config)
            }
            if(response && !getState().requestLists.didInvalidate){
                dispatch(receiveRequestListData(response));
            } else {
                dispatch(invalidateRequestListData());
            }
        } catch (e) {
            dispatch(invalidateRequestListData())
            console.error(e);
        }
    }
}

export function closeRequest(id) {
    return async () => {
        try {
            await RequestEnvelopes.closeRequestPatch(id)
        } catch (e) {
            console.error(e)
        }
    }
}

export function reOpenRequest(id) {
    return async () => {
        try {
            await RequestEnvelopes.reOpenRequestPatch(id)
        } catch (e) {
            console.error(e)
        }
    }
}