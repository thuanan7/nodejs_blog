const newsRouter = require("./news");
const siteRouter = require("./site");
// app is Express()
function routes(app) {
  app.use("/news", newsRouter);
  app.use("/", siteRouter);
}

module.exports = routes;
