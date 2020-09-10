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
  DELETE_ARTICLE_$_RESET,
  FAVORITE_ARTICLE_$_LOADING,
  FAVORITE_ARTICLE_$_ADDED,
  FAVORITE_ARTICLE_$_NOT_ADDED,
  FAVORITE_ARTICLE_$_RESET
} from './action-types';


import {
  getArticlesFromAPI,
  getArticleFromAPI,
  registration,
  authorization,
  editProfile,
  createArticle,
  editArticle,
  deleteArticle,
  favoriteOrUnfavoriteArticle
} from '../services/article-service';

const getArticles$Received = (articles, page) => ({
  type: GET_ARTICLES_$_RECEIVED,
  articles,
  page,
});

const getArticles$NotReceived = () => ({
  type: GET_ARTICLES_$_NOT_RECEIVED,
});

export const getArticles$Loading = () => ({
  type: GET_ARTICLES_$_LOADING,
})

export const asyncGetArticles = (token, page) => {
  return async function inside(dispatch) {
    try {
      dispatch(getArticles$Loading());
      const response = await getArticlesFromAPI(token, page);
      const { articles } = response;
      dispatch(getArticles$Received(articles, page));
    } catch (error) {
      dispatch(getArticles$NotReceived());
    }
  };
};

const getArticle$Received = (article) => ({
  type: GET_ARTICLE_$_RECEIVED,
  article,
});

const getArticle$NotReceived = () => ({
  type: GET_ARTICLE_$_NOT_RECEIVED,
});

export const getArticle$Loading = () => ({
  type: GET_ARTICLE_$_LOADING,
})

export const asyncGetArticle = (token, slug) => {
  return async function inside(dispatch) {
    try {
      const response = await getArticleFromAPI(token, slug);
      const { article } = response;
      dispatch(getArticle$Received(article));
    } catch (error) {
      dispatch(getArticle$NotReceived());
    }
  };
};

const registration$Completed = (user) => ({
  type: REGISTRATION_$_COMPLETED,
  user,
});

const registration$NotCompleted = () => ({
  type: REGISTRATION_$_NOT_COMPLETED,
});

const registration$Loading = () => ({
  type: REGISTRATION_$_LOADING,
})

const registration$ServerValidation = (text) => ({
  type: REGISTRATION_$_SERVER_VALIDATION,
  text,
})

export const registration$Reset = () => ({
  type: REGISTRATION_$_RESET,
})

export const asyncRegistration = (username, email, password) => {
  return async function inside(dispatch) {
    try {
      dispatch(registration$Loading());
      const response = await registration(username, email, password);
      const { user, errors } = response;
      if (errors) {
        const part1 = errors.username ? 'Username has already been taken' : '';
        const part2 = errors.email ? 'Email has already been taken' : '';
        const text = `${part1}\n${part2}`;
        dispatch(registration$ServerValidation(text));
      } else {
        dispatch(registration$Completed(user));
        sessionStorage.setItem('user', JSON.stringify(user));
      }
    } catch (error) {
      dispatch(registration$NotCompleted());
    }
  };
};

const auth$Completed = (user) => ({
  type: AUTH_$_COMPLETED,
  user,
})

const auth$NotCompleted = () => ({
  type: AUTH_$_NOT_COMPLETED,
})

const auth$Loading = () => ({
  type: AUTH_$_LOADING,
})

const auth$ServerValidation = (text) => ({
  type: AUTH_$_SERVER_VALIDATION,
  text,
})

export const auth$Reset = () => ({
  type: AUTH_$_RESET
})

export const asyncAuthorization = (email, password) => {
  return async function inside(dispatch) {
    try {
      dispatch(auth$Loading());
      const response = await authorization(email, password);
      const { user, errors } = response;
      if (errors) {
        const text = 'Email or password is invalid';
        dispatch(auth$ServerValidation(text));
      } else {
        dispatch(auth$Completed(user));
        sessionStorage.setItem('user', JSON.stringify(user));
      }
    } catch (error) {
      dispatch(auth$NotCompleted());
    }
  };
};

const logOut = () => ({
  type: LOG_OUT,
});

export const logOuting = () => {
  return function inside(dispatch) {
    sessionStorage.removeItem('user');
    dispatch(logOut());
  };
};

const editProfile$Edited = (user) => ({
  type: EDIT_PROFILE_$_EDITED,
  user,
});

