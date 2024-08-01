import express, {Router} from "express"
import errorHandler from "../services/asyncHandler"
const router:Router = express.Router()
import authController from "../controller/user.controller"
import authMiddleware, { Role } from "../middleware/auth.middleware"
router.route("/register")
.post(authController.registerUser)
router.route("/login")
.post(errorHandler(authController.loginUser))

router.route("/users").get(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),errorHandler(authController.fetchUsers))


export default router
