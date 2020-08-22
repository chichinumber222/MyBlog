import React from 'react';
import Article from '../article';
import testService from '../../services/test-service';

function ArticlesList ({match}) {
  const articles = testService();
  const elements = articles.map((article) => <Article key={article.slug} {...article} isList={true}/>)
  return <div>{elements}</div>
}

export default ArticlesList;