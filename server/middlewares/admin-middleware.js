const adminMiddleware=async(req,res,next)=>{
    try{
        console.log(req.user.isAdmin)
        const adminrole=await req.user.isAdmin
        if (!adminrole){
        return res.status(400).json({message:"you are not an admin"})
        }
        next()
    }catch(error){
        next(error);
    }
}
module.exports=adminMiddleware