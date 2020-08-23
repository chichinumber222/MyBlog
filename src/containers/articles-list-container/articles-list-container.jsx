import { connect } from 'react-redux';
import { asyncGetArticles } from '../../reduxStore/action-creators';
import ArticlesList from '../../components/articles-list';

const mapStateToProps = (state) => ({
  articles: state.data.articles,
  page: state.data.page,
})

const mapDispatchToProps = (dispatch) => ({
  asyncGetArticlesWithDispatch: (page) => dispatch((asyncGetArticles(page)))
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList);