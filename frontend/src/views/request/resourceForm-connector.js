import {connect} from 'react-redux';
import ResourceForm from './resourceForm';
import {addNewSkill, editResource, removeSkill} from '../../action-creators/request';
import {fetchSkills} from '../../action-creators/skills';

function mapStateToProps(state, ownProps){
    const skillsOptions = []
    if(state.skill.skills.length !== 0){
            state.skill.skills.map((skill) =>{
            skillsOptions.push({
                key:skill.id,
                text: skill.skill,
                value: skill.id
            })
        })
    }
    return{
        requestedResource: state.request.requestedResources[ownProps.id],
        skills: state.skill.skills,
        skillsOptions,
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
        },
        fetchSkills: () => {
            dispatch(fetchSkills());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ResourceForm);