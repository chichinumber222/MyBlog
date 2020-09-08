import { connect } from 'react-redux';
import SignIn from '../../components/sign-in';
import { asyncAuthorization, auth$Reset } from '../../reduxStore/action-creators';

const mapStateToProps = (state) => ({
  authorization: state.authorization,
});

const mapDispatchToProps = {
  asyncAuthorization,
  reset: auth$Reset,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
