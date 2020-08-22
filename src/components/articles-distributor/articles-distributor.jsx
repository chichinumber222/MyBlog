import React from 'react';
import Article from '../article';
import testService from '../../services/test-service';

function ArticlesDistributor({match}) {
  const articles = testService();
  const slug = match.params.slug;
  if (slug) {
    const article = articles.find((article) => article.slug === slug);
    return <Article {...article}/> 
  }
  
  const elements = articles.map((article) => <Article key={article.slug} {...article}/> );
  return <div>{elements}</div>
}

export default ArticlesDistributor;
