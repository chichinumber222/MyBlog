async function request(url, options = {}, numbersOfOperations = 0) {
  let body;
  try {
    const response = await fetch(url, options);

    if (!response.ok && response.status !== 422) {    
      throw new Error(`Could not fetch ${url}. Status: ${response.status}`);
    }

    body = await response.json();
  } catch (error) {
    if (numbersOfOperations < 5) return request(url, options, numbersOfOperations + 1);

    const myMessage = 'Does not send request after 10 attempts';
    throw new Error(`${myMessage}, ${error.message}`);
  }

  return body;
}

export default request;
