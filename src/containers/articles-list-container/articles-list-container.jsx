import { connect } from 'react-redux';
import { asyncGetArticles, getArticles$Loading, asyncFavoriteArticle, favoriteArticle$Reset } from '../../reduxStore/action-creators';
import ArticlesList from '../../components/articles-list';

const mapStateToProps = (state) => ({
  user: state.user,
  articles: state.articles.all,
  page: state.articles.page,
  gettingArticles: state.gettingArticles,
  favoritingArticle: state.favoritingArticle,
});

const mapDispatchToProps = {
  asyncGetArticles,
  loadingLaunchForGettingArticles: getArticles$Loading,
  asyncFavoriteArticle,
  resetForFavoritingArticle: favoriteArticle$Reset,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList);
