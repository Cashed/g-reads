
module.exports = (description) => {
  return /^.{0, 180}/g.test(description);
}
