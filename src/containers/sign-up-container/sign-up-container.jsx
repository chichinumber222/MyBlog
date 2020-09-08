import { connect } from 'react-redux';
import SignUp from '../../components/sign-up';
import { asyncRegistration, registration$Reset } from '../../reduxStore/action-creators';

const mapStateToProps = (state) => ({
  registration: state.registration,
});

const mapDispatchToProps = {
  asyncRegistration,
  reset: registration$Reset,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
