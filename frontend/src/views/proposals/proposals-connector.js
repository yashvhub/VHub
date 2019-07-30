import {connect} from 'react-redux';
import {fetchResources} from '../../action-creators/resources';
import Proposals from './proposals';

function mapStateToProps(state) {
    return {
        resources: state.resources.items,
        isFetching: state.resources.isFetching,
        vendor: 'YASH'
    }
}

const mapDispatchToProps = {
    fetchResources
}

export default connect(mapStateToProps, mapDispatchToProps)(Proposals);