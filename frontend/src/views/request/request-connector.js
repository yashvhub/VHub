import {connect} from 'react-redux';
import request from './request';
import {addNewResourceRequest} from '../../action-creators/request';

function mapStateToProps(state,ownProps){
    const interviewers = [
        {key:'1', text:'Seymore Butts', value:'Seymore Butts'},
        {key:'2', text:'Gene Vagine', value:'Gene Vagine'},
        {key:'3', text:'Rick Sanchez', value:'Rick Sanchez'}
    ]
    const approvers = [
        {key:'1', text:'Seymore Butts', value:'Seymore Butts'},
        {key:'2', text:'Gene Vagine', value:'Gene Vagine'},
        {key:'3', text:'Rick Sanchez', value:'Rick Sanchez'}
    ]
    const request = state.requestLists.find(({id}) => {
        return id === Number(ownProps.match.params.id)
    })
    return{
        interviewers,
        approvers,
        request: state.request,
        defaultRequest: request
    }
    
}

function mapDispatchToProps(dispatch) {
    return {
        addResourceRequest: () => {
            dispatch(addNewResourceRequest())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(request);