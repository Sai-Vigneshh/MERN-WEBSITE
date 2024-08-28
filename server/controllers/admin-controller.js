
const User=require("../models/user-model")
const Contact=require("../models/contact-model")
const Service=require("../models/service-model")
const  getAllusers=async(req,res) =>{
    try{
    const allusers=await User.find({},{password:0})

    if  (!allusers||allusers.length===0) {
       return res.status(400).json({message:"Users Not Found "})
    }
    return res.status(200).json(allusers);
    }catch(error)
    {
        next(error)
    }
}
const getAllcontacts=async(req,res)=>{
    try{
        const allcontacts=await Contact.find()
        if  (!allcontacts||allcontacts.length===0) {
            return res.status(400).json({message:"Contact Not Found "})
        }
        return res.status(200).json(allcontacts);

    }catch(error){
        next(error)
    }
}
const getAllservices=async (req,res) =>{
    try{
        const allserivices=await Service.find()
        if  (!allserivices||allserivices.length===0) {
            return res.status(400).json({message:"Service Not Found "})
        }
        return res.status(200).json(allserivices);

    }catch(error){
        next(error)
    }

}
const getById=async(req,res) =>{
    try {
        const user = await User.findOne({_id:req.params.id});
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
}
const updateUserById=async (req,res)=>{
    try{
        const id=req.params.id
        const updateData=req.body
        updation=await User.updateOne({_id:id},
            {
                $set:updateData
            }
        )
        
        res.status(200).json(updation)
        }catch(error){
            console.log(error)
        }
}
const deleteUserById=async(req,res) =>{
    try{
    const id=req.params.id
    await User.deleteOne({_id:id})
    res.status(200).json({message:"User Deleted Succesfully"})
    }catch(error){
        console.log(error)
    }
}
const deleteContactById=async(req,res) =>{
    try{
    const id=req.params.id
    await Contact.deleteOne({_id:id})
    res.status(200).json({message:"Contact Deleted Succesfully"})
    }catch(error){
        console.log(error)
    }
}
module.exports={getAllusers,getAllcontacts,getAllservices,deleteUserById,updateUserById,getById,deleteContactById};