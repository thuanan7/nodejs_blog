const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");

class SiteController {
  //[GET] /
  home(req, res, next) {
    Course.find({})
      .then((courses) => {
        res.render("home", {
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }

  // [GET] /search
  search(req, res) {
    res.render("search");
  }

  error(req, res) {
    res.send("Page not found!");
  }
}

module.exports = new SiteController();
