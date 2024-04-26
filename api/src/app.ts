import express,{Application,Request,Response} from 'express'
const app:Application = express()
const PORT:number = 3000
import * as dotenv from "dotenv"
dotenv.config()
import './database/connection'
import authRoute from "./routes/auth.route"
import adminSeeder from './adminSeder'
app.use(express.json())
//admin seeder
adminSeeder()

app.use("/api/auth/", authRoute)

app.listen(PORT,()=>{
    console.log("Server has started at port ", PORT)
})