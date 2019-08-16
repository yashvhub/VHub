import {connect} from 'react-redux';
import ResourceForm from './resourceForm';
import {addNewSkill} from '../../action-creators/request';

function mapStateToProps(state, ownProps){
    return{
        requestedResource: state.request.requestedResources[ownProps.id]
    }
    
}

function mapDispatchToProps(dispatch) {
    return {
        addNewSkill: (newSkill, index) => {
            dispatch(addNewSkill(newSkill, index))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ResourceForm);