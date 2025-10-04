const express= require('express')
const foodController= require('../controllers/food.controller')
const authMiddleware=require('../middleware/auth.middleware')
const router= express.Router()

// /api/food *Route
router.post('/',authMiddleware.authFoodPartnerMiddleware,foodController.creatFood)


module.exports= router 