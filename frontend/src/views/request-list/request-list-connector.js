import {connect} from 'react-redux';
import RequestList from './request-list';
import requestListData from "../../action-creators/request-list";

function mapStateToProps(state) {
    return {
        requestLists: state.requestLists
    }
}

function mapDispatchToProps(dispatch) {
    return {
        requestListData: () => {
            dispatch(requestListData())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestList);