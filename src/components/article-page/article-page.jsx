import React from 'react';
import Article from '../article';
import testService from '../../services/test-service';

function ArticlePage({match}) {
  const articles = testService();
  const slug = match.params.slug;
  const article = articles.find((article) => article.slug === slug);
  return <Article {...article} isList={false}/> 
}

export default ArticlePage;