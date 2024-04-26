import express,{Router} from 'express'
import authMiddleware, { Role } from '../middleware/auth.middleware'
import categoryController from '../controller/category.controller'
const router:Router = express.Router()

router.route("/")
.post(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),categoryController.addCategory)
.get(categoryController.getCategories)

router.route("/:id")
.delete(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),categoryController.deleteCategory)
.patch(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),categoryController.updateCategory)

export default router 