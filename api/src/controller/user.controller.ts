
import { Request, Response } from "express";
import User from "../database/models/user.model";
import becrypt from "bcryptjs"

class authController{
    public static async registerUser(req:Request, res:Response):Promise<void>{
        try {
            const {username, password, email} = req.body
            if (!username || !password || !email) {
                res.status(400).json({
                    message : "Please provide username, email, password"
                })
            }
    
        //   const  existedUsername = await User.findOne(username)
        //  if (existedUsername) {
        //     res.status(200).json({
        //         message : "Username already exist"
        //     })
        //  }
        const existedEmail = await User.findOne({ where: { email: email } });
        if (existedEmail) {
         res.status(200).json({
             message : ' Email already exist'
         })
        }

         if (password.length < 6) {
            res.status(400).json({
                message : " Password at least 6 character long"
            })
         }
         const salt = await becrypt.genSalt(10)
         const hashedPassword = await becrypt.hash(password, salt) 


    
         const newUser = await new User({
            username,
            email,
            password : hashedPassword
         })
         if (newUser) {
            newUser.save()
            res.status(200).json({
               id : newUser.id,
               username : newUser.username,
               password : newUser.password,
               email : newUser.email
            })
         }else{
            res.status(400).json({
                message : "Invalid user data"
            })
         }
    
        } catch (error) {
            res.status(500).json({
                message : "Internal server error"
            })
        }
    }
}

export default authController