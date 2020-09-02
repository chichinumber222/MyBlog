import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';
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
  } = props;

  useEffect(() => {
    const {
      params: { slug },
    } = match;
    asyncGetArticleWithDispatch(slug);
    return resetWithDispatch;
  }, [asyncGetArticleWithDispatch, resetWithDispatch, match]);

  if (!(successGettingArticle || errorGettingArticle)) {
    return <div className={classNames(styles.spinner, styles.centered)} />;
  }

  if (errorGettingArticle) {
    return <Alert className={styles.errorNotification} message="Sorry, no article" type="error" />;
  }

  return <Article {...article} isList={false} />;
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
};

export default ArticlePage;
