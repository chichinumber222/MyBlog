import React from 'react';
import Article from '../article';

function ArticlesList ({articles}) {
  const elements = articles.map((article) => <Article key={article.slug} {...article} isList={true}/>)
  return <div>{elements}</div>
}

export default ArticlesList;