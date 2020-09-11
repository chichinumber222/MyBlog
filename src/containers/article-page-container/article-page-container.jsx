import { connect } from 'react-redux';
import ArticlePage from '../../components/article-page';
import { asyncGetArticle, getArticle$Loading, asyncDeleteArticle, asyncFavoriteArticle } from '../../reduxStore/action-creators';

const mapStateToProps = (state) => ({
  article: state.article,
  gettingArticle: state.gettingArticle,
  user: state.user,
  deletingArticle: state.deletingArticle,
  errorFavoritingArticle: state.errorFavoritingArticle,
});

const mapDispatchToProps = {
  asyncGetArticle,
  loadingLaunchForGettingArticle: getArticle$Loading,
  asyncDeleteArticle,
  asyncFavoriteArticle,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);
