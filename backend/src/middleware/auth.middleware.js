const foodpartnerModel=require('../models/foodpartner.model')
const bcrypt=require('bcrypt')
const jwt =require('jsonwebtoken');
const foodModel = require('../models/food.model');


const authFoodPartnerMiddleware=async (req,res,next) =>{
    const token =req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"please Login First"
        })
    }

    try {

        const decode= jwt.verify(token,process.env.JWT_SECRET);
        const foodPartner=await foodModel.findById(decode.id)
        req.foodPartner=foodPartner;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message:"invalid Token"
        })
        
    }
}


module.exports={
    authFoodPartnerMiddleware
}