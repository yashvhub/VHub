import {connect} from 'react-redux';
import ApproveResourceForm from './approve-resourceForm';
import {addNewSkill} from '../../action-creators/request';

function mapStateToProps(state, ownProps){
    let {hourlyRate, yearsOfExperience, count, skills} = state.requestEnvelope.item.resourceRequests.find(({id}) => id === ownProps.id)
    return{
        hourlyRate,
        yearsOfExperience,
        count,
        skills: skills.map(({skill}) => skill),
    }
    
}

export default connect(mapStateToProps)(ApproveResourceForm);