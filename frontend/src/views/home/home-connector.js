import {connect} from 'react-redux';
import home from './home';

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(home);