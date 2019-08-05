import {connect} from 'react-redux';
import RequestList from './request-list';
import {fetchRequestEnvelopeList} from "../../action-creators/request-list";

function mapStateToProps(state) {
    return {
        isFetching: state.requestLists.isFetching,
        requestLists: state.requestLists.data,
        page: state.requestLists.page
    }
}

function mapDispatchToProps(dispatch) {
    return { 
        requestListData: (search, page) => {
            dispatch(fetchRequestEnvelopeList(search, page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestList);