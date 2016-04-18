
module.exports = (description) => {
  return /^.{0, 300}/g.test(description);
}
