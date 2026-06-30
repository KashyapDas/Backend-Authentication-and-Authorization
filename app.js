const express = require("express");
const app = express();
const {setConnection} = require("./db/db");
const userRouter = require("./routes/user");
const config = require("./config/config");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.use("/api/user",userRouter);

app.listen(config.PORT,()=>{
    setConnection();
    console.log("Server started successfully");
})