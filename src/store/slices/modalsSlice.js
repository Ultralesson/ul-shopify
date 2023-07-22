import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    registrationModalState: false,
    quitActionModal: {
        question: null,
        status: false,
        screen: null,
    },
    passwordResetModalState: false,
};

export const modalsSlice = createSlice({
    name: "modals",
    initialState,
    reducers: {
        changeRegistrationModalState: (state, action) => {
            state.registrationModalState = !state.registrationModalState;
        },
        changeQuitActionModal: (state, action) => {
            state.quitActionModal = {
                question: action.payload.question,
                status: action.payload.status,
                screen: action.payload.screen,
            };
        },
        changePasswordResetModalState: (state, action) => {
            state.passwordResetModalState = !state.passwordResetModalState;
        },
    },
});

export const { changeRegistrationModalState, changeQuitActionModal, changePasswordResetModalState } =
    modalsSlice.actions;

export const selectRegistrationModalState = (state) => state.modals.registrationModalState;
export const selectPasswordResetModalState = (state) => state.modals.passwordResetModalState;
export const selectQuitActionModalState = (state) => state.modals.quitActionModal;

export default modalsSlice.reducer;
