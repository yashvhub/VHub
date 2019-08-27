import {
    ADD_NEW_RESOURCE, 
    ADD_NEW_RESOURCE_SKILL, 
    REQUEST_HANDLECHANGE, 
    INTIALIZE_REQUEST,
    REMOVE_SKILL, 
    EDIT_RESOURCE, 
    REQUEST_USERS, 
    RECEIVE_APPROVERS, 
    RECEIVE_INTERVIEWERS, 
    HAS_ERROR_USERS, 
    CLEAR_REQUEST,
    SUBMIT_SUCCESS,
    CLEAR_BANNER
} from "./actions";
import RequestEnvelops from '../API/request-envelopes';
import Users from "../API/users";

export function initializeRequest(currentUser) {
    return {
        type: INTIALIZE_REQUEST,
        currentUser
    }
}

export function clearRequest(){
    return{
        type: CLEAR_REQUEST
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
export function editResource(field, value, index){
    return {
        type: EDIT_RESOURCE,
        field,
        value,
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

export function createNewRequest(newRequestObject, requestUser) {
    const baseRequest = {
        requestDate: newRequestObject.requestDate,
        businessCase: newRequestObject.businessCase,
        clientName: newRequestObject.clientName,
        team: newRequestObject.team,
        manager: newRequestObject.manager
    };
    const dataObject = {
        baseRequest,
        requester: requestUser.id,
        interviewers: newRequestObject.interviewers,
        resources: newRequestObject.requestedResources,
        approver: newRequestObject.approvers,
        locationCityPref: newRequestObject.locationCityPref,
        locationStatePref: newRequestObject.locationStatePref,
        locationCountryPref: newRequestObject.locationCountryPref,
        comments: newRequestObject.comments,

    };

    return async (dispatch) =>{ 
        try {
            let response = await RequestEnvelops.post(dataObject)
            if(response.success){
                dispatch(clearRequest())
                dispatch(submitSuccess())
                
            }
        } catch(e){
            console.error(e)
        }
    }
}

export function clearBanner() {
    return {
        type: CLEAR_BANNER
    }
}

export function submitSuccess(){
    return{
        type: SUBMIT_SUCCESS
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
            dispatch(requestUsers());
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
            dispatch(invalidateUsers());
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
            dispatch(requestUsers());
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
            dispatch(invalidateUsers());
            console.error(e);
        }
    }
}