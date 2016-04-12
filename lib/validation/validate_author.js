
module.exports = (authorName) => {
  return /^[a-z ,.'-]+$/i.test(authorName);
}
