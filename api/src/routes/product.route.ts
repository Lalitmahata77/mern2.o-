import express, {Router} from "express"
import authMiddleware, {Role} from "../middleware/auth.middleware"
import productController from "../controller/product.controller"
import {multer, storage} from "../middleware/multer.middleware"

const upload = multer({storage : storage})
const router:Router = express.Router()

router.route("/")
.post(authMiddleware.isAuthenticated, authMiddleware.restrictTo(Role.Admin), upload.single('image'), productController.addProduct)
.get(productController.getAllProducts)

router.route("/:id")
.get(productController.getSingleProduct)
.delete(authMiddleware.isAuthenticated, authMiddleware.restrictTo(Role.Admin), productController.deleteProduct)

export default router