import { ARTICLES_RECEIVED, ARTICLES_NOT_RECEIVED } from './action-types';
import { getArticlesFromAPI } from '../services/article-service';

const articlesReceived = (articles) => ({
  type: ARTICLES_RECEIVED,
  articles,
})

const articlesNotReceived = () => ({
  type: ARTICLES_NOT_RECEIVED,
})

export const asyncGetArticles = () => {
  return async function(dispatch) {
    try {
      const response = await getArticlesFromAPI(); 
      const {articles} = response;
      dispatch(articlesReceived(articles));     
    } catch (error) {
      dispatch(articlesNotReceived());
    }
  }
}

