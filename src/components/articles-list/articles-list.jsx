import React, { useEffect } from 'react';
import { Pagination, Alert } from 'antd';
import { Ripple } from 'react-spinners-css';
import 'antd/dist/antd.css';
import Article from '../article';
import styles from './articles-list.module.scss';

function ArticlesList ({articles, page, successfullDownload, error, asyncGetArticlesWithDispatch, beginningWithDispatch}) {
  useEffect(() => {
    asyncGetArticlesWithDispatch(1);
    return () => beginningWithDispatch();
  }, [])

  if (!(successfullDownload || error)) {
    return <Ripple className={styles.centered} color='#5F5F5F'/>
  }

  if (error) {
    return <Alert className={styles.alert} message="Sorry, articles not received" type="error"/>
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