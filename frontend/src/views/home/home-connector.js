import {connect} from 'react-redux';
import home from './home';

const mapStateToProps = (state) => {
    return {
        user: state.user,
        submitSuccess: state.request.submitSuccess
    }
}

export default connect(mapStateToProps)(home);