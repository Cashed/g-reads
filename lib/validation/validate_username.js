
module.exports = (username) => {
  return /^(?=.*[A-Za-z])[A-Za-z]{4,}$/.test(username);
}
