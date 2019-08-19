import {connect} from 'react-redux';
import ResourceForm from './resourceForm';
import {addNewSkill,removeSkill} from '../../action-creators/request';

function mapStateToProps(state, ownProps){
    console.log(state)
    return{
        requestedResource: state.request.requestedResources[ownProps.id]
    }
    
}

function mapDispatchToProps(dispatch) {
    return {
        addNewSkill: (newSkill, index) => {
            dispatch(addNewSkill(newSkill, index))
        },
        removeSkill: (id, item) => {
            dispatch(removeSkill(id, item))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ResourceForm);