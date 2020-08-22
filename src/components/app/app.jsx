import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './app.module.scss';
import Header from '../header';
import ArticlesDistributor from '../articles-distributor';

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <Header />
        <Switch>
          <Route exact path={['/', '/articles', '/articles/:slug']} component={ArticlesDistributor}/>
        </Switch>
      </div>
    </Router>
  )
}

export default App;