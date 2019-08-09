import {connect} from 'react-redux';
import home from './home';

const mapStateToProps = (state) => {
    console.log(state)
    return ({
    ...state.login
})}

export default connect(mapStateToProps)(home);