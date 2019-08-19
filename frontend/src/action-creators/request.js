import {ADD_NEW_RESOURCE, ADD_NEW_RESOURCE_SKILL, REQUEST_HANDLECHANGE, INTIALIZE_REQUEST, REQUEST_USERS, RECEIVE_APPROVERS, RECEIVE_INTERVIEWERS, HAS_ERROR_USERS} from "./actions";
import RequestEnvelops from '../API/request-envelopes';
import Users from "../API/users";

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

export function requestUsers() {
    return {
        type: REQUEST_USERS
    }
}

export function receiveApprovers(approvers) {
    return {
        type: RECEIVE_APPROVERS,
        approvers
    }
}

export function receiveInterviewers(interviewers) {
    return {
        type: RECEIVE_INTERVIEWERS,
        interviewers
    }
}

export function invalidateUsers() {
    return {
        type: HAS_ERROR_USERS
    }
}


export function fetchApprovers(role) {
    return async function(dispatch,getState) {
        const config = {
            params: {
                projection: "UserSummary",
            }
        };
        try {
            dispatch(requestUsers())
            let response, status;
            if(role) {
                [response, status] = await Users.getByRole(role, config)
            }
            if(response && !getState().user.didInvalidate){
                dispatch(receiveApprovers(response.data.users));
            } else {
                dispatch(invalidateUsers());
            }
        } catch (e) {
            dispatch(invalidateUsers())
            console.error(e);
        }
    }
}

export function fetchInterviewers(role) {
    return async function(dispatch,getState) {
        const config = {
            params: {
                projection: "UserSummary",
            }
        };
        try {
            dispatch(requestUsers())
            let response, status;
            if(role) {
                [response, status] = await Users.getByRole(role, config)
            }
            if(response && !getState().user.didInvalidate){
                dispatch(receiveInterviewers(response.data.users));
            } else {
                dispatch(invalidateUsers());
            }
        } catch (e) {
            dispatch(invalidateUsers())
            console.error(e);
        }
    }
}