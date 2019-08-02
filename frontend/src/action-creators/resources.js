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

export function fetchResources({name, skill}) {
    return async function(dispatch, getState) {
        try {
            dispatch(requestResources())
            let response, status;
            if (name && skill) {
                [response, status] = await Resources.getByNameAndSkill(name, skill);
            } else if (name) {
                [response, status] = await Resources.getByName(name);
            } else if (skill) {
                [response, status] = await Resources.getBySkill(skill);
            } else {
                [response, status] = await Resources.get();
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