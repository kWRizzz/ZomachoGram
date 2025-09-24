const cookieParser = require('cookie-parser')
const express= require('express')
const authRoutes=require('./routes/auth.routes')
const foodpartnerAuthRoutes=require('./routes/foodpartner.auth.routes')
const dotenv= require('dotenv')

dotenv.config()

const app= express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/auth',authRoutes)
app.use('/api/auth',foodpartnerAuthRoutes)


module.exports= app;

