import express from "express";
import cors from "cors";
import { documenteRoutes } from "./routes/post.route.js";
import "dotenv/config";
import { connectDB } from "./config/db.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1", documenteRoutes);


const startServer = async () => {

  try {
    // 
    await connectDB();

 // 
    app.listen(port, () => {
      console.log(` Server started on port ${port}`);
      console.log(" MongoDB connected");
    });
  } catch (error) {
    console.error(" Failed to start server:", error);
    process.exit(1);

    
  }
};

startServer();