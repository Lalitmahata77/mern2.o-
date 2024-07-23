import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import productSlice from "./productSlice"
import cartSlice from "./cartSlice"
import checkOutSlice from "./checkOutSlice"


 const store = configureStore({
    reducer : {
        auth : authSlice,
        products : productSlice,
        carts : cartSlice,
        orders : checkOutSlice
    }
})
export default store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>