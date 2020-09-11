import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Alert, message } from 'antd';
import classNames from 'classnames';
import Article from '../article';
import StyledSpinner from '../../subcomponents/styled-spinner';
import styles from './article-page.module.scss';

function ArticlePage(props) {
  const {
    match,
    article,
    gettingArticle,
    asyncGetArticle,
    deletingArticle,
    asyncDeleteArticle,
    user,
    loadingLaunchForGettingArticle,
  } = props;

  const {
    params: { slug },
  } = match;

  useEffect(() => {
    asyncGetArticle(user.token, slug);
    return loadingLaunchForGettingArticle;
  }, [user.token, asyncGetArticle, loadingLaunchForGettingArticle, slug]);

  useEffect(() => {
    if (deletingArticle.error) {
      message.error('Delete failed', 1.3);
    }
  }, [deletingArticle.error]);

  if (gettingArticle.loading) {
    return <div className={classNames(styles.loading, styles.centered)} />;
  }

  if (gettingArticle.error) {
    return <Alert className={styles.errorNotification} message="Sorry, no article" type="error" />;
  }

  if (deletingArticle.success) {
    return <Redirect to="/" />;
  }

  const { author } = article;
  return (
    <div>
      <Article
        {...article}
        isList={false}
        showEditAndDelete={user.username === author.username}
        articleDeleteHandler={asyncDeleteArticle}
        disableFavoritingArticle={!user.token}
        token={user.token}
      />
      <StyledSpinner className={styles.location} title="Deleting..." isLoading={deletingArticle.loading} />
    </div>
  );
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
  article: PropTypes.shape({
    slug: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    body: PropTypes.string,
    tagList: PropTypes.arrayOf(PropTypes.object),
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    favorited: PropTypes.bool,
    favoritesCount: PropTypes.number,
    author: PropTypes.shape({
      username: PropTypes.string,
      bio: PropTypes.string,
      image: PropTypes.string,
      following: PropTypes.bool,
    }),
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
