import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthorized: {
        type: null,
        status: false,
    },
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthorized = { ...action.payload };
        },
        logout: (state, action) => {
            state.isAuthorized = { type: null, status: false };
        },
        get: (state, action) => {
            state.typeOfAuth = action.payload;
        },
    },
});

export const { login, logout } = authSlice.actions;

// selectors
export const selectAuthState = (state) => state.auth.isAuthorized;

export default authSlice.reducer;
