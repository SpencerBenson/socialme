const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")
const port = 8800
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")

dotenv.config()

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err))

// Middlewares
app.use(express.json())
app.use(morgan("common"))
app.use(helmet())

// Routes middleware
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)

app.get("/", (req, res) => {
  res.send("Welcome to the socialme homepage")
})

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`)
})
