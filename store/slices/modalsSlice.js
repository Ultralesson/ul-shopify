import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    registrationModalState: false,
};

export const modalsSlice = createSlice({
    name: "modals",
    initialState,
    reducers: {
        changeRegistrationModalState: (state, action) => {
            state.registrationModalState = !state.registrationModalState;
        },
    },
});

export const { changeRegistrationModalState } = modalsSlice.actions;

export const selectRegistrationModalState = (state) => state.modals.registrationModalState;

export default modalsSlice.reducer;
