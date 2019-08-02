import RequestEnvelopes from "../API/request-envelopes";
import { REQUEST_REQUEST_ENVELOPE, RECEIVE_REQUEST_ENVELOPE, INVALIDATE_REQUEST_ENVELOPE } from "./actions";

export function requestRequestEnvelope() {
    return {
        type: REQUEST_REQUEST_ENVELOPE
    }
}

export function receiveRequestEnvelope(requestEnvelope) {
    return {
        type: RECEIVE_REQUEST_ENVELOPE,
        requestEnvelope
    }
}

export function invalidateRequestEnvelope() {
    return {
        type: INVALIDATE_REQUEST_ENVELOPE
    }
}


export function fetchRequestEnvelope(id) {
    return async function(dispatch,getState) {
        try {
            dispatch(requestRequestEnvelope())
            const [response, status] = await RequestEnvelopes.get(id, {params: {projection:"FullRequestEnvelope"}});
            if(response && !getState().requestEnvelope.didInvalidate){
                dispatch(receiveRequestEnvelope(response.data));
            } else {
                dispatch(invalidateRequestEnvelope());
            }
        } catch (e) {
            dispatch(invalidateRequestEnvelope())
            console.error(e);
        }
    }
}
