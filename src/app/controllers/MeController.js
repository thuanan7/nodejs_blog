const Course = require("../models/Course");
const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../../util/mongoose");

class MeController {
  //[GET] /me/stored
  stored(req, res, next) {
    Course.find({})
      .then((courses) => {
        res.render("home", {
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }

  //[GET] /me/stored/courses
  storedCourses(req, res, next) {
    Promise.all([Course.find({}), Course.countDocumentsDeleted()])
      .then(([courses, countDeleted]) => {
        res.render("me/stored-courses", {
          countDeleted,
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }

  //[GET] /me/trashes/courses
  trashesCourses(req, res, next) {
    Course.findDeleted({})
      .then((courses) => {
        res.render("me/trashes-courses", {
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }
}

module.exports = new MeController();
