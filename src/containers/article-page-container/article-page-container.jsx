import { connect } from 'react-redux';
import ArticlePage from '../../components/article-page';
import { asyncGetArticle, getArticle$Loading, asyncDeleteArticle } from '../../reduxStore/action-creators';

const mapStateToProps = (state) => ({
  article: state.article,
  gettingArticle: state.gettingArticle,
  user: state.user,
  deletingArticle: state.deletingArticle,
});

const mapDispatchToProps = {
  asyncGetArticle,
  loadingLaunchForGettingArticle: getArticle$Loading,
  asyncDeleteArticle,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);
