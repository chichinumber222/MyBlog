import { connect } from 'react-redux';
import EditArticle from '../../components/edit-article';
import { asyncGetArticle, getArticle$Loading, asyncEditArticle, editArticle$Reset } from '../../reduxStore/action-creators';

const mapStateToProps = (state) => ({
  article: state.article,
  gettingArticle: state.gettingArticle,
  user: state.user,
  editingArticle: state.editingArticle,
});

const mapDispatchToProps = {
  asyncGetArticle,
  loadingReset: getArticle$Loading,
  asyncEditArticle,
  editReset: editArticle$Reset,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);
