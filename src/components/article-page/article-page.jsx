import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';
import Article from '../article';
import styles from './article-page.module.scss';

function ArticlePage({ match, articles }) {
  const {
    params: { slug },
  } = match;
  const currentArticle = articles.find((article) => article.slug === slug);
  return currentArticle ? (
    <Article {...currentArticle} isList={false} />
  ) : (
    <Alert className={styles.infoNotification} message="Sorry, this article does not exist" type="info" />
  );
}

ArticlePage.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.obj).isRequired,
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
    isExact: PropTypes.bool,
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default ArticlePage;
