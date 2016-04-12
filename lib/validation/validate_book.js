
module.exports = (title) => {
  return /^[a-z0-9 ,.'-:]+$/i.test(title);
}
