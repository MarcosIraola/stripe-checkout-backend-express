import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import Stripe from "stripe"

const app = express()
app.use(cors())
dotenv.config()

const port = 3001;
const stripe = new Stripe(process.env.SECRET_KEY)

app.post("/tripe/webhook", express.raw({type: "application/json"}), 
    async(request, response) => {
        const sig = request.headers["stripe-signature"]

        let event;

        try {
            event = stripe.webhooks.constructEvent(
                request.body,
                sig,
                process.env.END_POINT_SECRET
            )
        } catch (error) {
            response.status(400).send(`Webhokk Error: ${err.message}`)
        }

        switch(event.type) {
            case "payment_intent.succeeded":
                const paymentIntent = event.data.object;
                console.log("paymentIntent was successful!")
                break;
            case "payment_method.attached":
                const paymentMethod = event.data.object;
                console.log("paymentMethod was attached to a Customer!")
                break;
            default:
                console.log(`Unhandled event type ${event.type}`)
        }
        response.json({received: true})
    }
)

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.listen(port, () => {
    console.log("running on " + port)
})