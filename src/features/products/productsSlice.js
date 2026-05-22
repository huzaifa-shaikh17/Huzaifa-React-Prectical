import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/products";

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, product);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${product.id}`, product);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const productsSlice = createSlice({
  name: "products",

  initialState: {
    items: [],
    product: null,
    loading: false,
    hasLoaded: false,
    error: "",
  },

  reducers: {
    clearProductError: (state) => {
      state.error = "";
    },
    clearSingleProduct: (state) => {
      state.product = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.hasLoaded = true;
      state.items = action.payload;
    });

    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.hasLoaded = true;
      state.error = action.payload;
    });

    builder.addCase(getProduct.pending, (state) => {
      state.loading = true;
      state.product = null;
      state.error = "";
    });

    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });

    builder.addCase(getProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });

    builder.addCase(addProduct.rejected, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);

      if (index !== -1) {
        state.items[index] = action.payload;
      }

      state.product = action.payload;
    });

    builder.addCase(updateProduct.rejected, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    });

    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { clearProductError, clearSingleProduct } = productsSlice.actions;
export default productsSlice.reducer;
