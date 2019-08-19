import {ADD_NEW_RESOURCE, ADD_NEW_RESOURCE_SKILL, REQUEST_HANDLECHANGE, INTIALIZE_REQUEST, REMOVE_SKILL} from "./actions";
import RequestEnvelops from '../API/request-envelopes';

export function initializeRequest(currentUser) {
    return {
        type: INTIALIZE_REQUEST,
        currentUser
    }
}

export function addNewResource() {
    return {
        type:ADD_NEW_RESOURCE,
    }
}
export function addNewSkill(newSkill, index){
    return {
        type:ADD_NEW_RESOURCE_SKILL,
        newSkill,
        index
    }
}

export function handleChange(key, value){
    return{
        type: REQUEST_HANDLECHANGE,
        key,
        value
    }
}

export function removeSkill(id, item) {
    return {
        id,
        item,
        type: REMOVE_SKILL
    }
}

export function createNewRequest(newRequestObject) {
    return async () =>{ 
        try {
            let response = await RequestEnvelops.post(newRequestObject)
            console.log(response)
        } catch(e){
            console.log(e)
        }
    }
}