import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './reduxStore/store';
import './index.scss';
import App from './components/app';
import EditProfile from './components/edit-profile';

ReactDOM.render(
  <Provider store={store}>
    <App />
    <EditProfile />
  </Provider>,
  document.getElementById('root')
);
