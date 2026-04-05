const user = require('../models/User');

const allUsers = async (req,res) => {
    try{

        const users = await user.find({}).select('-password');

        if(!users){
            return res.status(401).json({message:"No user found"});
        }

        console.log(users);
        res.status(200).json(users);

    } catch(err){
        res.status(500).json({message:err.message});
    }
}

const updateUser = async (req,res) => {
    try{

        const {id} = req.params;
        const {role, isActive} = req.body;
        
        await user.updateOne({_id:id},{role,isActive});

        res.status(200).json({message:"User updated"});


    }catch(err){
        res.status(500).json({message:err.message});
    }
}


const deactiveUser = async (req,res) => {
    try{
        
        const {id} = req.params;
        const fetcheduser = await user.findById(id)
        await user.updateOne({_id:id},{isActive:!fetcheduser.isActive});

        res.status(200).json({message:"User status updated"});

    } catch(err){
        res.status(500).json({message:err.message});
    }
}


module.exports = {allUsers, updateUser, deactiveUser};