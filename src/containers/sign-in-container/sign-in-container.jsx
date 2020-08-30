import { connect } from 'react-redux';
import SignIn from '../../components/sign-in';
import { asyncAuthentication, beginning } from '../../reduxStore/action-creators';

const mapStateToProps = (state) => ({
  serverValidations: state.serverValidations,
  user: state.user,
})

const mapDispatchToProps = (dispatch) => ({
  asyncAuthenticationWithDispatch: (email, password) => dispatch(asyncAuthentication(email, password)),
  beginningWithDispatch: () => dispatch(beginning()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);