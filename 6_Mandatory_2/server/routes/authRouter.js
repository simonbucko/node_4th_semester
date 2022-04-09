import { Router } from "express";
const router = Router();
import { body, validationResult } from "express-validator"
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"
import User from "../models/user.js"
// import { checkAuth } from "../middleware/checkAuth";



router.post("/signup", body("email").isEmail().withMessage("The email is invalid"), body("password").isLength({ min: 5 }).withMessage("The password should have at least 5 characters"), body("name").isLength(2).withMessage("The name should have at least 2 characters"), async (req, res) => {
    //returns array of errors
    const validationsErrors = validationResult(req)
    if (!validationsErrors.isEmpty()) {
        const errors = validationsErrors.array().map(error => ({
            msg: error.msg
        }));
        return res.status(400).json({ errors, data: null })
    }
    const { email, password, name } = req.body;
    const user = await User.findOne({ email })

    if (user) {
        return res.status(400).json({
            errors: [
                {
                    msg: "Email already in use"
                }
            ],
            data: null
        })
    }
    console.log("Salt is ", process.env.SALT)
    const hashedPassword = await bcrypt.hash(process.env.SALT + password, 10)
    const newUser = await User.create({
        email, name, password: hashedPassword, isAdmin: false
    })

    const token = await JWT.sign(
        { email: newUser.email, isAdmin: false },
        process.env.JWT_SECRET,
        {
            expiresIn: 343434343434
        }
    )
    res.status(201).json({
        errors: [],
        data: {
            user: {
                id: newUser._id,
                email: newUser.email,
                name: newUser.name,
                token,
                orders: [],
            }
        }
    })

})


// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email })

//     //if user does not exist in db
//     if (!user) {
//         return res.json({
//             errors: [
//                 {
//                     msg: "Invalid credentials"
//                 }
//             ],
//             data: null
//         })
//     }

//     const isMatch = await bcrypt.compare(password, user.password)

//     //passwords does not match
//     if (!isMatch) {
//         return res.json({
//             errors: [
//                 {
//                     msg: "Invalid credentials"
//                 }
//             ],
//             data: null
//         })
//     }

//     const token = await JWT.sign(
//         { email: user.email },
//         process.env.JWT_SECRET as string,
//         {
//             expiresIn: 343434343434
//         }
//     )
//     res.json({
//         errors: [],
//         data: {
//             token,
//             user: {
//                 id: user._id,
//                 email: user.email
//             }
//         }
//     })

// })

// router.get("/me", checkAuth, async (req, res) => {
//     const user = await User.findOne({ email: req.user })
//     return res.json({
//         errors: [],
//         data: {
//             user: {
//                 id: user._id,
//                 email: user.email,
//                 customerStripeId: user.customerStripeId
//             }
//         }
//     })

// })

export default router