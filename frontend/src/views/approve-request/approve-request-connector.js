import {connect} from 'react-redux';
import approveRequest from './approve-request';
import {fetchRequestEnvelope} from '../../action-creators/request-envelopes';

function mapStateToProps({requestEnvelope},ownProps){

    return{
        requestEnvelope: requestEnvelope.item
    }
    
}

const mapDispatchToProps = {
    fetchRequestEnvelope
}


export default connect(mapStateToProps,mapDispatchToProps)(approveRequest);