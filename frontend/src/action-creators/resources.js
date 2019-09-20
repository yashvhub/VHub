import Resources from "../API/resources";
import {
    REQUEST_RESOURCES,
    RECEIVE_RESOURCES,
    INVALIDATE_RESOURCES,
    CLEAR_RESOURCE_BANNER, SUBMIT_RESOURCE_SUCCESS
} from "./actions";
import Skills from "../API/skills";
import API from "../API";
import ResourceRequests from "../API/resource-requests";

export function requestResources() {
    return {
        type: REQUEST_RESOURCES
    }
}

export function receiveResources(resources) {
    return {
        type: RECEIVE_RESOURCES,
        resources
    }
}

export function invalidateResources() {
    return {
        type: INVALIDATE_RESOURCES
    }
}

export function clearResourceSubmitBanner() {
    return {
        type: CLEAR_RESOURCE_BANNER
    }
}

export function submitResourceSuccess(){
    return{
        type: SUBMIT_RESOURCE_SUCCESS
    }
}

export function fetchResources({name, skill, vendor}) {
    return async function(dispatch, getState) {
        try {
            dispatch(requestResources())
            let response, status;
            if (name && skill) {
                [response, status] = await Resources.getByNameAndSkillAndVendor(name, skill, vendor);
            } else if (name) {
                [response, status] = await Resources.getByNameAndVendor(name, vendor);
            } else if (skill) {
                [response, status] = await Resources.getBySkillAndVendor(skill, vendor);
            } else {
                [response, status] = await Resources.getByVendor(vendor);
            }
            if (response && !getState().resources.didInvalidate) {
                dispatch(receiveResources(response));
            } else {
                dispatch(invalidateResources());
            }
        } catch (e) {
            dispatch(invalidateResources())
            console.error(e);
        }
    }
}

export function addResource(dataObject, skills) {
    return async function(dispatch, getState) {
        try {
            let response = await Resources.post(dataObject)
            if(response !== null) {
                const skillUriList = skills.map(skill =>
                    `${Skills.getPath()}/${skill}`)

                const skillsResponse = await API.put(`${Resources.getPath()}/${response[0].data.id}/skills`,
                    skillUriList.join('\n'),
                    {
                        headers: {
                            'Content-Type': 'text/uri-list'
                        }
                    });
            }
            if(response){
                dispatch(submitResourceSuccess())
            }
        } catch (e) {
            console.error(e);
        }
    }
}