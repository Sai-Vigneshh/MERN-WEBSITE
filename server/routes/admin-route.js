const express = require("express");
const {getAllusers,getAllcontacts,getAllservices,deleteUserById,updateUserById,getById,deleteContactById}=require("../controllers/admin-controller")
const authMiddleware=require("../middlewares/auth-middleware")
const adminMiddleware=require("../middlewares/admin-middleware")



const router = express.Router();
router.route("/users").get(authMiddleware,adminMiddleware,getAllusers)
router.route("/contacts").get(authMiddleware,adminMiddleware,getAllcontacts)
router.route("/services").get(authMiddleware,adminMiddleware,getAllservices)
router.route("/users/:id").get(authMiddleware,adminMiddleware,getById)
router.route("/users/update/:id").patch(authMiddleware,adminMiddleware,updateUserById)
router.route("/users/delete/:id").delete(authMiddleware,adminMiddleware,deleteUserById)
router.route("/contact/delete/:id").delete(authMiddleware,adminMiddleware,deleteContactById)
module.exports=router