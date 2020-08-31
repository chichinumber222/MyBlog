import { ARTICLES_RECEIVED, ARTICLES_NOT_RECEIVED, ARTICLE_RECEIVED, ARTICLE_NOT_RECEIVED, RESET, AUTH_COMPLETED, LOG_OUT, SERVER_VALIDATIONS_RECEIVED, AUTH_NOT_COMPLETED } from './action-types';
import { getArticlesFromAPI, getArticleFromAPI, registration, authentication } from '../services/article-service';

export const reset = () => ({
  type: RESET,
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
      dispatch(reset());
      const response = await getArticlesFromAPI(page);
      const { articles } = response;
      dispatch(articlesReceived(articles, page));
    } catch (error) {
      dispatch(articlesNotReceived());
    }
  };
};

const articleReceived = (article) => ({
  type: ARTICLE_RECEIVED,
  article,
})

const articleNotReceived = () => ({
  type: ARTICLE_NOT_RECEIVED,
})

export const asyncGetArticle = (slug) => {
  return async function (dispatch) {
    try {
      const response = await getArticleFromAPI(slug);
      const { article } = response;
      dispatch(articleReceived(article));
    } catch(error) {
      dispatch(articleNotReceived());
    }
  }
}

const authCompleted = (user) => ({
  type: AUTH_COMPLETED,
  user,
})

const authNotCompleted = () => ({
  type: AUTH_NOT_COMPLETED,
})

const serverValidationsReceived = (text) => ({
  type: SERVER_VALIDATIONS_RECEIVED,
  text,
})

export const asyncRegistration = (username, email, password) => {
  return async function (dispatch) {
    try {
      dispatch(reset());
      const response = await registration(username, email, password);
      const { user, errors } = response;
      if (errors) {
        const part1 = errors.username ? 'Username has already been taken' : '';
        const part2 = errors.email ? 'Email has already been taken' : '';
        const text = `${part1}\n${part2}`;
        dispatch(serverValidationsReceived(text));
      } else {
        dispatch(authCompleted(user));
        sessionStorage.setItem("user", JSON.stringify(user));
      }
    } catch(error) {
      dispatch(authNotCompleted());
    }
  }
}

export const asyncAuthentication = (email, password) => {
  return async function (dispatch) {
    try {
      dispatch(reset());
      const response = await authentication(email, password);
      const { user, errors } = response;
      if (errors) {
        const text = "Email or password is invalid";
        dispatch(serverValidationsReceived(text));
      } else {
        dispatch(authCompleted(user));
        sessionStorage.setItem("user", JSON.stringify(user));
      }
    } catch(error) {
      dispatch(authNotCompleted());
    }
  }
}

const logOut = () => ({
  type: LOG_OUT,
})

export const logOuting = () => {
  return function (dispatch) {
    sessionStorage.removeItem("user");
    dispatch(logOut());
  }
}