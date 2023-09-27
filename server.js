import express from "express";
import color from "colors";
import dotenv from "dotenv";
import connect from "./config/db.js";
import morgan from "morgan";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";

//Config env
dotenv.config();

//Database config
connect();

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//Routes
app.use("/api/v1/auth", authRoutes);

//Rest api
app.get("/", (req, res) => {
  res.send(`<h1>Server is Running on ${PORT}</h1>`);
});

//Port
const PORT = process.env.PORT || 8080;

//Run app
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`.bgCyan.white);
});
