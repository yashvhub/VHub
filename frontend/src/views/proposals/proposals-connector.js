import {connect} from 'react-redux';
import {fetchResources} from '../../action-creators/resources';
import {fetchRequestEnvelope} from '../../action-creators/request-envelopes';
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
        requestEnvelope: state.requestEnvelope.item,
        proposal: state.proposal.item,
        vendor: 'YASH'
    }
}

const mapDispatchToProps = {
    fetchResources,
    fetchRequestEnvelope,
    fetchProposal,
    postProposal,
}

export default connect(mapStateToProps, mapDispatchToProps)(Proposals);