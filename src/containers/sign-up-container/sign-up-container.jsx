import { connect } from 'react-redux';
import SignUp from '../../components/sign-up';
import { asyncRegistration, beginning } from '../../reduxStore/action-creators';

const mapStateToProps = (state) => ({
  serverValidations: state.serverValidations,
  user: state.user,
})

const mapDispatchToProps = (dispatch) => ({
  asyncRegistrationWithDispatch: (username, email, password) => dispatch(asyncRegistration(username, email, password)),
  beginningWithDispatch: () => dispatch(beginning()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);