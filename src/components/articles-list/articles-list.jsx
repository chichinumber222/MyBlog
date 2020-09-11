import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Pagination, Alert } from 'antd';
import 'antd/dist/antd.css';
import classNames from 'classnames';
import Article from '../article';
import styles from './articles-list.module.scss';

function ArticlesList(props) {
  const { user, articles, page, gettingArticles, asyncGetArticles, loadingLaunchForGettingArticles } = props;
  const { error, loading } = gettingArticles;

  useEffect(() => {
    asyncGetArticles(user.token, 1);
    return loadingLaunchForGettingArticles;
  }, [user.token, asyncGetArticles, loadingLaunchForGettingArticles]);

  if (loading) {
    return <div className={classNames(styles.loading, styles.centered)} />;
  }

  if (error) {
    return <Alert className={styles.errorNotification} message="Sorry, articles not received" type="error" />;
  }

  const elements = articles.map((article) => {
    return <Article key={article.slug} {...article} disableFavoritingArticle={!user.token} token={user.token} />;
  });

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
  asyncGetArticles: PropTypes.func.isRequired,
  loadingLaunchForGettingArticles: PropTypes.func.isRequired,
};

export default ArticlesList;
