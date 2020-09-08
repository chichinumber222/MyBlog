import { combineReducers } from 'redux';
import {
  GET_ARTICLES_$_LOADING,
  GET_ARTICLES_$_RECEIVED,
  GET_ARTICLES_$_NOT_RECEIVED,
  GET_ARTICLE_$_LOADING,
  GET_ARTICLE_$_RECEIVED,
  GET_ARTICLE_$_NOT_RECEIVED,
  AUTH_$_LOADING,
  AUTH_$_COMPLETED,
  AUTH_$_NOT_COMPLETED,
  AUTH_$_SERVER_VALIDATION,
  AUTH_$_RESET,
  REGISTRATION_$_LOADING,
  REGISTRATION_$_COMPLETED,
  REGISTRATION_$_NOT_COMPLETED,
  REGISTRATION_$_SERVER_VALIDATION,
  REGISTRATION_$_RESET,
  LOG_OUT,
  EDIT_PROFILE_$_LOADING,
  EDIT_PROFILE_$_EDITED,
  EDIT_PROFILE_$_NOT_EDITED,
  EDIT_PROFILE_$_SERVER_VALIDATION,
  EDIT_PROFILE_$_RESET,
  CREATE_ARTICLE_$_LOADING,
  CREATE_ARTICLE_$_CREATED,
  CREATE_ARTICLE_$_NOT_CREATED,
  CREATE_ARTICLE_$_RESET,
  EDIT_ARTICLE_$_LOADING,
  EDIT_ARTICLE_$_EDITED,
  EDIT_ARTICLE_$_NOT_EDITED,
  EDIT_ARTICLE_$_RESET,
  DELETE_ARTICLE_$_LOADING,
  DELETE_ARTICLE_$_DELETED,
  DELETE_ARTICLE_$_NOT_DELETED,
  DELETE_ARTICLE_$_RESET
} from './action-types';

const initialStateForGettingArticles = {
  success: false,
  error: false,
  loading: true,
}

function articles(state = { all: [], page: 0 }, action) {
  switch (action.type) {
    case GET_ARTICLES_$_RECEIVED:
      return { all: [...action.articles], page: action.page };
    default:
      return state;
  }
}

function gettingArticles (state = initialStateForGettingArticles, action) {
  switch (action.type) {
    case GET_ARTICLES_$_LOADING:
      return {success: false, error: false, loading: true };
    case GET_ARTICLES_$_RECEIVED:
      return { success: true, error: false, loading: false };
    case GET_ARTICLES_$_NOT_RECEIVED:
      return { success: false, error: true, loading: false };
    default:
      return state;
  }
}

function article(state = {}, action) {
  switch (action.type) {
    case GET_ARTICLE_$_RECEIVED:
      return { ...action.article };
    default:
      return state;
  }
}

function gettingArticle (state = initialStateForGettingArticles, action) {
  switch (action.type) {
    case GET_ARTICLE_$_LOADING:
      return {success: false, error: false, loading: true };
    case GET_ARTICLE_$_RECEIVED:
      return { success: true, error: false, loading: false };
    case GET_ARTICLE_$_NOT_RECEIVED:
      return { success: false, error: true, loading: false };     
    default:
      return state;
  }
}

const userInitialState = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {};

function user(state = userInitialState, action) {
  switch (action.type) {
    case AUTH_$_COMPLETED:
    case REGISTRATION_$_COMPLETED:
    case EDIT_PROFILE_$_EDITED:
      return { ...action.user };
    case LOG_OUT:
      return {};
    default:
      return state;
  }
}

const initialStateForAuthentication = {
  success: false,
  error: false,
  loading: false,
  serverValidation: '',
}

function authorization (state = initialStateForAuthentication, action) {
  switch (action.type) {
    case AUTH_$_LOADING:
      return { success: false, error: false, loading: true, serverValidation: '' };
    case AUTH_$_COMPLETED:
      return { success: true, error: false, loading: false, serverValidation: '' };
    case AUTH_$_NOT_COMPLETED:
      return { success: false, error: true, loading: false, serverValidation: '' };
    case AUTH_$_SERVER_VALIDATION:
      return { success: false, error: false, loading: false, serverValidation: action.text};
    case AUTH_$_RESET:
      return { success: false, error: false, loading: false, serverValidation: '' };
    default:
      return state;
  }
}

function registration (state = initialStateForAuthentication, action) {
  switch (action.type) {
    case REGISTRATION_$_LOADING:
      return {success: false, error: false, loading: true, serverValidation: '' };
    case REGISTRATION_$_COMPLETED:
      return { success: true, error: false, loading: false, serverValidation: '' };
    case REGISTRATION_$_NOT_COMPLETED:
      return { success: false, error: true, loading: false, serverValidation: '' };
    case REGISTRATION_$_SERVER_VALIDATION:
      return { success: false, error: false, loading: false, serverValidation: action.text};
    case REGISTRATION_$_RESET:
      return { success: false, error: false, loading: false, serverValidation: '' };
    default:
      return state;
  }
}

function editingProfile (state = initialStateForAuthentication, action) {
  switch (action.type) {
    case EDIT_PROFILE_$_LOADING:
      return {success: false, error: false, loading: true, serverValidation: '' };
    case EDIT_PROFILE_$_EDITED:
      return { success: true, error: false, loading: false, serverValidation: '' };
    case EDIT_PROFILE_$_NOT_EDITED:
      return { success: false, error: true, loading: false, serverValidation: '' };
    case EDIT_PROFILE_$_SERVER_VALIDATION:
      return { success: false, error: false, loading: false, serverValidation: action.text};
    case EDIT_PROFILE_$_RESET:
      return { success: false, error: false, loading: false, serverValidation: '' };
    default:
      return state;
  }
}

const initialStateForWorkWithArticle = {
  success: false,
  error: false,
  loading: false,
}

function creatingArticle (state = initialStateForWorkWithArticle, action) {
  switch (action.type) {
    case CREATE_ARTICLE_$_LOADING:
      return { success: false, error: false, loading: true };
    case CREATE_ARTICLE_$_CREATED:
      return { success: true, error: false, loading: false };
    case CREATE_ARTICLE_$_NOT_CREATED:
      return { success: false, error: true, loading: false };
    case CREATE_ARTICLE_$_RESET:
      return { success: false, error: false, loading: false };
    default:
      return state;
  }
}

function editingArticle (state = initialStateForWorkWithArticle, action) {
  switch (action.type) {
    case EDIT_ARTICLE_$_LOADING:
      return { success: false, error: false, loading: true };
    case EDIT_ARTICLE_$_EDITED:
      return { success: true, error: false, loading: false };
    case EDIT_ARTICLE_$_NOT_EDITED:
      return { success: false, error: true, loading: false };
    case EDIT_ARTICLE_$_RESET:
      return { success: false, error: false, loading: false };
    default:
      return state;
  }
}

function deletingArticle(state = initialStateForWorkWithArticle, action) {
  switch (action.type) {
    case DELETE_ARTICLE_$_LOADING:
      return { success: false, error: false, loading: true };
    case DELETE_ARTICLE_$_DELETED:
      return { success: true, error: false, loading: false };
    case DELETE_ARTICLE_$_NOT_DELETED:
      return { success: false, error: true, loading: false };
    case DELETE_ARTICLE_$_RESET:
      return { success: false, error: false, loading: false };
    default:
      return state;
  }
}

const reducer = combineReducers({
  articles,
  gettingArticles,
  article,
  gettingArticle,
  editingProfile,
  creatingArticle,
  editingArticle,
  deletingArticle,
  user,
  authorization,
  registration
});

export default reducer;
