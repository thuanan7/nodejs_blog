const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const path = require("path");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;

const routes = require("./routes");
const db = require("./config/db");

// Connect to DB
db.connect();

//Config static folder
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"));

// HTTP logger
app.use(morgan("combined"));

// Template Engine
app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: "src/resources/views/layouts",
    partialsDir: "src/resources/views/partials",
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

//Routes
routes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
