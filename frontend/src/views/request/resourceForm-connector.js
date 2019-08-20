import {connect} from 'react-redux';
import ResourceForm from './resourceForm';
import {addNewSkill, editResource, removeSkill} from '../../action-creators/request';

function mapStateToProps(state, ownProps){
    console.log(state)
    return{
        requestedResource: state.request.requestedResources[ownProps.id]
    }
    
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        addNewSkill: (newSkill, index) => {
            dispatch(addNewSkill(newSkill, index))
        },
        removeSkill: (id, item) => {
            dispatch(removeSkill(id, item))
        },
        handleChange: (event, {name, value}) => {
            dispatch(editResource(name, value, ownProps.id))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ResourceForm);