const mongoose= require('mongoose')

//future debugur

const connectDb= ()=>{
    mongoose.connect(`mongodb://127.0.0.1:27017/ZomachoGram`).then(()=>{
        console.log(`dbConnected`);
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports=connectDb