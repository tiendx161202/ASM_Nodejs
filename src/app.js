const path = require("path");
const express = require("express");
const methodOverride = require("method-override");
const handlebars = require("express-handlebars");
const app = express();
const port = 8080;
const session = require("express-session");
const { changeLayout } = require("./app/middlewares/changeLayoutMiddleware");
const fileUpload = require("express-fileupload");

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
app.use(
  fileUpload({
    limits: {
      fileSize: 10000000, // Around 10MB
    },
    abortOnLimit: true,
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

// methodOverride
app.use(methodOverride("_method"));

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
    helpers: {
      sum: (a, b) => a + b,
      multiple: (a, b) => a * b,
    },
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
