const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const cookieparser = require('cookie-parser')
const bcrypt = require('bcrypt')


const registerUser = async (req, res) => {
    try {
        let { fullName, email, password } = req.body;

        const isUserExist = await userModel.findOne({ email })

        if (isUserExist) return res.status(400).json({ message: "User already exist" })

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            fullName,
            email,
            password: hashedPassword
        })
        const token = jwt.sign({
            id: newUser._id
        }, process.env.JWT_SECRET)

        res.cookie("token", token)
        res.status(201).json({
            message: "User resgister",
            user: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email
            }
        })
    } catch (error) {
        console.log(error);

    }
}

const loginUser = async (req, res) => {
    try {

        let { email, password } = req.body

        const user = await userModel.findOne({
            email
        })

        if (!user) {
            return res.status(400).json({
                message: "Invalid Email or Password"
            })
        }

        const isPassword = await bcrypt.compare(password, user.password)

        if (!isPassword) {
            return res.status(400).json({
                message: "Invalid Email or Password"
            })
        }

        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET)

        res.cookie("token", token)

        res.status(200).json({
            message: "User logged in Succesfully",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email
            }
        })


    } catch (error) {
        console.log(error);

    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token")
        res.status(200).json({
            message: "You Are Succesfully LogedOut"
        })
    } catch (error) {
        console.log(error);

    }

}

module.exports = {
    registerUser,
    loginUser,
    logoutUser
}