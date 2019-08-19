import {connect} from 'react-redux';
import request from './request';
import {addNewResource, handleChange, createNewRequest, initializeRequest, fetchApprovers, fetchInterviewers} from '../../action-creators/request';

function mapStateToProps(state){
    const currentUser = state.user.firstName +' '+ state.user.lastName;
    return{
        interviewerOptions: state.interviewerOptions,
        approverOptions: state.approverOptions,
        request: state.request,
        currentUser,
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
        createNewRequest: (newRequestObject) => {
            return() => {
                const [approvers] = newRequestObject
                dispatch(createNewRequest((newRequestObject)))
            }
        },
        handleChange: (event, {name, value}) => {
            dispatch(handleChange(name, value))
        },
        fetchApprovers: (role) => {
            dispatch(fetchApprovers(role));
        },
        fetchInterviewers: (role) => {
            dispatch(fetchInterviewers(role));
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(request);