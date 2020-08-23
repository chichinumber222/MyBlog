import React, { useEffect } from 'react';
import { Pagination, Spin, Alert } from 'antd';
import 'antd/dist/antd.css';
import Article from '../article';
import styles from './articles-list.module.scss';

function ArticlesList ({articles, page, successfullDownload, error, asyncGetArticlesWithDispatch, beginningWithDispatch}) {
  useEffect(() => {
    asyncGetArticlesWithDispatch(1);
  }, [])

  if (!(successfullDownload || error)) {
    return <Spin />
  }

  if (error) {
    return <Alert message="Articles not received" type="error"/>
  }


  const elements = articles.map((article) => <Article key={article.slug} {...article} isList={true}/>)
  return (
    <div>
      {elements}
      <Pagination current={page} pageSize={10} total={500} showSizeChanger={false} size="small" className={styles.pagination} onChange={asyncGetArticlesWithDispatch}/>
    </div>
  )
}

export default ArticlesList;