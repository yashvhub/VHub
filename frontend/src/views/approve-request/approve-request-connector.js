import {connect} from 'react-redux';
import approveRequest from './approve-request';
import {fetchRequestEnvelope,approveRequestEnvelope, saveApproveChanges, postComment} from '../../action-creators/request-envelopes';
import {fetchApprovers, fetchInterviewers} from '../../action-creators/request'

function mapStateToProps(state){
    return{
        requestEnvelope: state.requestEnvelope.envelope,
        isFetching: state.requestEnvelope.isFetching,
        interviewerOptions: state.request.interviewerOptions,
        approverOptions: state.request.approverOptions,
    }
    
}

const mapDispatchToProps = {
    fetchRequestEnvelope,
    approveRequestEnvelope,
    postComment,
    fetchApprovers,
    fetchInterviewers,
    saveApproveChanges,
}


export default connect(mapStateToProps,mapDispatchToProps)(approveRequest);