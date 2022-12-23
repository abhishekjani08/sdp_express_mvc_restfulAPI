module.exports=(req,res,next)=>{
    if(process.env.NODE_ENV ==='test'){
next()
    }
    res.on("finish",()=>{
        console.log("request log",req.method,req.url,res.statusCode)
    })
    next()
}