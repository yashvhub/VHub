import {connect} from 'react-redux';
import request from './request';
import {addNewResource, handleChange, createNewRequest, initializeRequest} from '../../action-creators/request';

function mapStateToProps(state){
    console.log(state)
    const currentUser = state.login.user.firstName +' '+ state.login.user.lastName;
    const interviewerOptions = [
        {key:'1', text:'Seymore Butts', value:'Seymore Butts'},
        {key:'2', text:'Gene Vagine', value:'Gene Vagine'},
        {key:'3', text:'Rick Sanchez', value:'Rick Sanchez'}
    ]
    const approverOptions = [
        {key:'1', text:'Seymore Butts', value:'Seymore Butts'},
        {key:'2', text:'Gene Vagine', value:'Gene Vagine'},
        {key:'3', text:'Rick Sanchez', value:'Rick Sanchez'}
    ]

    return{
        interviewerOptions,
        approverOptions,
        request: state.request,
        currentUser
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
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(request);