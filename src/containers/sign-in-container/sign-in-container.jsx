import { connect } from 'react-redux';
import SignIn from '../../components/sign-in';
import { asyncAuthentication } from '../../reduxStore/action-creators';

const mapDispatchToProps = (dispatch) => ({
  asyncAuthenticationWithDispatch: (email, password) => dispatch(asyncAuthentication(email, password)),
})

export default connect(null, mapDispatchToProps)(SignIn);