import {connect} from 'react-redux';
import {fetchResources} from '../../action-creators/resources';
import {fetchProposalRequestEnvelope, fetchRequestEnvelope} from '../../action-creators/request-envelopes';
import {fetchProposal, postProposal} from '../../action-creators/proposal';
import {addResource, clearResourceSubmitBanner} from '../../action-creators/resources';
import Proposals from './proposals';
import {fetchSkills} from '../../action-creators/skills';

function mapStateToProps(state) {
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
    return {
        resources: state.resources.items,
        isFetching: {
            resources: state.resources.isFetching,
            requestEnvelope: state.requestEnvelope.isFetching,
            proposal: state.proposal.isFetching,
        },
        hasError: {
            proposal: state.proposal.hasError
        },
        proposalRequestEnvelope: state.requestEnvelope.envelope,
        proposal: state.proposal.item,
        vendor: 'YASH',
        submitResourceSuccess: state.proposal.submitResourceSuccess,
        skills: state.skill.skills,
        skillsOptions
    }
}

const mapDispatchToProps = {
    fetchResources,
    fetchProposalRequestEnvelope,
    fetchProposal,
    postProposal,
    fetchRequestEnvelope,
    addResource,
    fetchSkills,
    clearResourceSubmitBanner
}

export default connect(mapStateToProps, mapDispatchToProps)(Proposals);