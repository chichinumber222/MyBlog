import { connect } from 'react-redux';
import ArticlePage from '../../components/article-page';
import { asyncGetArticle, reset, asyncDeleteArticle } from '../../reduxStore/action-creators';

const mapStateToProps = (state) => ({
  article: state.lastOpenedArticle,
  successGettingArticle: state.successGettingArticle,
  errorGettingArticle: state.errorGettingArticle,
  user: state.user,
  successDeletingArticle: state.successDeletingArticle,
  errorDeletingArticle: state.errorRegistrationOrAuthentication,
});

const mapDispatchToProps = {
  asyncGetArticleWithDispatch: asyncGetArticle,
  resetWithDispatch: reset,
  asyncDeleteArticleWithDispatch: asyncDeleteArticle,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);
