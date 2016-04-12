
module.exports = (password) => {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/.test(password);
}
