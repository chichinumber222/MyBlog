async function request(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw Error(`Could not fetch ${url}. Status: ${response.status}`);
  }
  const body = await response.json();
  return body;
}

export default request;
