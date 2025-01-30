import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import blogReducer from "./blogSlice.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        blogs: blogReducer,
    },
});
