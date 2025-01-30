import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true


export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }) => {
        const response = await axios.post("http://127.0.0.1:8000/api/login", {
            email,
            password,
        });
        return response.data;
    }
);

// Create a user registration async thunk
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async ({ name, email, password }) => {
        const response = await axios.post("http://127.0.0.1:8000/api/register", {
            name,
            email,
            password,
        });
        return response.data;
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: localStorage.getItem("token") || null,
        user: JSON.parse(localStorage.getItem("user")) || null,
        status: "idle",
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            state.token = null;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.user = action.payload.user;
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("user", JSON.stringify(action.payload.user));
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                console.log(action.payload);
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
