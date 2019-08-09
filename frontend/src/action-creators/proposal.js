import Proposals from '../API/proposals';
import {REQUEST_PROPOSAL, RECEIVE_PROPOSAL, HAS_ERROR_PROPOSAL} from "./actions";

export function requestProposal() {
    return {
        type: REQUEST_PROPOSAL
    }
}

export function receiveProposal(proposal) {
    return {
        type: RECEIVE_PROPOSAL,
        proposal
    }
}

export function hasErrorProposal(error) {
    return {
        type: HAS_ERROR_PROPOSAL,
        error
    }
}

export function fetchProposal(id) {
    return async function(dispatch,getState) {
        const config = {
            params: {
                projection: 'ProposalSummary'
            }
        }
        try {
            dispatch(requestProposal())
            const [response, status] = await Proposals.get(id, config);
            if(response){
                dispatch(receiveProposal(response));
            } else {
                dispatch(hasErrorProposal(status));
            }
        } catch (e) {
            dispatch(hasErrorProposal(e.message));
            console.error(e);
        }
    }
}

export function postProposal(proposal) {
    return async function(dispatch,getState) {
        try {
            dispatch(requestProposal())
            let response, status;
            if(proposal.id) {
                [response, status] = await Proposals.patch(proposal, proposal.id);
                if(response) {
                    dispatch(receiveProposal({data: getState().proposal.item}));
                }
            } else {
                [response, status] = await Proposals.post(proposal);
                if(response) {
                    const proposal = getState().proposal.item;
                    dispatch(receiveProposal({...proposal, id: response.data.id}));
                }
            }
            if(status) {
                dispatch(hasErrorProposal(status));
            }
        } catch (e) {
            dispatch(hasErrorProposal(e.message));
            console.error(e);
        }
    }
}
