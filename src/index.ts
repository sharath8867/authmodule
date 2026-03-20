import express from "express";
import connectToMongo from "./database/db";
import authRoutes from "./routers/user";
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();

const app = express();
connectToMongo();

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is working ....");
});

app.use("/api", authRoutes);


const aap= express();
app.get("/", (req, res) => {
  res.send("Server is running successfully 🚀");
});