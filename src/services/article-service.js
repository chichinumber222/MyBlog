import request from './request';

export function getArticlesFromAPI(page) {
  return request(`https://conduit.productionready.io/api/articles?limit=10&offset=${(page-1)*10}`);
}