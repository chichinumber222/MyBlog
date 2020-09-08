import { combineReducers } from 'redux';
import {
  ARTICLES_RECEIVED,
  ARTICLES_NOT_RECEIVED,
  ARTICLE_RECEIVED,
  ARTICLE_NOT_RECEIVED,
  RESET,
  AUTH_COMPLETED,
  LOG_OUT,
  SERVER_VALIDATIONS_RECEIVED,
  AUTH_NOT_COMPLETED,
  PROFILE_EDITED,
  PROFILE_NOT_EDITED,
  ARTICLE_CREATED,
  ARTICLE_NOT_CREATED,
  ARTICLE_EDITED,
  ARTICLE_NOT_EDITED,
  ARTICLE_DELETED,
  ARTICLE_NOT_DELETED
} from './action-types';

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

function lastOpenedArticle(state = {}, action) {
  switch (action.type) {
    case ARTICLE_RECEIVED:
      return { ...action.article };
    default:
      return state;
  }
}

function successGettingArticle(state = false, action) {
  switch (action.type) {
    case ARTICLE_RECEIVED:
      return true;
    case RESET:
      return false;
    default:
      return state;
  }
}

function errorGettingArticle(state = false, action) {
  switch (action.type) {
    case ARTICLE_NOT_RECEIVED:
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
    case PROFILE_NOT_EDITED:
    case ARTICLE_NOT_CREATED:
    case ARTICLE_NOT_EDITED:
    case ARTICLE_NOT_DELETED:
      return true;
    case RESET:
      return false;
    default:
      return state;
  }
}

const userInitial = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {};

function user(state = userInitial, action) {
  switch (action.type) {
    case AUTH_COMPLETED:
    case PROFILE_EDITED:
      return { ...action.user };
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
    case RESET:
      return '';
    default:
      return state;
  }
}

function successEditingProfile(state = false, action) {
  switch (action.type) {
    case PROFILE_EDITED:
      return true;
    case RESET:
      return false;
    default:
      return state;
  }
}

function successCreatingArticle(state = false, action) {
  switch (action.type) {
    case ARTICLE_CREATED:
      return true;
    case RESET:
      return false;
    default:
      return state;
  }
}

function successEditingArticle(state = false, action) {
  switch(action.type) {
    case ARTICLE_EDITED: 
      return true;
    case RESET:
      return false;
    default:
      return state;
  }
}

function successDeletingArticle(state = false, action) {
  switch(action.type) {
    case ARTICLE_DELETED:
      return true;
    case RESET:
      return false;
    default:
      return state;
  }
}

const reducer = combineReducers({
  data,
  successGettingArticles,
  errorGettingArticles,
  lastOpenedArticle,
  successGettingArticle,
  errorGettingArticle,
  errorRegistrationOrAuthentication,
  user,
  serverValidations,
  successEditingProfile,
  successCreatingArticle,
  successEditingArticle,
  successDeletingArticle,
});

export default reducer;
