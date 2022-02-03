const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")

//REGISTER
router.get("/", (req, res) => {
  res.send("Hello, this is the auth route")
})
// router.post("/register", async (req, res) => {
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    })
    //response on save
    const user = await newUser.save()
    res.status(200).json(user)
  } catch (e) {
    console.log("mongooge error:", e)
    res.status(400).json({
      error: "Duplicate entry",
    })
  }
  //  username: "john",
  //   email: "john@doe.com",
  //   password: 1234556,
})

//login  user
router.post("/login", async (req, res) => {
  try {
    //user exists
    const user = await User.findOne({
      email: req.body.email,
    })
    !user && res.status(404).json("User not found")

    // check ip passwor correct
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json("wrong password")

    //else login user if creentials match
    res.status(200).json(user)
  } catch (e) {
    return res.status(500).json(e)
  }
})

module.exports = router
