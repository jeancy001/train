import express from "express"
import cors from "cors"
import { documenteRoutes } from "./routes/post.route.js"
import "dotenv/config"
import { connectDB } from "./config/db.js"


const app = express()
const port = 5000

app.use(express.json())
app.use(cors())


// routes
app.use("/api/v1", documenteRoutes )


app.listen(port ,()=>{
    console.log("Serveur est demarree !")

    connectDB()
})