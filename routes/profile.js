const {Router} = require("express")
const users = require("../models/users")
const verifyAuth = require('../middleware/verifyAuth')
const profileRouter = Router()
profileRouter.get("/",verifyAuth,(req,res)=>{
//js funda,nodejs funda, project front back depoly,testing
return Promise.resolve()
.then(()=>users.findOne({email:req.email}))
.then((data)=>{
    if(!data){
        throw Error ('user not foundd')
    }
    data=data.toJSON()
    delete data.password
    return res.status(200).json({
        message:"profile successfully fetch", data
    })
    })
    .catch(error=>{
        return res.status(422).json({
            message:'profile fetch failed',
            error:error.message
        })
    })
})
module.exports=profileRouter