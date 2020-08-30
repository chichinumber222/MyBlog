import { connect } from 'react-redux';
import ArticlePage from '../../components/article-page';
import { asyncGetArticle, reset } from '../../reduxStore/action-creators';

const mapStateToProps = (state) => ({
  article: state.lastOpenedArticle,
  successGettingArticle: state.successGettingArticle,
  errorGettingArticle: state.errorGettingArticle,
});

const mapDispatchToProps = (dispatch) => ({
  asyncGetArticleWithDispatch: (slug) => dispatch(asyncGetArticle(slug)),
  resetWithDispatch: () => dispatch(reset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);
