const express=require('express')
const foodpartnerAuthController= require('../controllers/foodpartner.auth.controller')
const router=express.Router()

router.post('/user/fpregister',foodpartnerAuthController.registerFoodPartner)
router.post('/user/fplogin',foodpartnerAuthController.loginFoodPartner)
router.get('/user/fplogout',foodpartnerAuthController.logoutFoodPartner)

module.exports=router