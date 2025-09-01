import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { enqueueSnackbar } from 'notistack';

const getUserfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;


export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    }catch (error) {
  return thunkAPI.rejectWithValue(
    error.response?.data || { message: error.message }
  );
}

  }
);

export const logOutUser = createAsyncThunk(
  "user/logout",
  async ( thunkAPI) => {
    try {
      return await authService.logOut();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserCart = createAsyncThunk(
  "user/get-cart",
  async ( thunkAPI) => {
    try {
      return await authService.getCart();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeloggedInUSer = createAsyncThunk(
  "user/get-remove-loggedUser",
  async () => {
  return true
}
);

export const createOrder = createAsyncThunk(
  "user/create-order",
  async ( orderData, thunkAPI) => {
    try {
      return await authService.createOrder(orderData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "user/cancel-order",
  async ( id, thunkAPI) => {
    try {
      return await authService.cancelOrder(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const orderSingleProduct = createAsyncThunk(
  "user/order-single-product",
  async ( orderData, thunkAPI) => {
    try {
      return await authService.orderSingleProduct(orderData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserOrders = createAsyncThunk(
  "user/users-orders",
  async ( thunkAPI) => {
    try {
      return await authService.getUserOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  user:getUserfromLocalStorage,
  createdOrder: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    clearCreatedOrder: (state) => {
      state.createdOrder = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.createdUser = action.payload;
        state.message = "success";
        if(state.isSuccess===true){
          enqueueSnackbar("User created Successfully")
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
        if (state.isError === true) {
          enqueueSnackbar(action.error)
        }
      }).addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.loggedUser = action.payload
        state.user = action.payload
        state.message = "success";
        if(state.isSuccess===true){
          localStorage.setItem("token", action.payload.token);
          enqueueSnackbar("User logged in Successfully")

        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
        if (state.isError === true) {
          enqueueSnackbar(action.error)
        }
      }).addCase(logOutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.loggedUser = null
        state.user = null
        state.message = "success";
        if(state.isSuccess===true){

          enqueueSnackbar("User logged out")

        }
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
        if (state.isError === true) {
          enqueueSnackbar(action.error)
        }
      })
      .addCase(removeloggedInUSer.fulfilled, (state) => {
        state.loggedUser = null;
      })
      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload;
        state.message = "success";
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
        if (state.isError === true) {
          enqueueSnackbar(action.error)
        }
      }).addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.createdOrder = "order loading"
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.createdOrder= action.payload
        state.message = "success";
        
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
        if (state.isError === true) {
          enqueueSnackbar("Something went wrong. Please try again later")
        }
      }).addCase(cancelOrder.pending, (state) => {
        state.isLoading = true;
        state.createdOrder = "order loading"
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.canceledOrder= action.payload
        state.message = "order Canceled";
        
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
        if (state.isError === true) {
          enqueueSnackbar("Something went wrong. Please try again later")
        }
      })
      .addCase(orderSingleProduct.pending, (state) => {
        state.isLoading = true;
        state.createdOrder = "order loading"
      })
      .addCase(orderSingleProduct.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.createdOrder= action.payload
        state.message = "success";
        
      })
      .addCase(orderSingleProduct.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
        if (state.isError === true) {
          enqueueSnackbar("Something went wrong. Please try again later")
        }
      })
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.userOrders= action.payload
        state.message = "success";
        
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
  
      })
    }
    })
export const { clearCreatedOrder } = authSlice.actions
    export default authSlice.reducer