const editProfile$NotEdited = () => ({
  type: EDIT_PROFILE_$_NOT_EDITED,
});

const editProfile$Loading = () => ({
  type: EDIT_PROFILE_$_LOADING,
})

const editProfile$ServerValidation = (text) => ({
  type: EDIT_PROFILE_$_SERVER_VALIDATION,
  text,
})

export const editProfile$Reset = () => ({
  type: EDIT_PROFILE_$_RESET,
})

export const asyncEditProfile = (token, username, email, password, image) => {
  return async function inside(dispatch) {
    try {
      dispatch(editProfile$Loading());
      const response = await editProfile(token, username, email, password, image);
      const { user, errors } = response;
      if (errors) {
        const part1 = errors.username ? 'This username is busy' : '';
        const part2 = errors.email ? 'This email is busy' : '';
        const text = `${part1}\n${part2}`;
        dispatch(editProfile$ServerValidation(text));
      } else {
        dispatch(editProfile$Edited(user));
        sessionStorage.setItem('user', JSON.stringify(user));
      }
    } catch (error) {
      dispatch(editProfile$NotEdited());
    }
  };
};

const createArticle$Created = () => ({
  type: CREATE_ARTICLE_$_CREATED,
});

const createArticle$NotCreated = () => ({
  type: CREATE_ARTICLE_$_NOT_CREATED,
});

const createArticle$Loading = () => ({
  type: CREATE_ARTICLE_$_LOADING,
})

export const createArticle$Reset = () => ({
  type: CREATE_ARTICLE_$_RESET,
})

export const asyncCreateArticle = (token, title, description, body, tagList) => {
  return async function inside(dispatch) {
    try {
      dispatch(createArticle$Loading());
      await createArticle(token, title, description, body, tagList);
      dispatch(createArticle$Created());
    } catch (error) {
      dispatch(createArticle$NotCreated());
    }
  };
};

const editArticle$Edited = () => ({
  type: EDIT_ARTICLE_$_EDITED,
})

const editArticle$NotEdited = () => ({
  type: EDIT_ARTICLE_$_NOT_EDITED,
})

const editArticle$Loading = () => ({
  type: EDIT_ARTICLE_$_LOADING,
})

export const editArticle$Reset = () => ({
  type: EDIT_ARTICLE_$_RESET,
})

export const asyncEditArticle = (token, title, description, body, tagList, slug) => {
  return async function inside(dispatch) {
    try {
      dispatch(editArticle$Loading());
      await editArticle(token, title, description, body, tagList, slug);
      dispatch(editArticle$Edited());
    } catch(error) {
      dispatch(editArticle$NotEdited());
    }
  }
}

const deleteArticle$Deleted = () => ({
  type: DELETE_ARTICLE_$_DELETED,
})

const deleteArticle$NotDeleted = () => ({
  type: DELETE_ARTICLE_$_NOT_DELETED,
})

const deleteArticle$Loading = () => ({
  type: DELETE_ARTICLE_$_LOADING,
})

export const deleteArticle$Reset = () => ({
  type: DELETE_ARTICLE_$_RESET,
})

export const asyncDeleteArticle = (token, slug) => {
  return async function inside(dispatch) {
    try {
      dispatch(deleteArticle$Loading());
      await deleteArticle(token, slug);
      dispatch(deleteArticle$Deleted());
    } catch(error) {
      dispatch(deleteArticle$NotDeleted());
    }
  }
}

const favoriteArticle$Added = (article) => ({
  type: FAVORITE_ARTICLE_$_ADDED,
  article,
})

const favoriteArticle$NotAdded = () => ({
  type: FAVORITE_ARTICLE_$_NOT_ADDED,
})

const favoriteArticle$Loading = () => ({
  type: FAVORITE_ARTICLE_$_LOADING,
})

export const favoriteArticle$Reset = () => ({
  type: FAVORITE_ARTICLE_$_RESET,
})

export const asyncFavoriteArticle = (token, slug, isFavorite) => {
  return async function inside(dispatch) {
    try {
      dispatch(favoriteArticle$Loading());
      const response = await favoriteOrUnfavoriteArticle(token, slug, isFavorite);
      const { article } = response;
      dispatch(favoriteArticle$Added(article));
    } catch(error) {
      dispatch(favoriteArticle$NotAdded());
    }
  }
}