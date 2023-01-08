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

  // [GET] /courses/create
  create(req, res, next) {
    res.render("courses/create.hbs");
  }

  // [POST] /courses/store
  store(req, res, next) {
    const formData = req.body;
    formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
    const course = new Course(formData);
    course.save((err) => {
      if (err) res.send("Create failed!");
      else res.redirect("/");
    });
  }
}

module.exports = new CoursesController();
