import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';
import classNames from 'classnames';
import Article from '../article';
import styles from './article-page.module.scss';

function ArticlePage(props) {
  const { match, article, asyncGetArticleWithDispatch, successGettingArticle, errorGettingArticle, resetWithDispatch } = props;

  useEffect(() => {
    const {
      params: { slug },
    } = match;
    asyncGetArticleWithDispatch(slug);
    return resetWithDispatch;
  }, []);

  if (!(successGettingArticle || errorGettingArticle)) {
    return <div className={classNames(styles.spinner, styles.centered)} />
  }

  if (errorGettingArticle) {
    return <Alert className={styles.errorNotification} message="Sorry, no article" type="error" />;
  }

  return <Article {...article} isList={false}/>
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
};

export default ArticlePage;
