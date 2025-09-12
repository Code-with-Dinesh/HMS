const express = require('express');
const connectDB = require('./db/connection')

require("dotenv").config()
const app = express();
connectDB()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.listen(process.env.PORT,()=>{
    console.log(`App listen on PORT Number ${process.env.PORT}`)
})

