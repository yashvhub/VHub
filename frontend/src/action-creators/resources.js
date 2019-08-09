import Resources from "../API/resources";
import { REQUEST_RESOURCES, RECEIVE_RESOURCES, INVALIDATE_RESOURCES } from "./actions";


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