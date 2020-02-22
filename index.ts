import express from "express";
import cors from "cors";
import memesRouter from "./routes/memesRouter";
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/memes", {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on("open", () => {
    console.log("connected to database");
});

db.on("error", (error) => {
    console.error(`error connecting to database: ${error}`);
});

const app = express();

app.use(express.json())
app.use(cors());
app.use("/memes", memesRouter);
app.listen(5000, () => {
    console.log("listing on port 5000");
});