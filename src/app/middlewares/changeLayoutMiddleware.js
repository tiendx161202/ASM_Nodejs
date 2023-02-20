function changeLayout(req, res, next) {
  if (req.originalUrl.length > 1) {
    let stringPath = req.originalUrl.toString();
    let controllers = stringPath.split("/")[1];

    switch (controllers) {
      case "admin":
        res.locals.layout = "admin";
        break;
      default:
        res.locals.layout = "main";
        break;
    }
  }
  next();
}

module.exports = { changeLayout };
