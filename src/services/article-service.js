import request from './request';

export function getArticlesFromAPI() {
  return request('https://conduit.productionready.io/api/articles?limit=10');
}