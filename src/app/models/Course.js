const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const slug = require("mongoose-slug-generator");

const Schema = mongoose.Schema;
const Course = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    slug: { type: String, slug: "name", unique: true },
    videoId: { type: String, required: true },
    level: { type: String },
  },
  { timestamps: true }
);

//Add plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete, { overrideMethods: "all", deletedAt: true });

module.exports = mongoose.model("Course", Course);
