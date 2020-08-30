import { connect } from 'react-redux';
import SignUp from '../../components/sign-up';
import { asyncRegistration, reset } from '../../reduxStore/action-creators';

const mapStateToProps = (state) => ({
  serverValidations: state.serverValidations,
  user: state.user,
  errorRegistration: state.errorRegistrationOrAuthentication,
})

const mapDispatchToProps = (dispatch) => ({
  asyncRegistrationWithDispatch: (username, email, password) => dispatch(asyncRegistration(username, email, password)),
  resetWithDispatch: () => dispatch(reset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);