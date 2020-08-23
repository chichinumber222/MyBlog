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

function data(state = {articles: [], page: 1}, action) {
  switch (action.type) {
    case ARTICLES_RECEIVED: 
      return {articles: [...action.articles], page: action.page};
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
  data,
  successfullDownload,
  error,
})

export default reducer;