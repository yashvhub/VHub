import {connect} from 'react-redux';
import confirm from './confirm';
import {confirmInterview, saveInterviewRequest} from '../../action-creators/confirm';

function mapStateToProps(state, props){
    let urlID = Number(props.match.params.id);
    return {
        requestLists: state.requestLists.find(({id}) => id === urlID),
    }
    
}

function mapDispatchToProps(dispatch) {
    return {
        confirmInterviewRequest: () => {
            dispatch(confirmInterview())
        },
        saveInterviewRequest: () => {
            dispatch(saveInterviewRequest())
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(confirm);