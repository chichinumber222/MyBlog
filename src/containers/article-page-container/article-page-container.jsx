import { connect } from 'react-redux';
import ArticlePage from '../../components/article-page';
import { asyncGetArticle, getArticle$Loading, asyncDeleteArticle, deleteArticle$Reset, asyncFavoriteArticle, favoriteArticle$Reset } from '../../reduxStore/action-creators';

const mapStateToProps = (state) => ({
  article: state.article,
  gettingArticle: state.gettingArticle,
  user: state.user,
  deletingArticle: state.deletingArticle,
  favoritingArticle: state.favoritingArticle,
});

const mapDispatchToProps = {
  asyncGetArticle,
  loadingLaunchForGettingArticle: getArticle$Loading,
  asyncDeleteArticle,
  resetForDeletingArticle: deleteArticle$Reset,
  asyncFavoriteArticle,
  resetForFavoritingArticle: favoriteArticle$Reset,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);
