const mongoose = require('mongoose')

const foofSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    vide:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    foodPartner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"foodpartner"
    }
})

module.exports=mongoose.model("food",foofSchema)