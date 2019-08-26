import RequestEnvelopes from "../API/request-envelopes";
import RequestComments from "../API/request-comments";
import { REQUEST_REQUEST_ENVELOPE, RECEIVE_REQUEST_ENVELOPE, RECEIVE_PROPOSAL_REQUEST_ENVELOPE, INVALIDATE_REQUEST_ENVELOPE } from "./actions";

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

export function receiveProposalRequestEnvelope(proposalRequestEnvelope) {
    return {
        type: RECEIVE_PROPOSAL_REQUEST_ENVELOPE,
        proposalRequestEnvelope
    }
}

export function invalidateRequestEnvelope() {
    return {
        type: INVALIDATE_REQUEST_ENVELOPE
    }
}


export function fetchRequestEnvelope(id, projection = "FullRequestEnvelope") {
    return async function (dispatch, getState) {
        try {
            dispatch(requestRequestEnvelope())
            const [response, status] = await RequestEnvelopes.get(id, { params: { projection } });
            if (response && !getState().requestEnvelope.didInvalidate) {
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

export function fetchProposalRequestEnvelope(id, projection) {
    return async function (dispatch, getState) {
        try {
            dispatch(requestRequestEnvelope())
            const [response, status] = await RequestEnvelopes.get(id, { params: { projection } });
            if (response && !getState().requestEnvelope.didInvalidate) {
                dispatch(receiveProposalRequestEnvelope(response.data));
            } else {
                dispatch(invalidateRequestEnvelope());
            }
        } catch (e) {
            dispatch(invalidateRequestEnvelope())
            console.error(e);
        }
    }
}

export function approveRequestEnvelope(requestEnvelope) {
    return async function (dispatch, getState) {
        try {
            dispatch(requestRequestEnvelope());
            const [response, status] = await RequestEnvelopes.approvePatch(requestEnvelope, requestEnvelope.id, {});
            if (response && !getState().requestEnvelope.didInvalidate) {
                dispatch(receiveRequestEnvelope(response.data));
            } else {
                dispatch(invalidateRequestEnvelope())
            }
        } catch (e) {
            dispatch(invalidateRequestEnvelope());
            console.error(e);
        }
    }
}


export function postComment(comment, requestEnvelopeId) {

    const commentObject = {
        comment: comment,
        requestId: requestEnvelopeId,
    }

    return async function (dispatch, getState) {
        try {
            dispatch(requestRequestEnvelope());
            const [response, status] = await RequestComments.post(commentObject, {});
            if (response && !getState().requestEnvelope.didInvalidate) {
                dispatch(receiveRequestEnvelope(response.data));
            } else {
                dispatch(invalidateRequestEnvelope())
            }
        } catch (e) {
            dispatch(invalidateRequestEnvelope());
            console.error(e);
        }
    }
}
