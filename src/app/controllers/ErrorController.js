class ErrorController {
  err404(req, res, next) {
    res.status(404).send("Page not found!");
  }

  err500(error, req, res, next) {
    res.status(500).send("Internal Server Error!");
  }
}

module.exports = new ErrorController();
