import { connect } from 'react-redux';
import EditArticle from '../../components/edit-article';
import { asyncGetArticle, asyncEditArticle, reset } from '../../reduxStore/action-creators';

const mapStateToProps = (state) => ({
  article: state.lastOpenedArticle,
  successGettingArticle: state.successGettingArticle,
  errorGettingArticle: state.errorGettingArticle,
  user: state.user,
  successEditing: state.successEditingArticle,
  errorEditing: state.errorEditingArticle,
})

const mapDispatchToProps = {
  asyncGetArticleWithDispatch: asyncGetArticle,
  resetWithDispatch: reset,
  asyncEditArticleWithDispatch: asyncEditArticle,
}

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);