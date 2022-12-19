import { configureStore } from "@reduxjs/toolkit"
import darkModeReducer from "./redux/darkMode/DarkModeSlice"
import authReducer from "./redux/auth/AuthSlice"
import userReducer from "./redux/user/UserSlice"
import productReducer from "./redux/product/ProductSlice"

const Store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    auth: authReducer,
    user: userReducer,
    product: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default Store
