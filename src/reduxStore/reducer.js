import { combineReducers } from 'redux';
import { ARTICLES_RECEIVED, ARTICLES_NOT_RECEIVED } from './action-types';

function successfullDownload(state = false, action) {
  switch (action.type) {
    case ARTICLES_RECEIVED:
      return true;
    default:
      return state; 
  }
}

function articles(state = [], action) {
  switch (action.type) {
    case ARTICLES_RECEIVED: 
      return [...action.articles];
    default:
      return state;
  }
}

function error(state = false, action) {
  switch (action.type) {
    case ARTICLES_NOT_RECEIVED:
      return true;
    default:
      return state;
  }
}

const reducer = combineReducers({
  articles,
  successfullDownload,
  error,
})

export default reducer;