import { combineReducers } from 'redux';
import { ARTICLES_RECEIVED, ARTICLES_NOT_RECEIVED, BEGINNING, AUTH_COMPLETED } from './action-types';

function successfullDownload(state = false, action) {
  switch (action.type) {
    case ARTICLES_RECEIVED:
      return true;
    case BEGINNING:
      return false;
    default:
      return state;
  }
}

function data(state = { articles: [], page: 0 }, action) {
  switch (action.type) {
    case ARTICLES_RECEIVED:
      return { articles: [...action.articles], page: action.page };
    default:
      return state;
  }
}

function error(state = false, action) {
  switch (action.type) {
    case ARTICLES_NOT_RECEIVED:
      return true;
    case BEGINNING:
      return false;
    default:
      return state;
  }
}

const userInitial = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : {};

function user(state = userInitial, action) {
  switch (action.type) {
    case AUTH_COMPLETED: 
      return {...action.user};
    default:
      return state;
  }
}

const reducer = combineReducers({
  data,
  successfullDownload,
  error,
  user,
});

export default reducer;
