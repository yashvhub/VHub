import {connect} from 'react-redux';
import RequestList from './request-list';
import {fetchRequestEnvelopeList} from "../../action-creators/request-list";

function mapStateToProps(state) {
    return {
        isFetching: state.requestLists.isFetching,
        requestLists: state.requestLists.data
    }
}

function mapDispatchToProps(dispatch) {
    return { 
        requestListData: () => {
            dispatch(fetchRequestEnvelopeList())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestList);