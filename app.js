import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import Stripe from "stripe"

const app = express()
app.use(cors())
dotenv.config()

const port = 3001;

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.listen(port, () => {
    console.log("running on " + port)
})