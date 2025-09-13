const express = require('express');
const connectDB = require('./db/connection')
const cookieParser = require("cookie-parser")
const router = require("./routes/auth.routes")
require("dotenv").config()
const app = express();
connectDB()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use("/api/v1",router)
app.listen(process.env.PORT,()=>{
    console.log(`App listen on PORT Number ${process.env.PORT}`)
})

