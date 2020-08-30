import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Pagination, Alert } from 'antd';
import { Ripple } from 'react-spinners-css';
import 'antd/dist/antd.css';
import Article from '../article';
import styles from './articles-list.module.scss';

function ArticlesList(props) {
  const {
    articles,
    page,
    successGettingArticles,
    errorGettingArticles,
    asyncGetArticlesWithDispatch,
    resetWithDispatch
  } = props;
  
  useEffect(() => {
    asyncGetArticlesWithDispatch(1);
    return resetWithDispatch;
  }, []);

  if (!(successGettingArticles || errorGettingArticles)) {
    return <Ripple className={styles.centered} color="#5F5F5F" />;
  }

  if (errorGettingArticles) {
    return <Alert className={styles.errorNotification} message="Sorry, articles not received" type="error" />;
  }

  const elements = articles.map((article) => <Article key={article.slug} {...article} isList />);
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
        onChange={asyncGetArticlesWithDispatch}
      />
    </div>
  );
}

ArticlesList.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
  page: PropTypes.number.isRequired,
  successGettingArticles: PropTypes.bool.isRequired,
  errorGettingArticles: PropTypes.bool.isRequired,
  asyncGetArticlesWithDispatch: PropTypes.func.isRequired,
  resetWithDispatch: PropTypes.func.isRequired,
};

export default ArticlesList;
