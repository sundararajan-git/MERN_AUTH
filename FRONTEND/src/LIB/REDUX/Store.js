import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./SLICES/UserSlice.js";

const store = configureStore({
    reducer: {
        userInfo: userSlice
    }
})

export default store