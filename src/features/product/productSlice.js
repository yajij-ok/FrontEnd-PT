import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductService } from "./productService";
import { enqueueSnackbar } from "notistack";

export const allProducts = createAsyncThunk(
  "products/get-all-products",
  async (params = {}, thunkAPI) => {
    try {
      return await ProductService.getAllProducts(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const singleProduct = createAsyncThunk(
  "products/get-single-products",
  async (id, thunkAPI) => {
    try {
      return await ProductService.getSingleProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getWishList = createAsyncThunk(
  "products/get-wishlist",
  async (thunkAPI) => {
    try {
      return await ProductService.getWishList();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const searchSuggestion = createAsyncThunk(
  "products/get-search-products",
  async (keyword, thunkAPI) => {
    try {
      return await ProductService.searchSuggestion(keyword);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addToWishList = createAsyncThunk(
  "products/add-to-wishlist",
  async (prodId, thunkAPI) => {
    try {
      return await ProductService.addToWishList(prodId);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message || "Server error"
      );
    }
  }
);

export const addToCart = createAsyncThunk(
  "products/add-to-cart",
  async (productData, thunkAPI) => {
    try {
      return await ProductService.addToCart(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "products/remove-from-cart",
  async (prodId, thunkAPI) => {
    try {
      return await ProductService.removeFromCart(prodId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProdCount = createAsyncThunk(
  "products/update-cart",
  async ({prodId, newCount}, thunkAPI) => {
    try {
      return await ProductService.prodCount(prodId, newCount);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getallCat = createAsyncThunk(
  "products/get-categories",
  async (thunkAPI) => {
    try {
      return await ProductService.getProdCat();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBrands = createAsyncThunk(
  "products/get-Brands",
  async (thunkAPI) => {
    try {
      return await ProductService.getBrands();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const initialState = {
  product: "",
  wishlist:"",
  singleProduct:"",
  suggestions: [],
  categories: [],
  brands: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    clearSuggestions: (state) => {
      state.suggestions = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(allProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allProducts.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.allProducts = action.payload.data;
        state.count = action.payload.count;  
        state.message = "success"
      })
      .addCase(allProducts.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
        if (state.isError === true) {
          enqueueSnackbar("Somthing went wrong. Please try again later.")
        }
      }).addCase(singleProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(singleProduct.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.singleProduct = action.payload;
        state.message = "success"
      })
      .addCase(singleProduct.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
        if (state.isError === true) {
          enqueueSnackbar("Something went wrong.")
        }
      }).addCase(searchSuggestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchSuggestion.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.suggestions = action.payload.data;
        state.message = "success"
      })
      .addCase(searchSuggestion.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
        if (state.isError === true) {
          enqueueSnackbar("Something went wrong.")
        }
      })
      .addCase(getWishList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWishList.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
        state.message = "success"
      })
      .addCase(getWishList.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(addToWishList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToWishList.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.addedToWishlist = action.payload; 
        state.message = "success"
        if(state.isSuccess === true){
          enqueueSnackbar("Product added to the wishlist")
        }
      })
      .addCase(addToWishList.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;

      }).addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "success"
        if(state.isSuccess === true){
          enqueueSnackbar("Product added to Cart")
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      }).addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Product removed from cart"
        if (state.isSuccess) {
          enqueueSnackbar("Product has been removed from Cart.")
        }
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
        if (state.isError) {
          enqueueSnackbar("Something went wrong")
        }
      }).addCase(updateProdCount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProdCount.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload
        state.message = "success"
        if(state.isSuccess === true){
          enqueueSnackbar("Count updated")
        }
      })
      .addCase(updateProdCount.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      }).addCase(getallCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getallCat.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.categories = action.payload
        state.isSuccess = true;
      })
      .addCase(getallCat.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
        if (state.isError) {
          enqueueSnackbar("Something went wrong")
        }
      })
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.brands = action.payload
        state.isSuccess = true;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
        if (state.isError) {
          enqueueSnackbar("Something went wrong")
        }
      })
     }
    })
   
export const { clearSuggestions } = productSlice.actions
    export default productSlice.reducer