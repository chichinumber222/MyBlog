import { connect } from 'react-redux';
import EditProfile from '../../components/edit-profile';
import { asyncEditProfile, editProfile$Reset } from '../../reduxStore/action-creators';

const mapStateToProps = (state) => ({
  user: state.user,
  editingProfile: state.editingProfile,
});

const mapDispatchToProps = {
  asyncEditProfile,
  reset: editProfile$Reset,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
