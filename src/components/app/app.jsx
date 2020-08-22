import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './app.module.scss';
import Header from '../header';
import ArticlesListContainer from '../../containers/articles-list-container';
import ArticlePageContainer from '../../containers/article-page-container';

function App({asyncGetArticlesWithDispatch}) {
  return (
    <Router>
      <div className={styles.app}>
        <Header />
        <Switch>
          <Route path='/articles/:slug' component={ArticlePageContainer}/>
          <Route exact path={['/', '/articles']} render={() => {
            asyncGetArticlesWithDispatch();
            return <ArticlesListContainer />
          }}/>       
        </Switch>
      </div>
    </Router>
  )
}

export default App;