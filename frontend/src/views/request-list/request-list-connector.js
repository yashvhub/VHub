import {connect} from 'react-redux';
import RequestList from './request-list';
import {closeRequest, fetchRequestEnvelopeList, reOpenRequest} from "../../action-creators/request-list";

function mapStateToProps(state) {
    return {
        isFetching: state.requestLists.isFetching,
        requestLists: state.requestLists.data,
        page: state.requestLists.page
    }
}

function mapDispatchToProps(dispatch) {
    return { 
        requestListData: (search, page, toggle) => {
            dispatch(fetchRequestEnvelopeList(search, page, toggle))
        },
        onClose: (id,name, page, toggle) => {
            dispatch(closeRequest(id,name, page, toggle))
        },
        onReOpen: (id,name, page, toggle) => {
            dispatch(reOpenRequest(id,name, page, toggle))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestList);