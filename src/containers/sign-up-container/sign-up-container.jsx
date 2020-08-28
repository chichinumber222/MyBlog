import { connect } from 'react-redux';
import SignUp from '../../components/sign-up';
import { asyncRegistration } from '../../reduxStore/action-creators';

const mapDispatchToProps = (dispatch) => ({
  asyncRegistrationWithDispatch: (username, email, password) => dispatch(asyncRegistration(username, email, password)),
})

export default connect(null, mapDispatchToProps)(SignUp);