import { connect } from 'react-redux';
import { asyncGetArticles, getArticles$Loading } from '../../reduxStore/action-creators';
import ArticlesList from '../../components/articles-list';

const mapStateToProps = (state) => ({
  articles: state.articles.all,
  page: state.articles.page,
  gettingArticles: state.gettingArticles,
});

const mapDispatchToProps = {
  asyncGetArticles,
  loadingLaunchForGettingArticles: getArticles$Loading,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList);
