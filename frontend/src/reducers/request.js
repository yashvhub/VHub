import {ADD_NEW_RESOURCE, ADD_NEW_RESOURCE_SKILL, REQUEST_HANDLECHANGE, INTIALIZE_REQUEST} from "../action-creators/actions";


function blankState(){
    return {
        requestedBy: '',
        requestDate: '',
        interviewers: [],
        approvers: [],
        jobId: '',
        businessCase: '',
        clientName: '',
        team: '',
        manager: '',
        locationPref: '',
        comments: [],
        requestedResources: []
    }
}

function initializeRequest(state, action){
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const requestDate = mm+'/'+dd+'/'+yyyy;
    return {
        ...state,
        requestedBy: action.currentUser,
        requestDate,
    }
}

function addNewResource(state) {
    const resourceRequestDefaultObject = {
        index: state.requestedResources.length,
        number: '',
        compensation: '',
        experience: '',
        skills: []
    }
    state.requestedResources.push(resourceRequestDefaultObject)
    return{
        ...state
    }
}

function addNewSkill(state, action) {
    return{
        ...state,
            requestedResources:[
                ...state.requestedResources.slice(0,action.index),
                {
                    ...state.requestedResources[action.index],
                    skills:[...state.requestedResources[action.index].skills, action.newSkill]
                },
                ...state.requestedResources.slice(action.index+1)
            ]
        }
}

function requestHandleChange(state, action){
    return{
        ...state,
        [action.key]: action.value
    }
}

export default function (state = blankState(), action) {
    const actionHandlers = {
        [ADD_NEW_RESOURCE]: addNewResource,
        [ADD_NEW_RESOURCE_SKILL]:addNewSkill,
        [REQUEST_HANDLECHANGE]: requestHandleChange,
        [INTIALIZE_REQUEST]: initializeRequest
    };

    const reducer = actionHandlers[action.type];

    return reducer ?
        reducer(state, action) :
        state;
}