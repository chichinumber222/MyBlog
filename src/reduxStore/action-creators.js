import { ARTICLES_RECEIVED, ARTICLES_NOT_RECEIVED, BEGINNING, AUTH_COMPLETED, LOG_OUT } from './action-types';
import { getArticlesFromAPI, registration, authentication } from '../services/article-service';

export const beginning = () => ({
  type: BEGINNING,
});

const articlesReceived = (articles, page) => ({
  type: ARTICLES_RECEIVED,
  articles,
  page,
});

const articlesNotReceived = () => ({
  type: ARTICLES_NOT_RECEIVED,
});

export const asyncGetArticles = (page) => {
  return async function (dispatch) {
    try {
      dispatch(beginning());
      const response = await getArticlesFromAPI(page);
      const { articles } = response;
      dispatch(articlesReceived(articles, page));
    } catch (error) {
      dispatch(articlesNotReceived());
    }
  };
};

const authCompleted = (user) => ({
  type: AUTH_COMPLETED,
  user,
})

export const asyncRegistration = (username, email, password) => {
  return async function (dispatch) {
    const response = await registration(username, email, password);
    const { user } = response;
    dispatch(authCompleted(user));
    sessionStorage.setItem("user", JSON.stringify(user));
  }
}

export const asyncAuthentication = (email, password) => {
  return async function (dispatch) {
    const response = await authentication(email, password);
    const { user } = response;
    dispatch(authCompleted(user));
    sessionStorage.setItem("user", JSON.stringify(user));
  }
}

const logOut = () => ({
  type: LOG_OUT,
})

export const logOutAndRemoveStorage = () => {
  return function (dispatch) {
    sessionStorage.removeItem("user");
    dispatch(logOut());
  }
}
