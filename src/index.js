const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const path = require("path");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;

const routes = require("./routes");
const db = require("./config/db");

const SortMiddleware = require("./app/middlewares/SortMiddleware");

// Connect to DB
db.connect();

//Config static folder
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"));

//Custom middleware
app.use(SortMiddleware);

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
      sortable: (column, sortObject) => {
        const sortType = column === sortObject.column ? sortObject.type : 'default';

        const icons = {
          default: 'fa-solid fa-sort',
          desc: 'fa-solid fa-arrow-down-wide-short',
          asc: 'fa-solid fa-arrow-down-short-wide',
        }

        const types = {
          default: 'desc',
          asc: 'desc',
          desc: 'asc',
        };

        let icon = icons[sortType];
        let type = types[sortType];

        return `<a href="?_sort&column=${column}&type=${type}">
                <i class="${icon}"></i>
                </a>`;
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));
+(
  //Routes
  routes(app)
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
