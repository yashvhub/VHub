import {connect} from 'react-redux';
import ResourceForm from './resourceForm';
import {addNewSkill} from '../../action-creators/request';

function mapStateToProps(state, ownProps){
    let {compensation, experience, index, number} = state.request.requestedResources[ownProps.id]
    let skills = state.request.requestedResources[ownProps.id].skills
    return{
        compensation,
        experience,
        index,
        number,
        skills
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