const Course = require("../models/Course");
const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../../util/mongoose");

class CoursesController {
  //[GET] /courses/
  home(req, res, next) {
    Course.find({})
      .then((courses) => {
        res.render("home", {
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }

  // [GET] /courses/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        if (course) {
          return res.render("courses/show", {
            course: mongooseToObject(course),
          });
        }

        next();
      })
      .catch(next);
  }
}

module.exports = new CoursesController();
