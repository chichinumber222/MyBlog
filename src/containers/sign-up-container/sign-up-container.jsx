import { connect } from 'react-redux';
import SignUp from '../../components/sign-up';
import { asyncRegistration, reset } from '../../reduxStore/action-creators';

const mapStateToProps = (state) => ({
  serverValidations: state.serverValidations,
  user: state.user,
  errorRegistration: state.errorRegistrationOrAuthentication,
});

const mapDispatchToProps = {
  asyncRegistrationWithDispatch: asyncRegistration,
  resetWithDispatch: reset,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
