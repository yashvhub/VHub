import {connect} from 'react-redux';
import approveRequest from './approve-request';
import {fetchRequestEnvelope,approveRequestEnvelope, postComment} from '../../action-creators/request-envelopes';

function mapStateToProps({requestEnvelope},ownProps){
    return{
        requestEnvelope: requestEnvelope.envelope,
        isFetching: requestEnvelope.isFetching,
    }
    
}

const mapDispatchToProps = {
    fetchRequestEnvelope,
    approveRequestEnvelope,
    postComment,
}


export default connect(mapStateToProps,mapDispatchToProps)(approveRequest);