import { combineReducers } from 'redux';
import { ARTICLES_RECEIVED, ARTICLES_NOT_RECEIVED, RESET, AUTH_COMPLETED, LOG_OUT, SERVER_VALIDATIONS_RECEIVED, AUTH_NOT_COMPLETED } from './action-types';

function data(state = { articles: [], page: 0 }, action) {
  switch (action.type) {
    case ARTICLES_RECEIVED:
      return { articles: [...action.articles], page: action.page };
    default:
      return state;
  }
}

function successGettingArticles(state = false, action) {
  switch (action.type) {
    case ARTICLES_RECEIVED:
      return true;
    case RESET:
      return false;
    default:
      return state;
  }
}

function errorGettingArticles(state = false, action) {
  switch (action.type) {
    case ARTICLES_NOT_RECEIVED:
      return true;
    case RESET:
      return false;
    default:
      return state;
  }
}

function errorRegistrationOrAuthentication(state = false, action) {
  switch (action.type) {
    case AUTH_NOT_COMPLETED:
      return true;
    case RESET:
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
    case LOG_OUT:
      return {};
    default:
      return state;
  }
}

function serverValidations(state = '', action) {
  switch (action.type) {
    case SERVER_VALIDATIONS_RECEIVED: 
      return action.text;
    case AUTH_COMPLETED:
    case RESET: 
      return '';
    default:
      return state;
  }
}

const reducer = combineReducers({
  data,
  successGettingArticles,
  errorGettingArticles,
  errorRegistrationOrAuthentication,
  user,
  serverValidations,
});

export default reducer;
