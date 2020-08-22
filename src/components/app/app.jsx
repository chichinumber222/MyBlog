import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './app.module.scss';
import Header from '../header';
import ArticlesList from '../articles-list';
import ArticlePage from '../article-page';

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <Header />
        <Switch>
          <Route path='/articles/:slug' component={ArticlePage}/>
          <Route path='/articles' component={ArticlesList}/>
          <Route exact path='/' component={ArticlesList}/>         
        </Switch>
      </div>
    </Router>
  )
}

export default App;