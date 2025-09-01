import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/user/userSlice"
import productReducer from "../features/product/productSlice"
import serverReducer  from "../features/initialize/serverSlice"

export const store = configureStore({
    reducer: {
        server: serverReducer,
        auth: authReducer,
        product: productReducer
    }
});