import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/blogs", {
        // headers: {
        //     Authorization: `Bearer ${localStorage.getItem("token")}`,
        // },
    });
    console.log(response.data)
    return response.data;
});

export const createBlog = createAsyncThunk(
    "blogs/createBlog",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/blogs",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }

);

export const blogSlice = createSlice({
    name: "blogs",
    initialState: {
        blogs: [],
        status: "idle",
        message: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.blogs = action.payload.blogs;
                //console.log(state.blogs)
                state.message = action.payload.message;
            })
            .addCase(createBlog.fulfilled, (state, action) => {
                state.blogs.push(action.payload);
            });
    },
});

export default blogSlice.reducer;
