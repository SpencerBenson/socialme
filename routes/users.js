const User = require("../models/User")
const router = require("express").Router()
const bcrypt = require("bcrypt")

//Update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
      } catch (e) {
        return res.status(500).json(e)
      }
      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        })
        res.status(200).json("Account updated.")
      } catch (e) {
        return res.status.json(e)
      }
    } else {
      res.status(403).json("You can only update your account!")
    }
  }
})
//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json("Account deleted.")
    } catch (e) {
      return res.status(500).json(e)
    }
  } else {
    return res.status(403).json("You can delete only your account.")
  }
})
//create user
//get user
// follow user
// unfollow user

router.get("/", (req, res) => {
  res.send("Hello, this is the user route")
})

module.exports = router
