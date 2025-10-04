const foodModel= require('../models/food.model')



const creatFood= async ( req, res)=>{

    try {
        
       res.send("created") 
    } catch (error) {
        console.log(error);
        
    }

}



module.exports={
    creatFood
}