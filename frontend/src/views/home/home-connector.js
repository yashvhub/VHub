import {connect} from 'react-redux';
import home from './home';
import { clearBanner } from '../../action-creators/request';

const mapStateToProps = (state) => {
    return {
        user: state.user,
        submitSuccess: state.request.submitSuccess
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clearBanner: () =>{
            dispatch(clearBanner())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(home);