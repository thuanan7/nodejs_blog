const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;

const routes = require("./routes");

//Config static folder
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));


//Routes
routes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
