import express from "express";
import dotenv from "dotenv";
import { connectdb } from "./db/db.js";
import jobSheetRoute from "./routes/jobSheetRoutes.js";
import cors from "cors";
import path from "path";
const __dirname = path.resolve();
dotenv.config();
const app = express();
connectdb();
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());

app.use("/api/v1/jobsheet", jobSheetRoute);

app.listen(process.env.PORT, () => {
  console.log("server is running on port 5000");
});
