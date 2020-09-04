import { connect } from 'react-redux';
import EditProfile from '../../components/edit-profile';
import { asyncEditProfile, reset } from '../../reduxStore/action-creators';

const mapStateToProps = (state) => ({
  user: state.user,
  serverValidations: state.serverValidations,
  errorEditing: state.errorRegistrationOrAuthentication,
  successEditing: state.successEditingProfile,
});

const mapDispatchToProps = {
  asyncEditProfileWithDispatch: asyncEditProfile,
  resetWithDispatch: reset,
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
