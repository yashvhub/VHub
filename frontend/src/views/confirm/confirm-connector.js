import {connect} from 'react-redux';
import confirm from './confirm';
import {confirmInterview} from '../../action-creators/confirm';
import {fetchRequestEnvelope, postComment} from '../../action-creators/request-envelopes';

function mapStateToProps({requestEnvelope}){
    return {
        requestEnvelope: requestEnvelope.envelope
    }
    
}

const mapDispatchToProps = {
        confirmInterview,
        fetchRequestEnvelope,
        postComment
}
export default connect(mapStateToProps, mapDispatchToProps)(confirm);