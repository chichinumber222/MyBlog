import { connect } from 'react-redux';
import ArticlePage from '../../components/article-page';

const mapStateToProps = (state) => ({
  articles: state.articles,
})

export default connect(mapStateToProps)(ArticlePage);