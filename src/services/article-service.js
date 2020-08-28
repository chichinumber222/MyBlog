import request from './request';

export function getArticlesFromAPI(page) {
  return request(`https://conduit.productionready.io/api/articles?limit=10&offset=${(page - 1) * 10}`);
}

export function registration(username, email, password) {
  const body = {
    "user": {
      "username": username,
      "email": email,
      "password": password,
    }
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(body)
  };
  return request('https://conduit.productionready.io/api/users', options);
}