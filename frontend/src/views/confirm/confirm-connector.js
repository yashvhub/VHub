import {connect} from 'react-redux';
import confirm from './confirm';
import {confirmInterview} from '../../action-creators/confirm';
import {fetchRequestEnvelope} from '../../action-creators/request-envelopes';

function mapStateToProps({requestEnvelope}){
    return {
        requestEnvelope: requestEnvelope.envelope
    }
    
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        confirmInterviewRequest: () => {
            dispatch(confirmInterview())
        },
        fetchRequestEnvelope: () => {
            dispatch(fetchRequestEnvelope(ownProps.match.params.id))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(confirm);