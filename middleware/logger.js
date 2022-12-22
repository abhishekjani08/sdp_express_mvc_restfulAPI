module.exports=(req,res,next)=>{
    res.on("finish",()=>{
        console.log("request log",req.method,req.url,res.statusCode)
    })
    next()
}