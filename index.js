const express = require("express");
const mongo = require("./connect");
const dotenv = require("dotenv");
const router = require("./router");

dotenv.config()
mongo.connect()
const app = express();
app.use(express.json())

app.use("/", router)

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`app is running on ${PORT}`)
})