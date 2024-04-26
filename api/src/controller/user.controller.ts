
import { Request, Response } from "express";
import User from "../database/models/user.model";
import becrypt from "bcryptjs"
import  Jwt  from "jsonwebtoken";
class authController{
    public static async registerUser(req:Request, res:Response):Promise<void>{
        try {
            const {username, password, email, role} = req.body
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
            password : hashedPassword,
            role : role
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
    
        } catch (error:any) {
            res.status(500).json({
                message : error.message
            })
        }
    }

    public static async loginUser(req:Request, res:Response):Promise<void>{
        const {email, password} = req.body

        if (!email || !password) {
            res.status(400).json({
                message : "Plesae provide username, password"
            })
        }
        const [data] = await User.findAll({where : {
            email : email
        }})

        if (!data) {
            res.status(401).json({
                message : "No user with that email"
            })
        }

        const isPasswordCorrect = await becrypt.compare(password, data.password)
        if (!isPasswordCorrect) {
            res.status(403).json({
                message : "Invalid password"
            })
        }

           // generate token 
       const token  =  Jwt.sign({id:data.id},process.env.SECRET_KEY as string ,{
        expiresIn : "20d"
    })
    res.status(200).json({
        message : "Logged in successfully",
        data : token
    })

    }

    
}

export default authController