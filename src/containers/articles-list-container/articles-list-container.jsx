import { connect } from 'react-redux';
import { asyncGetArticles, getArticles$Loading, asyncFavoriteArticle } from '../../reduxStore/action-creators';
import ArticlesList from '../../components/articles-list';

const mapStateToProps = (state) => ({
  user: state.user,
  articles: state.articles.all,
  page: state.articles.page,
  gettingArticles: state.gettingArticles,
  errorFavoritingArticle: state.errorFavoritingArticle,
});

const mapDispatchToProps = {
  asyncGetArticles,
  loadingLaunchForGettingArticles: getArticles$Loading,
  asyncFavoriteArticle,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList);
