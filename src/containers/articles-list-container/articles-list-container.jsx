import { connect } from 'react-redux';
import { asyncGetArticles, reset } from '../../reduxStore/action-creators';
import ArticlesList from '../../components/articles-list';

const mapStateToProps = (state) => ({
  articles: state.data.articles,
  page: state.data.page,
  errorGettingArticles: state.errorGettingArticles,
  successGettingArticles: state.successGettingArticles,
});

const mapDispatchToProps = {
  asyncGetArticlesWithDispatch: asyncGetArticles,
  resetWithDispatch: reset,
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList);
