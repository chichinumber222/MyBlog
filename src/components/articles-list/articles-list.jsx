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
    gettingArticles,
    asyncGetArticles,
    loadingReset,
  } = props;
  const { error, loading } = gettingArticles;

  useEffect(() => {
    asyncGetArticles(1);
    return loadingReset;
  }, [asyncGetArticles, loadingReset]);

  if (loading) {
    return <div className={classNames(styles.loading, styles.centered)} />;
  }

  if (error) {
    return <Alert className={styles.errorNotification} message="Sorry, articles not received" type="error" />;
  }

  const elements = articles.map((article) => <Article key={article.slug} {...article} />);
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
        onChange={asyncGetArticles}
        showQuickJumper
      />
    </div>
  );
}

ArticlesList.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
  page: PropTypes.number.isRequired,
  gettingArticles: PropTypes.shape({
    success: PropTypes.bool,
    error: PropTypes.bool,
    loading: PropTypes.bool,
  }).isRequired,
  asyncGetArticles: PropTypes.func.isRequired,
  loadingReset: PropTypes.func.isRequired,
};

export default ArticlesList;
