import { createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("productAppUser") || "null");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: savedUser,
    isAuthenticated: Boolean(savedUser),
  },
  reducers: {
    login: (state, action) => {
      const user = {
        name: action.payload.name,
        email: action.payload.email,
      };
      state.user = user;
      state.isAuthenticated = true;
      localStorage.setItem("productAppUser", JSON.stringify(user));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("productAppUser");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
