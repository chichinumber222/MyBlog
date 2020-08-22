import { connect } from 'react-redux';
import App from '../../components/app';
import { asyncGetArticles } from '../../reduxStore/action-creators';

const mapDispatchToProps = (dispatch) => ({
  asyncGetArticlesWithDispatch: () => dispatch(asyncGetArticles()),
})

export default connect(null, mapDispatchToProps)(App);