const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const foodpartnerModel=require('../models/foodpartner.model')
const cookieparser=require('cookie-parser')


const registerFoodPartner = async (req,res)=>{
    try {
        let {fullName,email,password}=req.body;

        let userExist= await foodpartnerModel.findOne({email})

        if(userExist) return res.status(400).json({
            message:"User Already Exist"
        })

        const hashedPassword=await bcrypt.hash(password,10);

        const newUser= await foodpartnerModel.create({
            fullName,
            email,
            password:hashedPassword
        })

        const token = jwt.sign({
            id:newUser._id
        },process.env.JWT_SECRET)

        res.cookie("token",token);
        res.status(201).json({
            message:"User Created",
            user:{
                newUser:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email
            }
        })
    } catch (error) {
        console.log(error);
        
    }
}

const loginFoodPartner= async (req,res)=>{
    try {
        let {email,password}=req.body;

        const user= await foodpartnerModel.findOne({
            email
        })

        if(!user) return res.status(400).json({
            message:"Invalid Email or Password"
        })

        const isPassword= await bcrypt.compare(password,user.password)

        if(!password) return res.status(400).json({
            message:"Invalid Email or Password"
        })

        const token = jwt.sign({
            id:user._id
        },process.env.JWT_SECRET)

        res.cookie("token",token)

        res.status(200).json({
            message:"User Loged In",
            user:{
                id:user._id,
                fullName:user.fullName,
                email:user.email
            }
        })
        

    } catch (error) {
        console.log(error);
        
    }
}

const logoutFoodPartner=async (req,res)=>{
    try {
        res.clearCookie("token")
        res.status(200).json({
            message:"User Logged Out Succesfully"
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}