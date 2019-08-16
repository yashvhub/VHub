import {connect} from 'react-redux';
import AuthRouter from './router';
import {login as doLogin} from '../../action-creators/login';

const mapStateToProps = (state) => {
    return ({
    user: state.user,
    authed: state.login.authenticated
    })
}

const mapDispatchToProps = {
    doLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthRouter)