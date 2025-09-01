 import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initializeServer } from "./serverService";

 export const serverInitialize = createAsyncThunk(
   "server/initializing-server",
   async (thunkAPI) => {
     try {
       return await initializeServer();
     } catch (error) {
       return thunkAPI.rejectWithValue(error);
     }
   }
 );

 const initialState = {
    server: null
 }

 export const serverSlice = createSlice({
   name: "server",
   initialState: initialState,
   reducers: {},
   extraReducers: (builder) => {
     builder.addCase(serverInitialize.pending, (state) => {
         state.isLoading = true;
       })
       .addCase(serverInitialize.fulfilled, (state, action) => {
         state.isError = false;
         state.isLoading = false;
         state.isSuccess = true;
         state.server = action.payload;
         state.count = action.payload.count;  
         state.message = "success"
       })
       .addCase(serverInitialize.rejected, (state, action) => {
         state.isError = true;
         state.isSuccess = false;
         state.message = action.error;
         state.isLoading = false;
       })
        }
    });

export default serverSlice.reducer