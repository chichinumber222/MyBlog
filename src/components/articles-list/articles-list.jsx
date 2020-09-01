import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Pagination, Alert } from 'antd';
import 'antd/dist/antd.css';
import classNames from 'classnames';
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
    return (
      <div className={classNames(styles.spinner, styles.centered)} />
    )
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
        showQuickJumper
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
