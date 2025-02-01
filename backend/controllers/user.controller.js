import User from "../models/user.model.js";

export const getUsersforSidebar = async (req,res) =>{
    try {
        const loggedInUserId = req.user._id  //able to get id again because of middleware

        const filteredUsers = await User.find({_id: { $ne: loggedInUserId}}).select("-password");
        //find every id in our database except the logged in user id

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUsersforSidebar: ", error.message)
        res.status(500).json({error:"Internal Server Error"});
    }
}