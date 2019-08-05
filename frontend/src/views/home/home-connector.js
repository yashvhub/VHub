import {connect} from 'react-redux';
import home from './home';

const mapStateToProps = ({login}) => ({
    ...login
})

export default connect(mapStateToProps)(home);