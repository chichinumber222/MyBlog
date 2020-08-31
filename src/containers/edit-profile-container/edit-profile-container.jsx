import { connect } from 'react-redux';
import EditProfile from '../../components/edit-profile';
import { asyncEditProfile, reset } from '../../reduxStore/action-creators';

const mapStateToProps = (state) => ({
  user: state.user,
  serverValidations: state.serverValidations,
  errorEditing: state.errorRegistrationOrAuthentication,
  successEditing: state.successEditingProfile,
})

const mapDispatchToProps = (dispatch) => ({
  asyncEditProfileWithDispatch: (...args) => dispatch(asyncEditProfile(...args)),
  resetWithDispatch: () => dispatch(reset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);