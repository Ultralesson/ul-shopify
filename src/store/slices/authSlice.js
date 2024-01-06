import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthorized: {
        type: null,
        status: false,
        email: null,
    },
    tempState: null,
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

        getTempState: (state, action) => {
            state.tempState = action.payload;
        },
    },
});

export const { login, logout, getTempState } = authSlice.actions;

// selectors
export const selectAuthState = (state) => state.auth.isAuthorized;
export const selectTempState = (state) => state.auth.tempState;

export default authSlice.reducer;
