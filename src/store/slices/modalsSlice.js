import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    registrationModalState: false,
    quitActionModal: {
        question: null,
        status: false,
        screen: null,
    },
    passwordResetModalState: false,
    alertModalState: {
        status: false,
        text: null,
        type: null,
    },
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
        changeToastModalState: (state, action) => {
            const { status, text, type } = action.payload;
            state.alertModalState = { status, text, type };
        },
    },
});

export const {
    changeRegistrationModalState,
    changeQuitActionModal,
    changePasswordResetModalState,
    changeToastModalState,
} = modalsSlice.actions;

export const selectRegistrationModalState = (state) => state.modals.registrationModalState;
export const selectPasswordResetModalState = (state) => state.modals.passwordResetModalState;
export const selectQuitActionModalState = (state) => state.modals.quitActionModal;
export const selectToastModalState = (state) => state.modals.alertModalState;

export default modalsSlice.reducer;
