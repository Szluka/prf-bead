const { Router } = require("express");
const passport = require("passport");
const User = require("../models/user");

const userRouter = Router();


userRouter.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Hiányzó adat(ok)" });
  }
  const existing = await User.findOne({ username });
  if (existing) {
    return res.status(400).json({ message: "A felhasználónév már foglalt" });
  }
  const newUser = new User({ username, password });
  await newUser.save();
  return res.status(200).json({ message: "Sikeres regisztráció" });
});

userRouter.post("/login", (req, res) => {
  passport.authenticate("local", (err, user) => {
    console.log(err)
    if (err) return res.status(500).json({ message: err });
    if (!user) {
      return res.status(400).json({
        message: "Hibás felhasználónév vagy jelszó",
      });
    }
    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ message: err });
      return res.status(200).json({
        message: "Sikeres bejelentkezés",
        user: {
          username: user.username,
          _id: user._id,
          role: user.role,
        }
      });
    });
  })(req, res);
});
userRouter.get("/auth", (req, res) => {
  if (req.user) return res.status(200).json({
    message: "Belépve", user: {
      username: req.user.username, _id: req.user._id, role: req.user.role
    }
  });
  return res.status(401).json({ message: "Nincs bejelentkezve" });
});

userRouter.post("/logout", (req, res) => {
  req.logout(() => {
    return res.status(200).json({ message: "Sikeres kijelentkezés" });
  });
});


module.exports = userRouter;
