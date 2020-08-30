import { connect } from 'react-redux';
import SignIn from '../../components/sign-in';
import { asyncAuthentication, reset } from '../../reduxStore/action-creators';

const mapStateToProps = (state) => ({
  serverValidations: state.serverValidations,
  user: state.user,
  errorAuthentication: state.errorRegistrationOrAuthentication,
})

const mapDispatchToProps = (dispatch) => ({
  asyncAuthenticationWithDispatch: (email, password) => dispatch(asyncAuthentication(email, password)),
  resetWithDispatch: () => dispatch(reset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);