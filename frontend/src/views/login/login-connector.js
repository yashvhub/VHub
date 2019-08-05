import {connect} from 'react-redux';
import login from './login';
import {login as doLogin} from '../../action-creators/login';

const mapStateToProps = (state) => {
    return ({
    user: state.login.user,
    isPending: state.login.isPending,
    error: state.login.status
})
}

const mapDispatchToProps = {
    doLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(login);