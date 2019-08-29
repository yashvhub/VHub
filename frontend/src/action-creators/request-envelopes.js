import RequestEnvelopes from "../API/request-envelopes";
import RequestComments from "../API/request-comments";
import Users from "../API/users";
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

export function saveApproveChanges(requestEnvelope, approvers, interviewers){

    const interviewersUriList = interviewers.map(interviewer =>
        `${Users.getPath()}/${interviewer}`)

    const approversUriList = approvers.map(approver =>
        `${Users.getPath()}/${approver}`)

        return async function (dispatch, getState) {
            try {
                //update interviewers and approvers here
                await RequestEnvelopes.updateInterviewersAndApprovers(requestEnvelope.id,interviewersUriList,approversUriList)
            } catch (e) {
                console.error(e);
            }
        }
}

export function approveRequestEnvelope(requestEnvelope, approvers, interviewers) {

    const interviewersUriList = interviewers.map(interviewer =>
        `${Users.getPath()}/${interviewer}`)

    const approversUriList = approvers.map(approver =>
        `${Users.getPath()}/${approver}`)

    return async function (dispatch, getState) {
        try {
            dispatch(requestRequestEnvelope());
            const approve = await RequestEnvelopes.approvePatch(requestEnvelope, requestEnvelope.id, {});
            //update interviewers and approvers here
            await RequestEnvelopes.updateInterviewersAndApprovers(requestEnvelope.id,interviewersUriList,approversUriList)
            if (approve && !getState().requestEnvelope.didInvalidate) {
                dispatch(receiveRequestEnvelope(approve.data));
            } else {
                dispatch(invalidateRequestEnvelope())
            }
        } catch (e) {
            dispatch(invalidateRequestEnvelope());
            console.error(e);
        }
    }
}


export function postComment(comment, requestEnvelopeId, author) {
    let today = new Date()
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    const commentObject = {
        comment: comment,
        requestId: requestEnvelopeId,
        author: `${Users.getPath()}/${author}`,
        createdAt: today,
    }

    return async function (dispatch, getState) {
        try {
            const [response, status] = await RequestComments.post(commentObject, {headers: { 'Content-Type': 'application/json' }});
        } catch (e) {
            console.error(e);
        }
    }
}
