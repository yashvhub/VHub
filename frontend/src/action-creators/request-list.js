import RequestEnvelopes from '../API/request-envelopes'
import {REQUEST_REQUEST_LIST_DATA, RECEIVE_REQUEST_LIST_DATA, INVALIDATE_REQUEST_LIST_DATA} from "./actions";

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


export function fetchRequestEnvelopeList(name, page={}) {
    const config = {
        params: {
            projection: "ListRequestEnvelope",
            ...page
        }
    };
    return async function(dispatch,getState) {
        try {
            dispatch(requestRequestListsData())
            let [response, status];
            if(name) {
                [response, status] = await RequestEnvelopes.getByRequesterName(name, config)
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
