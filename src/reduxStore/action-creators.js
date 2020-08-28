import { ARTICLES_RECEIVED, ARTICLES_NOT_RECEIVED, BEGINNING, AUTH_COMPLETED } from './action-types';
import { getArticlesFromAPI, registration } from '../services/article-service';

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

