const express = require ("express")
const dotenv = require("dotenv")
const logger = require("./middleware/logger")
const app=express()
dotenv.config()

app.use(logger)

app.get("/greetings", (req,res)=>{
    return res.status(200).json({
        message:"Hello from Express Todo Project"
    })
})

app.listen(8000, (error)=>{
    if(error)
        console.log("error",error)
    console.log("server is runing on port no 8000")
})