function checkStatusError(errorMessage) {
  const regex = /\d{3}/;
  const result = errorMessage.match(regex);
  return result[0];
}

export default checkStatusError;
