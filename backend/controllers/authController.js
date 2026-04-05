const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body

        const user = await User.findOne({ email });


        if(user){
            return res.status(400).json({message:"User already exists.."});
        }

        const hashedPass = await bcrypt.hash(password,10);

        await User.create({name, email, password:hashedPass , role});

        res.status(201).json({ message: "User registered successfully" });

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


const login = async (req,res) => {
    try {
        const {email,password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message: "Invalid credentials.."});
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            res.status(400).json({message: "Wrong password"});
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.status(200).json({ token, role: user.role, name: user.name })


    } catch(err){
        res.status(500).json({message: err.message})
    }
}


module.exports = {register, login}