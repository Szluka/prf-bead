const express = require("express");

const mongoose = require("mongoose");

const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const expressSession = require("express-session");
const cookiePaser = require("cookie-parser");

const app = express();

mongoose.connect("mongodb://0.0.0.0/prf-bandi-boy")
  .then(() => console.log("Adatbázis kapcsolódva"));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("MongoDB connection open");
});

const User = require("./models/user");
const Listing = require("./models/listing");
const Comment = require("./models/comment");

require("./db/seed")(); // adatbázis feltöltése teszt adatokkal

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiePaser());

passport.use(
  "local",
  new localStrategy(async function (username, password, done) {
    const user = await User.findOne({ username });
    if (!user) return done("Nincs ilyen felhasználó", null);
    user.comparePassword(password, function (err, isMatch) {
      if (err) return done(`Hiba a bejelentkezés során: ${err}`, null);
      if (!isMatch) return done("Hibás jelszó", null);
      return done(null, {
        username,
        _id: user._id
      });
    });
  }),
);

passport.serializeUser(function (user, done) {
  if (!user) return done("nincs megadva beléptethető felhasználó", null);
  return done(null, user);
});

passport.deserializeUser(function (user, done) {
  if (!user) return done("nincs user akit kiléptethetnénk", null);
  return done(null, user);
});

app.use(expressSession({ secret: "bandi200105", resave: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  console.log({
    user: req.user,
    path: req.path,
    method: req.method,
  })
  next();
});
app.use("/api/users", require("./routes/users.router"));
app.use("/api/listings", require("./routes/listings.router"));
app.use("", express.static("public"));

app.listen(
  3000,
  () => console.log("A szerver fut a http://localhost:3000 -es porton"),
);
