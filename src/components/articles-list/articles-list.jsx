import React, { useEffect } from 'react';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import Article from '../article';
import styles from './articles-list.module.scss';

function ArticlesList ({articles, page, asyncGetArticlesWithDispatch}) {
  useEffect(() => {
    asyncGetArticlesWithDispatch(1);
  }, []);

  const elements = articles.map((article) => <Article key={article.slug} {...article} isList={true}/>)
  return (
    <div>
      {elements}
      <Pagination current={page} pageSize={10} total={500} showSizeChanger={false} size="small" className={styles.pagination} onChange={asyncGetArticlesWithDispatch}/>
    </div>
  )
}

export default ArticlesList;