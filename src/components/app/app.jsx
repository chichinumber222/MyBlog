import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './app.module.scss';
import HeaderContainer from '../../containers/header-container';
import ArticlesListContainer from '../../containers/articles-list-container';
import ArticlePageContainer from '../../containers/article-page-container';
import SignUpContainer from '../../containers/sign-up-container';
import SignInContainer from '../../containers/sign-in-container';
import EditProfileContainer from '../../containers/edit-profile-container';
import CreateArticleContainer from '../../containers/create-article-container';

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <HeaderContainer />
        <Switch>
          <Route path="/articles/:slug/edit" rebder={() => <span>Edit article</span>}/> 
          <Route path="/articles/:slug" component={ArticlePageContainer} />
          <Route path="/articles" component={ArticlesListContainer} />
          <Route path="/sign-up" component={SignUpContainer} />
          <Route path="/sign-in" component={SignInContainer} />
          <Route path="/profile" component={EditProfileContainer} />
          <Route path="/new-article" component={CreateArticleContainer}/>
          <Route path="/" component={ArticlesListContainer} />
          <Route render={() => <span>404</span>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
