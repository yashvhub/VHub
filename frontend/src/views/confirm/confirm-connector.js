import {connect} from 'react-redux';
import confirm from './confirm';
import {confirmInterview, saveInterviewRequest} from '../../action-creators/confirm';
import {fetchRequestEnvelope} from '../../action-creators/request-envelopes';

function mapStateToProps({requestEnvelope}){
    console.log(requestEnvelope)
    return {
        requestEnvelope: requestEnvelope.item
    }
    
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        confirmInterviewRequest: () => {
            dispatch(confirmInterview())
        },
        fetchRequestEnvelope: () => {
            dispatch(fetchRequestEnvelope(ownProps.match.params.id))
        },
        saveInterviewRequest: () => {
            dispatch(saveInterviewRequest())
        },
        // requestSelectedResources: () => {
        //     dispatch()
        // }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(confirm);