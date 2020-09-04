import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './reduxStore/store';
import './index.scss';
import App from './components/app';
import CreateArticle from './components/create-article';

ReactDOM.render(
  <Provider store={store}>
    <App />
    <CreateArticle />
  </Provider>,
  document.getElementById('root')
);
