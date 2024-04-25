import express, {Router} from "express"
const router:Router = express.Router()
import authController from "../controller/user.controller"
router.route("/register")
.post(authController.registerUser)





export default router
