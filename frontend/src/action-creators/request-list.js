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


export function fetchRequestEnvelopeList() {
    return async function(dispatch,getState) {
        try {
            dispatch(requestRequestListsData())
            const [response, status] = await RequestEnvelopes.getAll({params: {projection:"ListRequestEnvelope"}});
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
