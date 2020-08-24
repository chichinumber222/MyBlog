import { ARTICLES_RECEIVED, ARTICLES_NOT_RECEIVED, BEGINNING } from './action-types';
import getArticlesFromAPI from '../services/article-service';

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
