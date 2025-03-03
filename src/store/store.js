import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { recetappSlice } from "./recetapp";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        recetapp: recetappSlice.reducer
    },
});