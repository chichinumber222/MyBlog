import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Alert } from 'antd';
import classNames from 'classnames';
import Article from '../article';
import StyledSpinner from '../../subcomponents/styled-spinner';
import CornerNotice from "../../subcomponents/corner-notice";
import styles from './article-page.module.scss';

function ArticlePage(props) {
  const {
    match,
    article,
    gettingArticle,
    asyncGetArticle,
    deletingArticle,
    asyncDeleteArticle,
    errorFavoritingArticle,
    asyncFavoriteArticle,
    user,
    loadingLaunchForGettingArticle 
  } = props;

  const {
    params: { slug },
  } = match;

  useEffect(() => {
    asyncGetArticle(user.token, slug);
    return loadingLaunchForGettingArticle;
  }, [user.token, asyncGetArticle, loadingLaunchForGettingArticle, slug]);

  if (gettingArticle.loading) {
    return <div className={classNames(styles.loading, styles.centered)} />;
  }

  if (gettingArticle.error) {
    return <Alert className={styles.errorNotification} message="Sorry, no article" type="error" />;
  }

  if (deletingArticle.success) {
    return <Redirect to="/"/>;
  }
  
  const articleFavoriteHandler = user.token ? (isFavorite, articleSlug) => asyncFavoriteArticle(user.token, articleSlug, isFavorite) : () => {};

  const { author } = article;

  return (
    <div>
      <Article 
        {...article} 
        isList={false} 
        showEditAndDelete={user.username === author.username} 
        articleDeleteHandler={() => asyncDeleteArticle(user.token, slug)}
        articleFavoriteHandler={articleFavoriteHandler}
        errorFavoritingArticle={errorFavoritingArticle}
        disableFavoritingArticle={!user.token}
      />
      <StyledSpinner className={styles.location} title="Deleting..." isLoading={deletingArticle.loading}/>
      <CornerNotice type="error" message="Delete failed" isActive={deletingArticle.error}/>
      <CornerNotice type="error" message="Favorite failed" isActive={errorFavoritingArticle}/>
    </div>
  )  
}

ArticlePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
    isExact: PropTypes.bool,
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  asyncGetArticle: PropTypes.func.isRequired,
  asyncDeleteArticle: PropTypes.func.isRequired,
  asyncFavoriteArticle: PropTypes.func.isRequired,
  article: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    body: PropTypes.string,
    tagList: PropTypes.arrayOf(PropTypes.string),
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    favorited: PropTypes.bool.isRequired,
    favoritesCount: PropTypes.number.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string,
      bio: PropTypes.string,
      image: PropTypes.string,
      following: PropTypes.bool,
    }).isRequired,
  }).isRequired,
  gettingArticle: PropTypes.shape({
    success: PropTypes.bool,
    error: PropTypes.bool,
    loading: PropTypes.bool,
  }).isRequired,
  deletingArticle: PropTypes.shape({
    success: PropTypes.bool,
    error: PropTypes.bool,
    loading: PropTypes.bool,
  }).isRequired,
  errorFavoritingArticle: PropTypes.bool.isRequired,
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
  loadingLaunchForGettingArticle: PropTypes.func.isRequired,
};

export default ArticlePage;
