import { connect } from 'react-redux';
import Header from '../../components/header';

const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps)(Header);