import React from 'react';
import Article from '../article';

function ArticlePage({match, articles}) {
  const slug = match.params.slug;
  const article = articles.find((article) => article.slug === slug);
  return article ? <Article {...article} isList={false}/> : null;
}

export default ArticlePage;