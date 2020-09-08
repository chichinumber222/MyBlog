import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Alert, message } from 'antd';
import classNames from 'classnames';
import Article from '../article';
import styles from './article-page.module.scss';

function ArticlePage(props) {
  const {
    match,
    article,
    asyncGetArticleWithDispatch,
    successGettingArticle,
    errorGettingArticle,
    resetWithDispatch,
    asyncDeleteArticleWithDispatch,
    successDeletingArticle,
    errorDeletingArticle,
    user,
  } = props;

  const {
    params: { slug },
  } = match;

  useEffect(() => {
    asyncGetArticleWithDispatch(slug);
    return resetWithDispatch;
  }, [asyncGetArticleWithDispatch, resetWithDispatch, slug]);

  if (!(successGettingArticle || errorGettingArticle)) {
    return <div className={classNames(styles.spinner, styles.centered)} />;
  }

  if (errorGettingArticle) {
    return <Alert className={styles.errorNotification} message="Sorry, no article" type="error" />;
  }

  if (successDeletingArticle) {
    return <Redirect to="/"/>
  }

  if (errorDeletingArticle) {
    message.error('Failed to delete', 1.2);
  }

  const { author } = article;

  return (
    <Article 
      {...article} 
      isList={false} 
      showEditAndDelete={user.username === author.username} 
      articleDeleteHandler={() => asyncDeleteArticleWithDispatch(user.token, slug)}
    />
  )  
}

ArticlePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
    isExact: PropTypes.bool,
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  asyncGetArticleWithDispatch: PropTypes.func.isRequired,
  successGettingArticle: PropTypes.bool.isRequired,
  errorGettingArticle: PropTypes.bool.isRequired,
  resetWithDispatch: PropTypes.func.isRequired,
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
  asyncDeleteArticleWithDispatch: PropTypes.func.isRequired,
  successDeletingArticle: PropTypes.bool.isRequired,
  errorDeletingArticle: PropTypes.bool.isRequired,
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
};

export default ArticlePage;
