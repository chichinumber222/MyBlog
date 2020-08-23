import { connect } from 'react-redux';
import { asyncGetArticles, beginning } from '../../reduxStore/action-creators';
import ArticlesList from '../../components/articles-list';

const mapStateToProps = (state) => ({
  articles: state.data.articles,
  page: state.data.page,
  successfullDownload: state.successfullDownload,
  error: state.error,
})

const mapDispatchToProps = (dispatch) => ({
  asyncGetArticlesWithDispatch: (page) => dispatch((asyncGetArticles(page))),
  beginningWithDispatch: () => dispatch(beginning()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList);