/*
 * GET home page.
 */

exports.title = function (req, res) {
  res.render("1title");
};
exports.lobby = function (req, res) {
  req.session.name = req.name;
  res.render("2lobby");
};
