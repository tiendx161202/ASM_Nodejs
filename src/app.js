const path = require("path");
const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const port = 8080;
const session = require("express-session");
const { changeLayout } = require("./app/middlewares/changeLayoutMiddleware");

const route = require("./routes");
const db = require("./config/db");

//Connect to db
db.connect();

app.use(express.static(path.join(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);

// Middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

app.use(express.json());

app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
  })
);
app.set("view engine", "hbs");

app.set("views", path.join(__dirname, "./resources/views"));

console.log("PATH: ", path.join(__dirname, "./resources/views"));

// Customize middleware
app.use(changeLayout);

// Routes init
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
