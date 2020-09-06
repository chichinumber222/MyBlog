function isMyArticle(authorName) {
  const myName = JSON.parse(sessionStorage.getItem('user'))?.username;
  return authorName === myName;
}

export default isMyArticle;
