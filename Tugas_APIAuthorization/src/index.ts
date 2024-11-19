import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/route";
import { SECRET } from "./utils/env";

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/my-auth-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});