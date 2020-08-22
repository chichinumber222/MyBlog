import { connect } from 'react-redux';
import ArticlesList from '../../components/articles-list';

const mapStateToProps = (state) => ({
  articles: state.articles,
})

export default connect(mapStateToProps)(ArticlesList);