import {connect} from 'react-redux';
import {fetchResources} from '../../action-creators/resources';
import {fetchRequestEnvelope} from '../../action-creators/request-envelopes';
import Proposals from './proposals';

function mapStateToProps(state) {
    return {
        resources: state.resources.items,
        isFetching: {
            resources: state.resources.isFetching,
            requestEnvelope: state.requestEnvelope.isFetching,
        },
        requestEnvelope: state.requestEnvelope.item,
        vendor: 'YASH'
    }
}

const mapDispatchToProps = {
    fetchResources,
    fetchRequestEnvelope
}

export default connect(mapStateToProps, mapDispatchToProps)(Proposals);