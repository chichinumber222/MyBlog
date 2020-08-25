import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './app.module.scss';
import Header from '../header';
import ArticlesListContainer from '../../containers/articles-list-container';
import ArticlePageContainer from '../../containers/article-page-container';
import SignUp from '../sign-up';

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <Header />
        <Switch>
          <Route path="/articles/:slug" component={ArticlePageContainer} />
          <Route path='/sign-up' component={SignUp}/>
          <Route exact path={['/', '/articles']} component={ArticlesListContainer} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
