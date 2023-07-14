import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    registrationModalState: false,
    quitActionModal: {
        question: null,
        status: false,
        screen: null,
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
    },
});

export const { changeRegistrationModalState, changeQuitActionModal } = modalsSlice.actions;

export const selectRegistrationModalState = (state) => state.modals.registrationModalState;
export const selectQuitActionModalState = (state) => state.modals.quitActionModal;

export default modalsSlice.reducer;
