import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthorized: false,
    userDetails: {
        username: null,
        email: null,
    },
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        // action.payload should be an object -> { username: string, email: string }
        login: (state, action) => {
            state.isAuthorized = true;
            state.userDetails = action.payload; // payload = { username: "abc", email: "abc@gmail.com" }
        },
        logout: (state, action) => {
            state.isAuthorized = false;
            state.userDetails = { username: null, email: null };
        },
    },
});

export const { login, logout } = authSlice.actions;

// selectors
const selectAuthState = (state) => state.auth.isAuthorized;
const selectUserDetails = (state) => state.auth.userDetails;

export default authSlice.reducer;
