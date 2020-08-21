import React from 'react';
import styles from './articles-list.module.scss';
import Article from '../article';

function ArticlesList({articles}) {
  return (
    <div className={styles.articlesList}>
      {articles.map((article) => <Article key={article.slug} {...article}/>)}
    </div>
  )
}

export default ArticlesList;