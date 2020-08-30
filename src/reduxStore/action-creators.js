import { ARTICLES_RECEIVED, ARTICLES_NOT_RECEIVED, BEGINNING, AUTH_COMPLETED, LOG_OUT, SERVER_VALIDATIONS_RECEIVED } from './action-types';
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

const serverValidationsReceived = (text) => ({
  type: SERVER_VALIDATIONS_RECEIVED,
  text,
})

export const asyncRegistration = (username, email, password) => {
  return async function (dispatch) {
    try {
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
      console.log(error.message);
    }
  }
}

export const asyncAuthentication = (email, password) => {
  return async function (dispatch) {
    try {
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
      console.log(error.message);
    }
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