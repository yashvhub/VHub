import {connect} from 'react-redux';
import {fetchResources} from '../../action-creators/resources';
import {fetchProposalRequestEnvelope, fetchRequestEnvelope} from '../../action-creators/request-envelopes';
import {fetchProposal, postProposal} from '../../action-creators/proposal';
import Proposals from './proposals';

function mapStateToProps(state) {
    return {
        resources: state.resources.items,
        isFetching: {
            resources: state.resources.isFetching,
            requestEnvelope: state.requestEnvelope.isFetching,
            proposal: state.proposal.isFetching,
        },
        hasError: {
            proposal: state.proposal.hasError
        },
        proposalRequestEnvelope: state.requestEnvelope.envelope,
        proposal: state.proposal.item,
        vendor: 'YASH'
    }
}

const mapDispatchToProps = {
    fetchResources,
    fetchProposalRequestEnvelope,
    fetchProposal,
    postProposal,
    fetchRequestEnvelope
}

export default connect(mapStateToProps, mapDispatchToProps)(Proposals);