import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { shoeRouter } from "./Route/shoeRouter.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "https://admin.americanshoeexpress.com",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Register routes before starting the server
app.use("/api/v1", shoeRouter);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server connected at ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });
