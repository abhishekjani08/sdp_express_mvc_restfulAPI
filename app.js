const express = require ("express")
const app=express()

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