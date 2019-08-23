import {connect} from 'react-redux';
import request from './request';
import {addNewResource, handleChange, createNewRequest, initializeRequest, fetchApprovers, fetchInterviewers, clearRequest} from '../../action-creators/request';

function mapStateToProps(state){
    const approverOptions = []
    if(state.request.approverOptions.length != 0){
            state.request.approverOptions.map((option) =>{
            approverOptions.push({
                key:option.id,
                text: option.firstName +' '+ option.lastName,
                value: option.id
            })
        })
    }
    const interviewerOptions = []
    if(state.request.interviewerOptions.length != 0){
            state.request.interviewerOptions.map((option) =>{
            interviewerOptions.push({
                key:option.id,
                text: option.firstName +' '+ option.lastName,
                value: option.id
            })
        })
    }
    const currentUser = state.user.firstName +' '+ state.user.lastName;
    return{
        interviewerOptions: state.interviewerOptions,
        approverOptions: state.approverOptions,
        request: state.request,
        user: state.user,
        currentUser,
        approverOptions,
        interviewerOptions
    }
    
}

function mapDispatchToProps(dispatch) {
    return {
        addResourceRequest: () => {
            dispatch(addNewResource())
        },
        initializeRequest: (requestedBy) => {
            dispatch(initializeRequest(requestedBy))
        },
        createNewRequest: (newRequestObject, requestUser) => {
            dispatch(createNewRequest(newRequestObject, requestUser))
        },
        handleChange: (event, {name, value}) => {
            dispatch(handleChange(name, value))
        },
        fetchApprovers: (role) => {
            dispatch(fetchApprovers(role));
        },
        fetchInterviewers: (role) => {
            dispatch(fetchInterviewers(role));
        },
        clearRequest: () => {
            dispatch(clearRequest())
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(request);