import express, {Router} from "express"
import errorHandler from "../services/asyncHandler"
const router:Router = express.Router()
import authController from "../controller/user.controller"
router.route("/register")
.post(authController.registerUser)
router.route("/login")
.post(errorHandler(authController.loginUser))




export default router
