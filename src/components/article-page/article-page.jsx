import React from 'react';
import Article from '../article';

function ArticlePage({match, articles}) {
  const slug = match.params.slug;
  const article = articles.find((article) => article.slug === slug);
  return <Article {...article} isList={false}/> 
}

export default ArticlePage;