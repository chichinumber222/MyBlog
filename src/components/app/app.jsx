import React from 'react';
import styles from './app.module.scss';
import Header from '../header';
import ArticlesList from '../articles-list';
import testService from '../../services/test-service';

function App() {
  const articles = testService();

  return (
    <div>
      <Header />
      <ArticlesList articles={articles}/>
    </div>
  )
}

export default App;