import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Pagination, Alert } from 'antd';
import 'antd/dist/antd.css';
import classNames from 'classnames';
import Article from '../article';
import StyledSpinner from '../../subcomponents/styled-spinner';
import CornerNotice from '../../subcomponents/corner-notice';
import styles from './articles-list.module.scss';

function ArticlesList(props) {
  const {
    user,
    articles,
    page,
    gettingArticles,
    asyncGetArticles,
    favoritingArticle,
    asyncFavoriteArticle,
    loadingLaunchForGettingArticles,
    resetForFavoritingArticle
  } = props;

  useEffect(() => {
    asyncGetArticles(user.token, 1);
    return () => {
      loadingLaunchForGettingArticles();
      resetForFavoritingArticle();
    };
  }, [user.token, asyncGetArticles, loadingLaunchForGettingArticles, resetForFavoritingArticle]);

  if (gettingArticles.loading) {
    return <div className={classNames(styles.loading, styles.centered)} />;
  }

  if (gettingArticles.error) {
    return <Alert className={styles.errorNotification} message="Sorry, articles not received" type="error" />;
  }

  const articleFavoriteHandler = user.token ? (isFavorite, articleSlug) => asyncFavoriteArticle(user.token, articleSlug, isFavorite) : () => {};

  const elements = articles.map((article) => <Article key={article.slug} {...article} errorLike={favoritingArticle.error} disableLike={!Boolean(user.token)} articleFavoriteHandler={articleFavoriteHandler}/>);
  
  return (
    <div>
      {elements}
      <Pagination
        current={page}
        pageSize={10}
        total={500}
        showSizeChanger={false}
        size="small"
        className={styles.pagination}
        onChange={(pages) => asyncGetArticles(user.token, pages)}
        showQuickJumper
      />
      <StyledSpinner 
        className={styles.location} 
        title="Loading..." 
        isLoading={favoritingArticle.loading}
      />
      <CornerNotice type="error" message="Favorite failed" isActive={favoritingArticle.error}/>
    </div>
  );
}

ArticlesList.propTypes = {
    user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    username: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
    token: PropTypes.string,
  }).isRequired,
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
  page: PropTypes.number.isRequired,
  gettingArticles: PropTypes.shape({
    success: PropTypes.bool,
    error: PropTypes.bool,
    loading: PropTypes.bool,
  }).isRequired,
  favoritingArticle: PropTypes.shape({
    success: PropTypes.bool,
    error: PropTypes.bool,
    loading: PropTypes.bool,
  }).isRequired,
  asyncGetArticles: PropTypes.func.isRequired,
  asyncFavoriteArticle: PropTypes.func.isRequired,
  loadingLaunchForGettingArticles: PropTypes.func.isRequired,
  resetForFavoritingArticle: PropTypes.func.isRequired,
};

export default ArticlesList;
