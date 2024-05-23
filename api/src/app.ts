import express,{Application,Request,Response} from 'express'
const app:Application = express()
const PORT:number = 3000
import * as dotenv from "dotenv"
dotenv.config()
import './database/connection'
import authRoute from "./routes/auth.route"
import productRoute from "./routes/product.route"
import categoryRoute from "./routes/category.route"
import orderRoute from "./routes/order.route"
import cartRoute from "./routes/cart.route"
import adminSeeder from './adminSeder'
import categoryController from './controller/category.controller'
import cors from "cors"
app.use(cors({
    origin : "*"
}))
app.use(express.json())
//admin seeder
adminSeeder()

app.use("/api/auth/", authRoute)
app.use("/admin/product", productRoute)
app.use("/admin/category", categoryRoute)
app.use("/customer/cart", cartRoute)
app.use("/customer/order", orderRoute)
app.use("/order",orderRoute)
app.listen(PORT,()=>{
    categoryController.seedCategory()
    console.log("Server has started at port ", PORT)
})