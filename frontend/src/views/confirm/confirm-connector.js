import {connect} from 'react-redux';
import confirm from './confirm';
import {confirmInterview} from '../../action-creators/confirm';
import {fetchRequestEnvelope} from '../../action-creators/request-envelopes';

function mapStateToProps({requestEnvelope}){
    return {
        requestEnvelope: requestEnvelope.envelope
    }
    
}

const mapDispatchToProps = {
        confirmInterview,
        fetchRequestEnvelope,
}
export default connect(mapStateToProps, mapDispatchToProps)(confirm);