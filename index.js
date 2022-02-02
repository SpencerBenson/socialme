const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")
const port = 8800

dotenv.config()

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    Console.log(`Connected to MongoDB`)
  }
)

// Middlewares
app.use(express.json())
app.use(morgan("common"))
app.use(helmet())

app.get("/", (req, res) => {
  res.status("200").send("Welcome to the socialme homepage")
})

app.listen(port, () => {
  console.log(`Backen server running on port ${port}`)
})
