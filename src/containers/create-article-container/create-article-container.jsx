import { connect } from 'react-redux';
import CreateArticle from '../../components/create-article';
import { asyncCreateArticle, createArticle$Reset } from '../../reduxStore/action-creators';

const mapStateToProps = (state) => ({
  user: state.user,
  creatingArticle: state.creatingArticle,
});

const mapDispatchToProps = {
  asyncCreateArticle,
  reset: createArticle$Reset,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);
