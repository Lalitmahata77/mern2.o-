import { Product } from "./ProductTypes";
import { Status } from "./Types";

export interface CartItem{
    Product : Product,
    quantity : number
}

export interface CartState{
    items : CartItem[];
    status : Status
}