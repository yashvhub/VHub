import Skills from '../API/skills';
import {REQUEST_SKILLS, RECEIVE_SKILLS, HAS_ERROR_SKILLS} from './actions';

export function requestSkills() {
    return {
        type: REQUEST_SKILLS
    }
}

export function receiveSkills(skills) {
    return {
        type: RECEIVE_SKILLS,
        skills
    }
}

export function skillsHasError() {
    return {
        type: HAS_ERROR_SKILLS
    }
}



export function fetchSkills() {
    return async function(dispatch,getState) {
        try {
            dispatch(requestSkills())
            let response, status;
            [response, status] = await Skills.getAll(`${Skills.getPath()}/skills`);
            if(response && !getState().skill.hasError){
                dispatch(receiveSkills(response.data.skills));
            } else {
                dispatch(skillsHasError());
            }
        } catch (e) {
            dispatch(skillsHasError())
            console.error(e);
        }
    }
}