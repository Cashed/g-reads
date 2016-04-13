
module.exports = (genre) => {
  return /^(?=.*[A-Za-z])[A-Za-z]{2,}$/.test(genre);
}
