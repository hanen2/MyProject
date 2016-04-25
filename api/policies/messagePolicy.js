module.exports = function (req, res, next) {
  if (req.session.user) {
    req.body.FirstName = req.session.user.FirstName;
    next();
  } else {
    res.send("You Must Be Logged In", 403);
  }
};
