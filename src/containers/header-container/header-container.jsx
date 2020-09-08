import { connect } from 'react-redux';
import Header from '../../components/header';
import { logOuting } from '../../reduxStore/action-creators';

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  logOuting,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
